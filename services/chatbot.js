const OpenAI = require('openai');
require('../aquiretested/js/property-management-faqs');
const PROPERTY_MANAGEMENT_FAQS = globalThis.AM_PROPERTY_MANAGEMENT_FAQS || [];

const FAQS = [
  ...PROPERTY_MANAGEMENT_FAQS,
  {
    id: 'sra',
    keywords: ['sra', 'slum rehabilitation', 'redevelopment', 'पुनर्विकास', 'झुग्गी पुनर्वास'],
    english: 'A Slum Rehabilitation (SRA) project is a government-approved redevelopment initiative that provides eligible slum residents with permanent, free rehabilitation homes while allowing planned redevelopment of the land. A&M Advisory supports these projects through tenant management, documentation, approvals, liaisoning, project coordination and regulatory compliance.',
    hindi: 'मुंबई में Slum Rehabilitation Authority (SRA) परियोजना सरकार द्वारा स्वीकृत पुनर्विकास योजना है। इसके अंतर्गत पात्र झुग्गीवासियों को स्थायी और निःशुल्क पुनर्वास आवास दिया जाता है तथा भूमि का नियोजित विकास किया जाता है। A&M Advisory tenant management, दस्तावेज़ीकरण, सरकारी अनुमोदन, liaisoning, project coordination और compliance में सहायता करता है।',
  },
  {
    id: 'eligibility',
    keywords: ['eligib', 'eligible', 'patra', 'patrata', 'पात्र', 'पात्रता', 'cut-off', 'cutoff', 'photo pass'],
    english: 'Eligibility is determined under Government of Maharashtra and SRA rules through the applicable cut-off date, survey records, identity documents, occupancy proof and government verification. A&M Advisory can support eligibility assessment, document verification, Annexure II guidance, application support and process consultation, but the competent authority makes the final eligibility decision.',
    hindi: 'पात्रता महाराष्ट्र सरकार और SRA के लागू नियमों के अनुसार कट-ऑफ तिथि, सर्वे रिकॉर्ड, पहचान पत्र, निवास या कब्ज़े के प्रमाण और सरकारी सत्यापन से तय होती है। A&M Advisory eligibility assessment, document verification, Annexure II guidance, application support और process consultation में सहायता कर सकता है, लेकिन अंतिम निर्णय सक्षम प्राधिकरण करता है।',
  },
  {
    id: 'documents',
    keywords: ['document', 'paper', 'kagaz', 'kyc', 'दस्तावेज', 'कागज', 'आधार', 'aadhaar', 'ration', 'voter'],
    english: 'Documents may include Aadhaar Card, PAN Card, Ration Card, Voter ID, electricity bill, Photo Pass (if applicable), property or occupancy documents, passport-size photographs and other supporting documents requested by SRA authorities. The exact checklist varies by project, and A&M Advisory can help you prepare it.',
    hindi: 'आमतौर पर आधार कार्ड, पैन कार्ड, राशन कार्ड, वोटर आईडी, बिजली बिल, फोटो पास (यदि लागू हो), संपत्ति या कब्ज़े से जुड़े दस्तावेज़, पासपोर्ट-साइज़ फोटो और SRA द्वारा माँगे गए अन्य सहायक दस्तावेज़ आवश्यक हो सकते हैं। सही सूची परियोजना के अनुसार बदलती है और A&M Advisory इसे तैयार करने में सहायता कर सकता है।',
  },
  {
    id: 'rent',
    keywords: ['receive rent', 'transit rent', 'rent during', 'rent', 'kiraya', 'shift', 'transit', 'temporary accommodation', 'किराया', 'स्थानांतरण', 'अस्थायी आवास'],
    english: 'During redevelopment, eligible residents may receive monthly transit rent, temporary accommodation or shifting assistance according to the approved redevelopment agreement and applicable regulations. A&M Advisory helps residents understand the terms and coordinates with stakeholders throughout relocation.',
    hindi: 'पुनर्विकास के दौरान पात्र निवासियों को स्वीकृत पुनर्विकास समझौते और लागू नियमों के अनुसार मासिक transit rent, अस्थायी आवास या shifting assistance मिल सकती है। A&M Advisory शर्तें समझाने और स्थानांतरण के दौरान संबंधित पक्षों के साथ समन्वय करने में सहायता करता है।',
  },
  {
    id: 'approvals',
    keywords: ['approval', 'municipal', 'liaison', 'noc', 'अनुमोदन', 'मंजूरी', 'पालिका'],
    english: 'A&M Advisory assists with SRA and municipal approvals, government liaisoning, documentation, compliance and project coordination. Approval requirements and timelines depend on the project and the relevant authorities.',
    hindi: 'A&M Advisory SRA और municipal approvals, सरकारी विभागों से liaisoning, दस्तावेज़ीकरण, compliance और project coordination में सहायता करता है। अनुमोदन की आवश्यकताएँ और समय-सीमा परियोजना तथा संबंधित प्राधिकरण पर निर्भर करती हैं।',
  },
  {
    id: 'gbr-poa-da-cc',
    keywords: ['gbr', 'general body resolution', 'poa', 'power of attorney', 'development agreement', 'commencement certificate'],
    english: 'A&M Advisory supports meeting and document coordination for General Body Resolutions (GBR), execution-readiness for Power of Attorney (POA) and Development Agreements (DA), and submission tracking and liaisoning for the Commencement Certificate (CC). Legal instruments should be reviewed by qualified legal professionals, and CC is issued only by the competent authority.',
    hindi: 'A&M Advisory General Body Resolution (GBR) के meeting records और दस्तावेज़ coordination, Power of Attorney (POA) तथा Development Agreement (DA) की execution-readiness, और Commencement Certificate (CC) के submission tracking व liaisoning में सहायता करता है। कानूनी दस्तावेज़ों की समीक्षा योग्य legal professionals से करानी चाहिए और CC केवल सक्षम प्राधिकरण जारी करता है।',
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'call', 'email', 'whatsapp', 'site office', 'संपर्क', 'फ़ोन', 'फोन', 'कॉल', 'ईमेल'],
    english: 'You can contact A&M Advisory through the website contact form, phone, email, WhatsApp or the site office. Call +91 22 4564 8350 or email info@aquireandmanage.com, and the team will help with your project-related concern.',
    hindi: 'आप website contact form, फ़ोन, ईमेल, WhatsApp या site office के माध्यम से A&M Advisory से संपर्क कर सकते हैं। +91 22 4564 8350 पर कॉल करें या info@aquireandmanage.com पर ईमेल भेजें। हमारी टीम आपकी परियोजना से जुड़ी चिंता में सहायता करेगी।',
  },
  {
    id: 'consultation',
    keywords: ['schedule consultation', 'book consultation', 'consultation', 'appointment', 'meeting book', 'सलाह', 'परामर्श', 'अपॉइंटमेंट'],
    english: 'You can schedule a consultation through the website contact form, phone, email or WhatsApp. Call +91 22 4564 8350 or email info@aquireandmanage.com; the A&M Advisory team will respond and guide you through the next steps.',
    hindi: 'आप website contact form, फ़ोन, ईमेल या WhatsApp के माध्यम से consultation बुक कर सकते हैं। +91 22 4564 8350 पर कॉल करें या info@aquireandmanage.com पर ईमेल भेजें; A&M Advisory की टीम आगे की प्रक्रिया बताएगी।',
  },
  {
    id: 'annexure-name-missing',
    keywords: ['not in annexure', 'missing from annexure', 'name missing', 'name is not', 'नाम annexure', 'नाम नहीं', 'नाम गायब'],
    english: 'If your name is missing from Annexure II, you may still be able to apply for verification with supporting documents, subject to applicable rules. A&M Advisory can assist with eligibility review, document collection, verification guidance and application support. The competent authority makes the final decision.',
    hindi: 'यदि आपका नाम Annexure II में नहीं है, तो लागू नियमों के अधीन आप सहायक दस्तावेज़ों के साथ सत्यापन के लिए आवेदन कर सकते हैं। A&M Advisory eligibility review, document collection, verification guidance और application support में सहायता कर सकता है। अंतिम निर्णय सक्षम प्राधिकरण करता है।',
  },
  {
    id: 'annexure',
    keywords: ['annexure', 'annexure ii', 'annexure 2', 'परिशिष्ट'],
    english: 'Annexure II is an important document in the SRA process. It generally records details of eligible occupants and forms part of redevelopment verification. Accurate preparation helps reduce disputes and supports smoother project execution.',
    hindi: 'Annexure II SRA प्रक्रिया का एक महत्वपूर्ण दस्तावेज़ है। इसमें सामान्यतः पात्र निवासियों का विवरण दर्ज होता है और यह पुनर्विकास सत्यापन प्रक्रिया का हिस्सा होता है। इसे सही तरीके से तैयार करने से विवाद कम करने और परियोजना को सुचारु रूप से आगे बढ़ाने में मदद मिलती है।',
  },
  {
    id: 'consent',
    keywords: ['consent', 'percentage', 'percent', 'sahamati', 'सहमति', 'प्रतिशत'],
    english: 'Consent requirements are governed by applicable government and SRA rules and may vary by project and prevailing regulations. A&M Advisory supports transparent awareness, documentation and consent collection. Please verify the current requirement for your project with the competent authority.',
    hindi: 'सहमति की आवश्यकता लागू सरकारी और SRA नियमों के अनुसार तय होती है तथा परियोजना और वर्तमान नियमों के अनुसार बदल सकती है। A&M Advisory पारदर्शी जागरूकता, दस्तावेज़ीकरण और सहमति-संग्रह में सहायता करता है। अपनी परियोजना की वर्तमान आवश्यकता सक्षम प्राधिकरण से सत्यापित करें।',
  },
  {
    id: 'tenant-management',
    keywords: ['tenant management', 'occupancy survey', 'resident communication', 'lane recce', 'lidar', 'base map', 'society meeting', 'individual agreement', 'rent readiness', 'evacuation', 'demolition', 'fencing', 'निवासी', 'सर्वे', 'शिकायत', 'सोसायटी बैठक'],
    english: 'A&M Advisory supports tenant management through local facilitator coordination, society meetings, surveys and mapping, documentation and eligibility support, data reporting, special-case assistance, individual-agreement coordination, rent and KYC readiness, shifting and evacuation coordination, and post-closure demolition and fencing oversight.',
    hindi: 'A&M Advisory tenant management में स्थानीय facilitators का coordination, society meetings, survey और mapping, दस्तावेज़ व पात्रता सहायता, data reporting, विशेष मामलों में सहायता, individual agreements, rent और KYC readiness, shifting व evacuation coordination तथा demolition और fencing oversight प्रदान करता है।',
  },
  {
    id: 'liaisoning-services',
    keywords: ['liaisoning', 'liaison', 'noc', 'loi', 'ioa', 'municipal authority', 'government approval', 'regulatory challenge', 'statutory', 'सरकारी मंजूरी', 'अनुमोदन', 'समन्वय'],
    english: 'A&M Advisory coordinates with SRA and municipal authorities, manages proposal and document submissions, follows up on NOCs, LOI and IOA approvals, tracks compliance, supports stakeholder communication, helps resolve regulatory issues and coordinates specialist advisors where required. Final approvals are issued by the competent authorities.',
    hindi: 'A&M Advisory SRA और municipal authorities के साथ coordination, proposal व document submission, NOC, LOI और IOA approvals की follow-up, compliance tracking, stakeholder communication, regulatory issues के समाधान और specialist advisors के coordination में सहायता करता है। अंतिम मंजूरी सक्षम प्राधिकरण जारी करता है।',
  },
  {
    id: 'iec-services',
    keywords: ['iec', 'information education communication', 'town hall', 'micro-meeting', 'micro meeting', 'sms', 'ivr', 'grievance camp', 'misinformation', 'awareness campaign', 'जागरूकता', 'जनसंपर्क', 'शिकायत शिविर'],
    english: 'A&M Advisory IEC services include mobilisation events, community town halls, lane, chawl and society micro-meetings, policy and technical briefings, printed materials, WhatsApp, SMS and IVR communication, audio-visual explainers, grievance camps, media monitoring, misinformation response and awareness campaigns.',
    hindi: 'A&M Advisory की IEC services में mobilisation events, community town halls, lane, chawl और society micro-meetings, policy व technical briefings, printed materials, WhatsApp, SMS और IVR communication, audio-visual explainers, grievance camps, media monitoring, गलत जानकारी का समाधान और awareness campaigns शामिल हैं।',
  },
  {
    id: 'facility-management-services',
    keywords: ['facility management', 'maintenance', 'repair', 'vendor management', 'manpower', 'housekeeping', 'janitorial', 'security service', 'utility', 'energy management', 'space planning', 'asset management', 'सुविधा प्रबंधन', 'रखरखाव', 'सुरक्षा सेवा'],
    english: 'A&M Advisory facility-management support covers operations coordination, maintenance and repairs, vendor and manpower management, safety and compliance monitoring, asset and equipment management, preventive maintenance, housekeeping, security, utilities and energy management, and space planning.',
    hindi: 'A&M Advisory की facility-management services में operations coordination, maintenance और repair, vendor व manpower management, safety और compliance monitoring, asset व equipment management, preventive maintenance, housekeeping, security, utilities व energy management और space planning शामिल हैं।',
  },
  {
    id: 'pmc-architecture-construction',
    keywords: ['project management', 'pmc', 'project coordination', 'redevelopment management', 'construction coordination', 'construction service', 'architecture coordination', 'परियोजना प्रबंधन', 'निर्माण समन्वय'],
    english: 'A&M Advisory provides redevelopment and project-coordination support covering planning, documentation, stakeholder coordination, authority liaisoning, compliance tracking, architecture coordination and construction-stage coordination. The exact scope is tailored to each project.',
    hindi: 'A&M Advisory redevelopment और project coordination में planning, documentation, stakeholder coordination, authority liaisoning, compliance tracking, architecture coordination और construction-stage coordination की सहायता देता है। सेवा का सही scope प्रत्येक project के अनुसार तय होता है।',
  },
  {
    id: 'delays',
    keywords: ['how long', 'project take', 'duration', 'delay', 'dispute', 'risk', 'timeline', 'देरी', 'विवाद', 'समय', 'कितना समय'],
    english: 'An SRA project timeline includes government approvals, planning and design, construction, inspections and handover. Each project has its own duration based on complexity, readiness and authority response. A&M Advisory helps reduce delays and disputes through planning, communication, documentation, compliance, issue resolution and transparent coordination.',
    hindi: 'SRA परियोजना की समय-सीमा में सरकारी अनुमोदन, planning and design, निर्माण, inspections और handover शामिल होते हैं। अवधि परियोजना की जटिलता, तैयारी और प्राधिकरण की प्रतिक्रिया पर निर्भर करती है। A&M Advisory planning, communication, documentation, compliance, समस्या समाधान और पारदर्शी समन्वय से देरी व विवाद कम करने में सहायता करता है।',
  },
  {
    id: 'sell-transfer-flat',
    keywords: ['sell flat', 'sell rehabilitation', 'transfer flat', 'sell', 'transfer', 'lock-in', 'lock in', 'बेच', 'बिक्री', 'ट्रांसफर', 'हस्तांतरण'],
    english: 'Rehabilitation flats are governed by applicable government regulations. Before selling or transferring one, check the current rules, any lock-in period and all legal requirements. Consult a qualified expert and verify the position with the competent authority before making a decision.',
    hindi: 'Rehabilitation flat पर लागू सरकारी नियमों का पालन करना आवश्यक है। बेचने या transfer करने से पहले वर्तमान नियम, lock-in period और सभी कानूनी आवश्यकताओं की जाँच करें। निर्णय लेने से पहले योग्य विशेषज्ञ और सक्षम प्राधिकरण से स्थिति सत्यापित करें।',
  },
  {
    id: 'services',
    keywords: ['what services', 'your services', 'services provide', 'service offer', 'सेवाएँ', 'सेवा', 'क्या काम'],
    english: 'A&M Advisory provides end-to-end redevelopment support including SRA consultancy, project management (PMC), tenant management, liaisoning, documentation, architecture coordination, IEC activities and facility management—from planning through project completion.',
    hindi: 'A&M Advisory planning से project completion तक SRA consultancy, project management (PMC), tenant management, liaisoning, documentation, architecture coordination, IEC activities और facility management सहित end-to-end redevelopment support प्रदान करता है।',
  },
  {
    id: 'transparency',
    keywords: ['transparency', 'transparent', 'project updates', 'progress monitoring', 'पारदर्शिता', 'जानकारी कैसे', 'अपडेट'],
    english: 'A&M Advisory supports transparency through regular project updates, clear documentation, open communication, progress monitoring, professional coordination and timely issue resolution. This helps build trust among residents and other stakeholders.',
    hindi: 'A&M Advisory नियमित project updates, स्पष्ट दस्तावेज़ीकरण, खुला संवाद, progress monitoring, professional coordination और समय पर समस्या समाधान के माध्यम से पारदर्शिता बनाए रखने में सहायता करता है। इससे निवासियों और अन्य हितधारकों के बीच विश्वास बढ़ता है।',
  },
];

const HINDI_ROMAN_WORDS = /\b(kya|kaise|kaun|kaunsa|kaunse|chahiye|kitna|kitni|hai|hain|mera|meri|mujhe|aap|karna|batao|sahamati|patrata|kiraya)\b/i;
const HINGLISH_RESPONSE_WORDS = /\b(?:aap|aapka|aapke|aapki|aapko|baare|hain|hoon|karein|karna|liye|mein|mujhe|sakta|sakti|sakte)\b/gi;

function isHindi(message) {
  return /[\u0900-\u097f]/.test(message) || HINDI_ROMAN_WORDS.test(message);
}

function isHinglishResponse(answer) {
  const matches = answer.match(HINGLISH_RESPONSE_WORDS) || [];
  return new Set(matches.map((word) => word.toLocaleLowerCase('en-IN'))).size >= 2;
}

function findFaq(message) {
  const text = message.toLocaleLowerCase('en-IN');
  return FAQS
    .map((faq) => ({
      faq,
      score: faq.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? keyword.length : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)[0];
}

function fallbackAnswer(message, selectedLanguage) {
  const match = findFaq(message);
  const language = selectedLanguage === 'mr' ? 'mr' : selectedLanguage === 'hi' || (!selectedLanguage && isHindi(message)) ? 'hi' : 'en';
  const languageKey = language === 'mr' ? 'marathi' : language === 'hi' ? 'hindi' : 'english';
  if (match?.score > 0 && match.faq[languageKey]) return match.faq[languageKey];
  const fallbacks = {
    en: "I'm sorry, I couldn't find an exact answer. Please share your name and contact details through the Quick Enquiry form, and an A&M Advisory expert will get in touch with you.",
    hi: 'क्षमा करें, मुझे आपके प्रश्न का सटीक उत्तर नहीं मिला। कृपया अपना नाम और संपर्क विवरण Quick Enquiry form में साझा करें; A&M Advisory की टीम आपसे संपर्क करेगी।',
    mr: 'क्षमस्व, मला तुमच्या प्रश्नाचे अचूक उत्तर मिळाले नाही. कृपया Quick Enquiry form मध्ये तुमचे नाव आणि संपर्क तपशील द्या; A&M Advisory ची टीम तुमच्याशी संपर्क साधेल.',
  };
  return fallbacks[language];
}

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

async function answerQuestion(messages, selectedLanguage) {
  const latestMessage = messages.at(-1)?.content || '';
  const responseLanguage = selectedLanguage === 'mr' ? 'Marathi' : selectedLanguage === 'hi' ? 'Hindi' : 'English';
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_VECTOR_STORE_ID) {
    return { answer: fallbackAnswer(latestMessage, selectedLanguage), mode: 'knowledge-base' };
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_CHAT_MODEL || 'gpt-5.6-sol',
      instructions: `You are DiDi, A&M Advisory's professional and helpful virtual assistant.
Reply only in ${responseLanguage}. Never mix languages or use Romanized Hindi or Marathi.
Search the supplied A&M Advisory knowledge base before answering company, project, service, process, policy, eligibility, document or contact questions.
Use only retrieved company information. Never invent project claims, legal decisions, fixed timelines, consent percentages, guarantees or document requirements.
If retrieval is insufficient, say so in the selected language and offer the Quick Enquiry form. Keep answers concise, practical and empathetic. Recommend verification with the competent authority for legal or regulatory matters.`,
      input: messages.slice(-8).map((message) => ({
        role: message.role === 'assistant' ? 'assistant' : 'user',
        content: message.content,
      })),
      max_output_tokens: 350,
      tools: [{
        type: 'file_search',
        vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID],
        max_num_results: 5,
      }],
      tool_choice: 'required',
      include: ['file_search_call.results'],
      store: false,
    });

    const generatedAnswer = response.output_text || '';
    if (selectedLanguage === 'en' && isHinglishResponse(generatedAnswer)) {
      return { answer: fallbackAnswer(latestMessage, 'en'), mode: 'knowledge-base' };
    }
    return {
      answer: generatedAnswer || fallbackAnswer(latestMessage, selectedLanguage),
      mode: generatedAnswer ? 'rag' : 'knowledge-base',
      citations: extractCitations(response),
    };
  } catch (error) {
    console.error('OpenAI chatbot request failed:', error.message);
    return { answer: fallbackAnswer(latestMessage, selectedLanguage), mode: 'knowledge-base' };
  }
}

module.exports = { answerQuestion, fallbackAnswer };
