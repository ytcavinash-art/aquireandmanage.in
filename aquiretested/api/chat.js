import crypto from 'node:crypto';
import OpenAI from 'openai';
import { allowSameSiteRequest, cleanText, rateLimit } from './_lib/http.js';

const LANGUAGE_NAMES = { en: 'English', hi: 'Hindi in Devanagari script', mr: 'Marathi in Devanagari script' };
const SAFE_FALLBACKS = {
  en: 'I could not verify that from the A&M Advisory knowledge base. I can help arrange a call with an A&M Advisory expert through the Quick Enquiry form.',
  hi: 'मुझे A&M Advisory के ज्ञान-आधार में इसकी सत्यापित जानकारी नहीं मिली। आप Quick Enquiry form भरें, मैं विशेषज्ञ से संपर्क करवाने में मदद कर सकती हूँ।',
  mr: 'A&M Advisory च्या ज्ञानसंग्रहात याची सत्यापित माहिती मला मिळाली नाही. तुम्ही Quick Enquiry form भरा; मी तज्ज्ञांशी संपर्क साधण्यास मदत करू शकते.',
};

function extractCitations(apiResponse) {
  const citations = new Map();
  for (const item of apiResponse.output || []) {
    if (item.type !== 'message') continue;
    for (const content of item.content || []) {
      for (const annotation of content.annotations || []) {
        if (annotation.type === 'file_citation' && annotation.file_id) {
          citations.set(annotation.file_id, {
            fileId: annotation.file_id,
            filename: annotation.filename || 'A&M Advisory knowledge base',
          });
        }
      }
    }
  }
  return [...citations.values()];
}

function getSafetyIdentifier(request) {
  if (!process.env.CHAT_SAFETY_SALT) return undefined;
  const ip = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0];
  return crypto.createHash('sha256').update(`${process.env.CHAT_SAFETY_SALT}:${ip}`).digest('hex');
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }
  if (!allowSameSiteRequest(request, response) || !rateLimit(request, response, { limit: 12 })) return;

  const language = ['en', 'hi', 'mr'].includes(request.body?.language) ? request.body.language : 'en';
  const messages = Array.isArray(request.body?.messages)
    ? request.body.messages.slice(-8).map((message) => ({
      role: message?.role === 'assistant' ? 'assistant' : 'user',
      content: cleanText(message?.content, 600),
    })).filter((message) => message.content)
    : [];

  if (!messages.length || messages.at(-1).role !== 'user') {
    return response.status(400).json({ error: 'A valid user message is required.' });
  }
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_VECTOR_STORE_ID) {
    return response.status(503).json({
      answer: SAFE_FALLBACKS[language],
      mode: 'configuration-required',
      citations: [],
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const apiResponse = await client.responses.create({
      model: process.env.OPENAI_CHAT_MODEL || 'gpt-5.6-sol',
      instructions: `You are DiDi, A&M Advisory's professional and helpful virtual assistant.
Answer only in ${LANGUAGE_NAMES[language]}. Never mix languages or use Romanized Hindi/Marathi.
For every company, service, project, policy, process, eligibility, document or contact question, search the supplied A&M Advisory knowledge base before answering.
Use only retrieved company information. Do not invent facts, legal conclusions, guarantees, consent percentages, timelines, prices, project claims or document requirements.
If retrieval does not provide enough support, say so clearly in the selected language and offer to arrange contact with an A&M Advisory expert through the Quick Enquiry form.
Keep the answer practical, empathetic and concise. Treat legal and regulatory information as general guidance and recommend confirmation from the competent authority when appropriate.`,
      input: messages,
      tools: [{
        type: 'file_search',
        vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID],
        max_num_results: 5,
      }],
      tool_choice: 'required',
      include: ['file_search_call.results'],
      max_output_tokens: 450,
      store: false,
      safety_identifier: getSafetyIdentifier(request),
    });

    const answer = cleanText(apiResponse.output_text, 4_000);
    return response.status(200).json({
      answer: answer || SAFE_FALLBACKS[language],
      mode: answer ? 'rag' : 'knowledge-base',
      citations: extractCitations(apiResponse),
    });
  } catch (error) {
    console.error('Chat request failed:', error?.status || error?.code || 'unknown');
    return response.status(502).json({ answer: SAFE_FALLBACKS[language], mode: 'unavailable', citations: [] });
  }
}
