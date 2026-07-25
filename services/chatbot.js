const OpenAI = require('openai');

const KNOWLEDGE = `
A&M Advisory supports Mumbai redevelopment through Tenant Management, Liaisoning,
IEC Activities and Facility Management.

SRA: Slum Rehabilitation Authority schemes aim to rehabilitate eligible occupants
in permanent housing while enabling redevelopment under applicable rules.

Common documents can include identity proof, address/occupancy evidence, family
records, bank/KYC details and project-specific authority documents. Exact
requirements vary by scheme, cut-off date and authority.

Eligibility is determined by the competent authority using applicable rules and
verified records. A&M can support documentation and coordination but cannot make
the final legal eligibility decision.

Indicative process: consultation, survey, documentation, government approvals,
construction coordination and handover. Timelines vary according to records,
consent, project complexity and authority response; never promise a fixed period.

Rent, transit accommodation and shifting terms depend on the redevelopment
agreement. A&M supports rent readiness, KYC, family coordination and relocation.

Contact: +91 022-45648350 and info@aquireandmanage.com.
`;

function fallbackAnswer(message) {
  const text = message.toLowerCase();
  if (text.includes('sra') || text.includes('rehabilitation kya')) {
    return 'SRA (Slum Rehabilitation Authority) redevelopment ka objective eligible occupants ko permanent rehabilitation housing dena aur applicable rules ke under planned redevelopment enable karna hai.';
  }
  if (text.includes('document') || text.includes('paper') || text.includes('kyc')) {
    return 'Commonly identity proof, address/occupancy evidence, family records, bank/KYC details aur project-specific forms maange ja sakte hain. Exact checklist project aur authority ke rules par depend karti hai.';
  }
  if (text.includes('timeline') || text.includes('time') || text.includes('kitna')) {
    return 'Typical stages consultation, survey, documentation, approvals, construction coordination aur handover hain. Fixed timeline promise nahi ki ja sakti—document readiness, consent, project complexity aur authority response par duration depend karti hai.';
  }
  if (text.includes('eligib') || text.includes('patra') || text.includes('eligible')) {
    return 'Final eligibility competent authority applicable rules aur verified records ke basis par decide karti hai. A&M documentation aur coordination support karta hai, lekin legal eligibility approve nahi karta.';
  }
  if (text.includes('rent') || text.includes('shift') || text.includes('transit')) {
    return 'Rent, temporary accommodation aur shifting terms individual redevelopment agreement par depend karte hain. A&M rent readiness, bank/KYC aur family relocation coordination mein support karta hai.';
  }
  if (text.includes('contact') || text.includes('call') || text.includes('meeting')) {
    return 'Aap +91 022-45648350 par call kar sakte hain, WhatsApp use kar sakte hain, ya website ka Quick Enquiry form submit kar sakte hain.';
  }
  return 'Main SRA, eligibility, required documents, process timeline, rent/relocation aur approvals ke baare mein help kar sakta hoon. Project-specific legal confirmation ke liye Quick Enquiry submit karein.';
}

async function answerQuestion(messages) {
  const latestMessage = messages.at(-1)?.content || '';
  if (!process.env.OPENAI_API_KEY) {
    return { answer: fallbackAnswer(latestMessage), mode: 'knowledge-base' };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_CHAT_MODEL || 'gpt-5.6-sol',
      instructions: `You are A&M Advisory's website assistant for Mumbai SRA and urban redevelopment.
Answer in the user's language, including Hinglish when appropriate. Be concise, practical and empathetic.
Use only the supplied company knowledge. Do not invent project claims, legal decisions, fixed timelines,
government guarantees or document requirements. Clearly say when requirements vary and recommend
verification with the competent authority. For project-specific matters, offer the Quick Enquiry form.

Company knowledge:
${KNOWLEDGE}`,
      input: messages.slice(-8).map((message) => ({
        role: message.role === 'assistant' ? 'assistant' : 'user',
        content: message.content,
      })),
      max_output_tokens: 350,
      store: false,
    });

    return { answer: response.output_text || fallbackAnswer(latestMessage), mode: 'ai' };
  } catch (error) {
    console.error('OpenAI chatbot request failed:', error.message);
    return { answer: fallbackAnswer(latestMessage), mode: 'knowledge-base' };
  }
}

module.exports = { answerQuestion };
