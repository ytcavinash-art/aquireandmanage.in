/**
 * A&M Advisory - Floating Actions & Bilingual Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {
  ensureChatbotStyles();
  initScrollToTop();
  initChatbot();
});

function ensureChatbotStyles() {
  if (document.querySelector('link[href*="css/chatbot.css"]')) return;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'css/chatbot.css?v=20260801-1';
  document.head.appendChild(stylesheet);
}

const chatApiUrl = 'https://aquiretested-2.onrender.com/api/chat';
const chatCopy = {
  en: {
    welcome: 'Hello 👋 Welcome to A&M Advisory. I can help with SRA redevelopment, eligibility, documents, Annexure II, consent, rent, approvals and tenant management. How can I help you?',
    placeholder: 'Ask your question in English...',
    inputLabel: 'Ask A&M Advisory in English',
    typing: 'Assistant is typing',
    suggestions: ['What services do you provide?', 'What is included in tenant management?', 'How do you support liaisoning and approvals?'],
  },
  hi: {
    welcome: 'नमस्कार 👋 A&M Advisory में आपका स्वागत है। मैं SRA पुनर्विकास, पात्रता, दस्तावेज़, Annexure II, सहमति, किराया, अनुमोदन और tenant management से जुड़े प्रश्नों में सहायता कर सकता हूँ। मैं आपकी कैसे सहायता करूँ?',
    placeholder: 'अपना प्रश्न हिंदी में पूछें...',
    inputLabel: 'A&M Advisory से हिंदी में प्रश्न पूछें',
    typing: 'सहायक उत्तर तैयार कर रहा है',
    suggestions: ['आप कौन-सी सेवाएँ देते हैं?', 'Tenant management में क्या शामिल है?', 'Liaisoning और approvals में क्या सहायता मिलती है?'],
  },
};

const instantServiceAnswers = [
  {
    keywords: ['tenant management', 'occupancy survey', 'lane recce', 'lidar', 'base map', 'society meeting', 'individual agreement', 'rent readiness', 'evacuation', 'demolition', 'fencing', 'किरायेदार प्रबंधन', 'निवासी सर्वे', 'सोसायटी बैठक'],
    en: 'A&M Advisory supports tenant management through local facilitator coordination, society meetings, surveys and mapping, documentation and eligibility support, data reporting, special-case assistance, individual-agreement coordination, rent/KYC readiness, shifting and evacuation coordination, and post-closure demolition and fencing oversight.',
    hi: 'A&M Advisory tenant management में स्थानीय facilitators का coordination, society meetings, survey और mapping, दस्तावेज़ व पात्रता सहायता, data reporting, विशेष मामलों में सहायता, individual agreements, rent/KYC readiness, shifting और evacuation coordination तथा demolition और fencing oversight प्रदान करता है।',
  },
  {
    keywords: ['liaisoning', 'liaison', 'noc', 'loi', 'ioa', 'municipal authority', 'government approval', 'regulatory challenge', 'statutory', 'सरकारी मंजूरी', 'अनुमोदन', 'समन्वय'],
    en: 'A&M Advisory coordinates with SRA and municipal authorities, manages proposal and document submissions, follows up on NOCs, LOI and IOA approvals, tracks compliance, supports stakeholder communication, helps resolve regulatory issues and coordinates specialist advisors where required. Final approvals are issued by the competent authorities.',
    hi: 'A&M Advisory SRA और municipal authorities के साथ coordination, proposal व document submission, NOC, LOI और IOA approvals की follow-up, compliance tracking, stakeholder communication, regulatory issues के समाधान और specialist advisors के coordination में सहायता करता है। अंतिम मंजूरी सक्षम प्राधिकरण जारी करता है।',
  },
  {
    keywords: ['iec', 'information education communication', 'town hall', 'micro-meeting', 'micro meeting', 'sms', 'ivr', 'grievance camp', 'misinformation', 'awareness campaign', 'जागरूकता', 'जनसंपर्क', 'शिकायत शिविर'],
    en: 'A&M Advisory’s IEC services include mobilisation events, community town halls, lane/chawl/society micro-meetings, policy and technical briefings, printed materials, WhatsApp/SMS/IVR communication, audio-visual explainers, grievance camps, media monitoring, misinformation response and awareness campaigns.',
    hi: 'A&M Advisory की IEC services में mobilisation events, community town halls, lane/chawl/society micro-meetings, policy और technical briefings, printed materials, WhatsApp/SMS/IVR communication, audio-visual explainers, grievance camps, media monitoring, गलत जानकारी का समाधान और awareness campaigns शामिल हैं।',
  },
  {
    keywords: ['facility management', 'maintenance', 'repair', 'vendor management', 'manpower', 'housekeeping', 'janitorial', 'security service', 'utility', 'energy management', 'space planning', 'asset management', 'सुविधा प्रबंधन', 'रखरखाव', 'सुरक्षा सेवा'],
    en: 'A&M Advisory’s facility-management support covers operations coordination, maintenance and repairs, vendor and manpower management, safety and compliance monitoring, asset and equipment management, preventive maintenance, housekeeping, security, utilities and energy management, and space planning.',
    hi: 'A&M Advisory की facility-management services में operations coordination, maintenance और repair, vendor व manpower management, safety और compliance monitoring, asset व equipment management, preventive maintenance, housekeeping, security, utilities व energy management और space planning शामिल हैं।',
  },
  {
    keywords: ['project management', 'pmc', 'project coordination', 'redevelopment management', 'construction coordination', 'construction service', 'architecture coordination', 'परियोजना प्रबंधन', 'निर्माण समन्वय'],
    en: 'A&M Advisory provides redevelopment and project-coordination support covering planning, documentation, stakeholder coordination, authority liaisoning, compliance tracking, architecture coordination and construction-stage coordination. The exact scope is tailored to each project.',
    hi: 'A&M Advisory redevelopment और project coordination में planning, documentation, stakeholder coordination, authority liaisoning, compliance tracking, architecture coordination और construction-stage coordination की सहायता देता है। सेवा का सही scope प्रत्येक project के अनुसार तय होता है।',
  },
  {
    keywords: ['gbr', 'general body resolution', 'poa', 'power of attorney', 'development agreement', 'commencement certificate'],
    en: 'A&M Advisory supports meeting records and document coordination for GBR, execution readiness for POA and Development Agreements, and submission tracking and liaisoning for the Commencement Certificate. Legal documents require review by qualified professionals, and the competent authority issues the CC.',
    hi: 'A&M Advisory GBR के meeting records और document coordination, POA व Development Agreement की execution readiness तथा Commencement Certificate के submission tracking और liaisoning में सहायता करता है। कानूनी दस्तावेज़ qualified professionals से review कराएँ; CC सक्षम प्राधिकरण जारी करता है।',
  },
  {
    keywords: ['services', 'service provide', 'what do you do', 'क्या काम', 'कौन सी सेवा', 'सेवाएं', 'सेवाएँ'],
    en: 'A&M Advisory provides SRA redevelopment and PMC advisory, tenant management, government liaisoning, documentation and compliance support, IEC activities, architecture and construction coordination, legal-process coordination, and facility management.',
    hi: 'A&M Advisory SRA redevelopment और PMC advisory, tenant management, government liaisoning, documentation व compliance support, IEC activities, architecture और construction coordination, legal-process coordination तथा facility management services प्रदान करता है।',
  },
];

function getInstantServiceReply(message, language) {
  const text = message.toLocaleLowerCase('en-IN');
  const match = instantServiceAnswers.find((service) => (
    service.keywords.some((keyword) => text.includes(keyword))
  ));
  return match ? match[language === 'hi' ? 'hi' : 'en'] : '';
}

function getSelectedChatLanguage() {
  const selectedValue = document.querySelector('.language-select')?.value;
  const savedValue = localStorage.getItem('am_selected_language');
  const pageLanguage = document.documentElement.lang?.split('-')[0];
  if (selectedValue) return selectedValue === 'en' ? 'en' : 'hi';
  if (savedValue) return savedValue === 'en' ? 'en' : 'hi';
  return pageLanguage === 'en' ? 'en' : 'hi';
}

function getAssistantReply(message, selectedLanguage = getSelectedChatLanguage()) {
  const text = message.toLocaleLowerCase('en-IN');
  const hindi = selectedLanguage === 'hi';
  const reply = (english, hindiText) => hindi ? hindiText : english;

  if ((text.includes('annexure') && ['not', 'missing', 'नहीं', 'गायब'].some((word) => text.includes(word))) || text.includes('name missing')) {
    return reply(
      'If your name is missing from Annexure II, you may still be able to apply for verification with supporting documents, subject to applicable rules. A&M Advisory can assist with eligibility review, document collection, verification guidance and application support. The competent authority makes the final decision.',
      'यदि आपका नाम Annexure II में नहीं है, तो लागू नियमों के अधीन आप सहायक दस्तावेज़ों के साथ सत्यापन के लिए आवेदन कर सकते हैं। A&M Advisory eligibility review, document collection, verification guidance और application support में सहायता कर सकता है। अंतिम निर्णय सक्षम प्राधिकरण करता है।'
    );
  }
  if (text.includes('annexure')) {
    return reply(
      'Annexure II records details of eligible occupants and forms an important part of SRA verification. Accurate preparation helps reduce disputes and supports smoother execution.',
      'Annexure II में सामान्यतः पात्र निवासियों का विवरण दर्ज होता है और यह SRA सत्यापन का महत्वपूर्ण हिस्सा है। इसे सही तरीके से तैयार करने से विवाद कम करने में मदद मिलती है।'
    );
  }
  if (['document', 'paper', 'kagaz', 'kyc', 'दस्तावेज', 'कागज', 'आधार'].some((word) => text.includes(word))) {
    return reply(
      'Documents may include Aadhaar, PAN, Ration Card, Voter ID, electricity bill, Photo Pass, occupancy documents, photographs and other supporting documents. The exact checklist varies by project, and A&M Advisory can help prepare it.',
      'आमतौर पर आधार, पैन, राशन कार्ड, वोटर आईडी, बिजली बिल, फोटो पास, कब्ज़े से जुड़े दस्तावेज़, फोटो और अन्य सहायक दस्तावेज़ माँगे जा सकते हैं। सही सूची परियोजना के अनुसार बदलती है और A&M Advisory इसे तैयार करने में सहायता कर सकता है।'
    );
  }
  if (['eligib', 'eligible', 'patra', 'patrata', 'पात्र'].some((word) => text.includes(word))) {
    return reply(
      'Eligibility is verified under applicable Maharashtra Government and SRA rules. A&M Advisory can support eligibility assessment, document verification, Annexure II guidance, application support and process consultation, but the competent authority makes the final decision.',
      'पात्रता की जाँच लागू महाराष्ट्र सरकार और SRA नियमों के तहत होती है। A&M Advisory eligibility assessment, document verification, Annexure II guidance, application support और process consultation में सहायता कर सकता है, लेकिन अंतिम निर्णय सक्षम प्राधिकरण करता है।'
    );
  }
  if (['rent', 'kiraya', 'shift', 'transit', 'किराया', 'अस्थायी'].some((word) => text.includes(word))) {
    return reply(
      'Eligible residents may receive monthly transit rent, temporary accommodation or shifting assistance according to the approved agreement and applicable rules. A&M Advisory supports relocation coordination.',
      'पात्र निवासियों को स्वीकृत समझौते और लागू नियमों के अनुसार मासिक transit rent, अस्थायी आवास या shifting assistance मिल सकती है। A&M Advisory स्थानांतरण समन्वय में सहायता करता है।'
    );
  }
  if (['consent', 'percent', 'sahamati', 'सहमति', 'प्रतिशत'].some((word) => text.includes(word))) {
    return reply(
      'Consent requirements vary with the project and prevailing government rules. Please verify the current requirement with the competent authority; A&M Advisory can support awareness, documentation and consent collection.',
      'सहमति की आवश्यकता परियोजना और वर्तमान सरकारी नियमों के अनुसार बदल सकती है। वर्तमान आवश्यकता सक्षम प्राधिकरण से सत्यापित करें; A&M Advisory जागरूकता, दस्तावेज़ीकरण और consent collection में सहायता करता है।'
    );
  }
  if (['tenant', 'family', 'survey', 'निवासी', 'सर्वे', 'शिकायत'].some((word) => text.includes(word))) {
    return reply(
      'Tenant-management support includes surveys, data collection, resident communication, documentation, consent coordination, grievance handling, verification and progress tracking.',
      'Tenant management में सर्वे, डेटा संग्रह, निवासियों से संवाद, दस्तावेज़ीकरण, consent coordination, शिकायत समाधान, सत्यापन और प्रगति की निगरानी शामिल है।'
    );
  }
  if (['gbr', 'general body resolution', 'poa', 'power of attorney', 'development agreement', 'commencement certificate'].some((word) => text.includes(word))) {
    return reply(
      'A&M Advisory supports meeting and document coordination for General Body Resolutions (GBR), execution-readiness for Power of Attorney (POA) and Development Agreements (DA), and submission tracking and liaisoning for the Commencement Certificate (CC). Legal instruments require qualified legal review, and CC is issued only by the competent authority.',
      'A&M Advisory General Body Resolution (GBR) के meeting records और document coordination, Power of Attorney (POA) तथा Development Agreement (DA) की execution-readiness, और Commencement Certificate (CC) के submission tracking व liaisoning में सहायता करता है। Legal documents की समीक्षा qualified professionals से करानी चाहिए और CC केवल सक्षम प्राधिकरण जारी करता है।'
    );
  }
  if (['approval', 'municipal', 'liaison', 'noc', 'मंजूरी', 'अनुमोदन'].some((word) => text.includes(word))) {
    return reply(
      'A&M Advisory assists with SRA and municipal approvals, government liaisoning, documentation, compliance and project coordination. Requirements and timelines depend on the relevant authorities.',
      'A&M Advisory SRA और municipal approvals, सरकारी liaisoning, दस्तावेज़ीकरण, compliance और project coordination में सहायता करता है। आवश्यकताएँ और समय-सीमा संबंधित प्राधिकरण पर निर्भर करती हैं।'
    );
  }
  if (['sell', 'transfer flat', 'lock-in', 'lock in', 'बेच', 'बिक्री', 'ट्रांसफर', 'हस्तांतरण'].some((word) => text.includes(word))) {
    return reply(
      'Rehabilitation flats are governed by applicable government regulations. Before selling or transferring one, check the current rules, any lock-in period and all legal requirements. Consult a qualified expert and the competent authority before deciding.',
      'Rehabilitation flat पर लागू सरकारी नियमों का पालन करना आवश्यक है। बेचने या transfer करने से पहले वर्तमान नियम, lock-in period और कानूनी आवश्यकताओं की जाँच करें। निर्णय से पहले योग्य विशेषज्ञ और सक्षम प्राधिकरण से सत्यापन करें।'
    );
  }
  if (['consultation', 'appointment', 'meeting book', 'परामर्श', 'अपॉइंटमेंट'].some((word) => text.includes(word))) {
    return reply(
      'Schedule a consultation through the website contact form, phone, email or WhatsApp. Call +91 022-45648350 or email info@aquireandmanage.com, and the team will guide you through the next steps.',
      'आप website contact form, फ़ोन, ईमेल या WhatsApp से consultation बुक कर सकते हैं। +91 022-45648350 पर कॉल करें या info@aquireandmanage.com पर ईमेल भेजें; हमारी टीम आगे की प्रक्रिया बताएगी।'
    );
  }
  if (['contact', 'call', 'phone', 'email', 'whatsapp', 'संपर्क', 'फोन'].some((word) => text.includes(word))) {
    return reply(
      'Call +91 022-45648350, email info@aquireandmanage.com, use WhatsApp, or complete the website Quick Enquiry form.',
      '+91 022-45648350 पर कॉल करें, info@aquireandmanage.com पर ईमेल भेजें, WhatsApp करें या website का Quick Enquiry form भरें।'
    );
  }
  if (['delay', 'dispute', 'timeline', 'देरी', 'विवाद', 'समय'].some((word) => text.includes(word))) {
    return reply(
      'An SRA timeline includes government approvals, planning and design, construction, inspections and handover. Every project has its own duration based on complexity, readiness and authority response.',
      'SRA परियोजना की समय-सीमा में सरकारी अनुमोदन, planning and design, निर्माण, inspections और handover शामिल होते हैं। अवधि परियोजना की जटिलता, तैयारी और प्राधिकरण की प्रतिक्रिया पर निर्भर करती है।'
    );
  }
  if (['transparency', 'transparent', 'project update', 'progress monitoring', 'पारदर्शिता', 'अपडेट'].some((word) => text.includes(word))) {
    return reply(
      'A&M Advisory supports transparency through regular project updates, clear documentation, open communication, progress monitoring, professional coordination and timely issue resolution.',
      'A&M Advisory नियमित project updates, स्पष्ट दस्तावेज़ीकरण, खुला संवाद, progress monitoring, professional coordination और समय पर समस्या समाधान से पारदर्शिता बनाए रखने में सहायता करता है।'
    );
  }
  if (['what services', 'your services', 'services provide', 'service offer', 'सेवाएँ', 'सेवा', 'क्या काम'].some((word) => text.includes(word))) {
    return reply(
      'A&M Advisory provides SRA consultancy, project management (PMC), tenant management, liaisoning, documentation, architecture coordination, IEC activities and facility management—from planning through project completion.',
      'A&M Advisory planning से completion तक SRA consultancy, project management (PMC), tenant management, liaisoning, documentation, architecture coordination, IEC activities और facility management प्रदान करता है।'
    );
  }
  if (['sra', 'rehabilitation', 'redevelopment', 'पुनर्विकास'].some((word) => text.includes(word))) {
    return reply(
      'An SRA project is a government-approved initiative that provides eligible slum residents with permanent rehabilitation homes while enabling planned redevelopment of the land.',
      'SRA सरकार द्वारा स्वीकृत पुनर्विकास योजना है, जिसमें पात्र झुग्गीवासियों को स्थायी पुनर्वास आवास दिया जाता है और भूमि का नियोजित विकास किया जाता है।'
    );
  }
  return reply(
    "I'm sorry, I couldn't find an exact answer. Please share your name and contact details through Quick Enquiry, and an A&M Advisory expert will get in touch.",
    'क्षमा करें, मुझे आपके प्रश्न का सटीक उत्तर नहीं मिला। कृपया Quick Enquiry में अपना नाम और संपर्क विवरण साझा करें; A&M Advisory की टीम आपसे संपर्क करेगी।'
  );
}

function initScrollToTop() {
  const topBtn = document.getElementById('scroll-top-btn');
  if (!topBtn) return;
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('hidden', window.scrollY <= 500);
    topBtn.classList.toggle('flex', window.scrollY > 500);
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initChatbot() {
  const chatToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotModal = document.getElementById('chatbot-dialog');
  if (!chatbotModal) return;

  chatToggleBtn?.classList.add('didi-launcher');
  if (chatToggleBtn) {
    chatToggleBtn.innerHTML = '<img src="images/didi-avatar.png" alt="" width="52" height="52" />';

    const launcherLabel = document.createElement('div');
    launcherLabel.id = 'didi-launcher-label';
    launcherLabel.className = 'didi-launcher-label';
    launcherLabel.textContent = 'A&M Advisory DiDi';
    chatToggleBtn.parentElement?.insertBefore(launcherLabel, chatToggleBtn);
  }
  chatToggleBtn?.setAttribute('aria-label', 'Open A&M Advisory DiDi');
  chatToggleBtn?.setAttribute('aria-expanded', 'false');
  chatbotModal.classList.add('didi-chat');
  chatbotModal.setAttribute('role', 'dialog');
  chatbotModal.setAttribute('aria-modal', 'false');
  chatbotModal.setAttribute('aria-labelledby', 'didi-chat-title');
  chatbotModal.innerHTML = `
    <header class="didi-header">
      <div class="didi-profile">
        <div class="didi-avatar"><img src="images/didi-avatar.png" alt="" /></div>
        <div>
          <h2 id="didi-chat-title" class="didi-title">A&amp;M Advisory DiDi</h2>
          <p class="didi-status"><span id="didi-status-text">Virtual Assistant</span></p>
        </div>
      </div>
      <button id="chatbot-close-btn" type="button" class="didi-close" aria-label="Minimize chatbot">−</button>
    </header>
    <section class="didi-panel">
      <div id="chatbot-messages" class="didi-messages" aria-live="polite" aria-label="Chat messages"></div>
      <div id="chatbot-suggestions" class="didi-suggestions" aria-label="Suggested questions"></div>
      <button id="didi-scroll-messages" type="button" class="didi-scroll-messages" aria-label="Scroll to first message">↑</button>
      <div class="didi-chat-tools">
        <div id="didi-language-menu" class="didi-language-menu" hidden>
          <button type="button" class="didi-language-option" data-language="en">◎ English</button>
          <button type="button" class="didi-language-option" data-language="hi">◎ हिन्दी (Hindi)</button>
        </div>
        <form id="chatbot-form" class="didi-form">
          <button id="didi-language-toggle" type="button" class="didi-icon-button" aria-label="Choose chat language" aria-expanded="false">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
          </button>
          <input id="chatbot-input" class="didi-input" type="text" maxlength="600" autocomplete="off" />
          <button id="didi-mic" type="button" class="didi-icon-button" aria-label="Speak your question">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v4M9 21h6"/></svg>
          </button>
          <button id="didi-send" type="submit" class="didi-send" aria-label="Send message">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    </section>
  `;

  const chatCloseBtn = document.getElementById('chatbot-close-btn');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const sendButton = document.getElementById('didi-send');
  const micButton = document.getElementById('didi-mic');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestionsContainer = document.getElementById('chatbot-suggestions');
  const languageToggle = document.getElementById('didi-language-toggle');
  const languageMenu = document.getElementById('didi-language-menu');
  const scrollMessagesButton = document.getElementById('didi-scroll-messages');
  const statusText = document.getElementById('didi-status-text');
  let activeLanguage = getSelectedChatLanguage();
  let isSending = false;
  const messages = [{ sender: 'assistant', text: chatCopy[activeLanguage].welcome, isWelcome: true }];

  function setOpen(open) {
    chatbotModal.classList.toggle('hidden', !open);
    chatToggleBtn?.setAttribute('aria-expanded', String(open));
    document.getElementById('didi-launcher-label')?.classList.toggle('hidden', open);
    if (open) window.setTimeout(() => chatInput?.focus(), 80);
  }

  chatToggleBtn?.addEventListener('click', () => setOpen(chatbotModal.classList.contains('hidden')));
  chatCloseBtn?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !chatbotModal.classList.contains('hidden')) setOpen(false);
  });

  function applyChatLanguage(language, replaceWelcome = false) {
    activeLanguage = language === 'hi' ? 'hi' : 'en';
    localStorage.setItem('am_selected_language', activeLanguage);
    const copy = chatCopy[activeLanguage];
    chatInput.placeholder = copy.placeholder;
    chatInput.setAttribute('aria-label', copy.inputLabel);
    sendButton.setAttribute('aria-label', activeLanguage === 'hi' ? 'संदेश भेजें' : 'Send message');
    statusText.textContent = activeLanguage === 'hi' ? 'आपकी वर्चुअल सहायक' : 'Your virtual assistant';
    languageMenu.querySelectorAll('[data-language]').forEach((option) => {
      option.classList.toggle('selected', option.dataset.language === activeLanguage);
    });
    if (replaceWelcome && messages.length === 1 && messages[0].isWelcome) {
      messages[0].text = copy.welcome;
      renderMessages();
    }
    suggestionsContainer.innerHTML = copy.suggestions.slice(0, 3).map((question) => `
      <button type="button" class="didi-suggestion" data-question="${escapeHtml(question)}">${escapeHtml(question)}</button>
    `).join('');
  }

  function selectLanguage(language) {
    const websiteLanguage = language === 'hi' ? 'hi' : 'en';
    const websiteSelect = document.querySelector('.language-select');
    localStorage.setItem('am_selected_language', websiteLanguage);
    applyChatLanguage(websiteLanguage, true);
    if (websiteSelect) {
      websiteSelect.value = websiteLanguage;
      websiteSelect.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      document.documentElement.lang = websiteLanguage;
    }
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }

  applyChatLanguage(activeLanguage);
  document.querySelectorAll('.language-select').forEach((select) => {
    select.addEventListener('change', (event) => {
      applyChatLanguage(event.target.value === 'en' ? 'en' : 'hi', true);
    });
  });

  languageToggle.addEventListener('click', () => {
    languageMenu.hidden = !languageMenu.hidden;
    languageToggle.setAttribute('aria-expanded', String(!languageMenu.hidden));
  });
  languageMenu.addEventListener('click', (event) => {
    const option = event.target.closest('[data-language]');
    if (option) selectLanguage(option.dataset.language);
  });
  document.addEventListener('click', (event) => {
    if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) {
      languageMenu.hidden = true;
      languageToggle.setAttribute('aria-expanded', 'false');
    }
  });

  suggestionsContainer.addEventListener('click', (event) => {
    const suggestion = event.target.closest('[data-question]');
    if (suggestion) sendMessage(suggestion.dataset.question);
  });
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userText = chatInput.value.trim();
    if (userText) sendMessage(userText);
  });

  messagesContainer.addEventListener('scroll', () => {
    scrollMessagesButton.classList.toggle('visible', messagesContainer.scrollTop > 100);
  }, { passive: true });
  scrollMessagesButton.addEventListener('click', () => {
    messagesContainer.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    micButton.addEventListener('click', () => {
      const recognition = new SpeechRecognition();
      recognition.lang = activeLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.addEventListener('start', () => micButton.setAttribute('aria-pressed', 'true'));
      recognition.addEventListener('end', () => micButton.removeAttribute('aria-pressed'));
      recognition.addEventListener('result', (event) => {
        chatInput.value = event.results[0][0].transcript;
        chatInput.focus();
      });
      recognition.start();
    });
  } else {
    micButton.hidden = true;
  }

  async function sendMessage(text) {
    if (isSending) return;
    const selectedLanguage = activeLanguage;
    activeLanguage = selectedLanguage;
    messages.push({ sender: 'user', text });
    chatInput.value = '';
    renderMessages();

    const instantReply = getInstantServiceReply(text, selectedLanguage);
    if (instantReply) {
      messages.push({ sender: 'assistant', text: instantReply });
      renderMessages();
      chatInput.focus();
      return;
    }

    isSending = true;
    sendButton.disabled = true;
    showTypingIndicator();
    try {
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          messages: messages.slice(-8).map((message) => ({
            role: message.sender === 'assistant' ? 'assistant' : 'user',
            content: message.text,
          })),
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      messages.push({ sender: 'assistant', text: data.answer || getAssistantReply(text, selectedLanguage) });
    } catch {
      messages.push({ sender: 'assistant', text: getAssistantReply(text, selectedLanguage) });
    } finally {
      isSending = false;
      sendButton.disabled = false;
      removeTypingIndicator();
      renderMessages();
      chatInput.focus();
    }
  }

  function renderMessages() {
    const timestamp = new Intl.DateTimeFormat(activeLanguage === 'hi' ? 'hi-IN' : 'en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date());
    messagesContainer.innerHTML = `<div class="didi-timestamp">${escapeHtml(timestamp)}</div>${messages.map((message) => `
      <div class="didi-message-row ${message.sender === 'user' ? 'user' : 'assistant'}">
        ${message.sender === 'assistant' ? '<div class="didi-message-avatar"><img src="images/didi-avatar.png" alt="" /></div>' : ''}
        <div class="didi-bubble">${escapeHtml(message.text)}</div>
      </div>
    `).join('')}`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'chat-typing';
    typing.className = 'didi-typing';
    typing.setAttribute('aria-label', chatCopy[activeLanguage].typing);
    typing.innerHTML = '<span class="didi-dot"></span><span class="didi-dot"></span><span class="didi-dot"></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    document.getElementById('chat-typing')?.remove();
  }

  function escapeHtml(value) {
    return (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  renderMessages();
}
