/**
 * A&M Advisory - Floating Actions & Bilingual Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollToTop();
  initChatbot();
});

const chatApiUrl = 'https://aquiretested-2.onrender.com/api/chat';
const chatCopy = {
  en: {
    welcome: 'Hello 👋 Welcome to A&M Advisory. I can help with SRA redevelopment, eligibility, documents, Annexure II, consent, rent, approvals and tenant management. How can I help you?',
    placeholder: 'Ask your question in English...',
    inputLabel: 'Ask A&M Advisory in English',
    typing: 'Assistant is typing',
    suggestions: ['What is SRA?', 'Which documents are required?', 'What is Annexure II?', 'How is eligibility decided?'],
  },
  hi: {
    welcome: 'नमस्कार 👋 A&M Advisory में आपका स्वागत है। मैं SRA पुनर्विकास, पात्रता, दस्तावेज़, Annexure II, सहमति, किराया, अनुमोदन और tenant management से जुड़े प्रश्नों में सहायता कर सकता हूँ। मैं आपकी कैसे सहायता करूँ?',
    placeholder: 'अपना प्रश्न हिंदी में पूछें...',
    inputLabel: 'A&M Advisory से हिंदी में प्रश्न पूछें',
    typing: 'सहायक उत्तर तैयार कर रहा है',
    suggestions: ['SRA क्या है?', 'कौनसे दस्तावेज़ चाहिए?', 'Annexure II क्या है?', 'पात्रता कैसे तय होती है?'],
  },
};

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
  const chatCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotModal = document.getElementById('chatbot-dialog');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestionsContainer = document.getElementById('chatbot-suggestions');
  if (!chatbotModal) return;
  let activeLanguage = getSelectedChatLanguage();
  const messages = [{ sender: 'assistant', text: chatCopy[activeLanguage].welcome, isWelcome: true }];

  chatToggleBtn?.addEventListener('click', () => {
    chatbotModal.classList.toggle('hidden');
    if (!chatbotModal.classList.contains('hidden')) chatInput?.focus();
  });
  chatCloseBtn?.addEventListener('click', () => chatbotModal.classList.add('hidden'));
  chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const userText = chatInput?.value.trim();
    if (userText) sendMessage(userText);
  });

  function applyChatLanguage(language, replaceWelcome = false) {
    activeLanguage = language === 'hi' ? 'hi' : 'en';
    const copy = chatCopy[activeLanguage];
    if (chatInput) {
      chatInput.placeholder = copy.placeholder;
      chatInput.setAttribute('aria-label', copy.inputLabel);
    }
    if (replaceWelcome && messages.length === 1 && messages[0].isWelcome) {
      messages[0].text = copy.welcome;
      renderMessages();
    }
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = copy.suggestions.map((question) => `
      <button type="button" class="chat-suggestion-chip rounded-full border border-slate-300 bg-white px-3 py-1.5 text-left text-[11px] font-semibold text-navy transition hover:border-crimson hover:text-crimson">${question}</button>
    `).join('');
  }

  applyChatLanguage(activeLanguage);

  document.querySelectorAll('.language-select').forEach((select) => {
    select.addEventListener('change', (event) => {
      applyChatLanguage(event.target.value === 'en' ? 'en' : 'hi', true);
    });
  });

  if (suggestionsContainer) {
    suggestionsContainer.addEventListener('click', (event) => {
      const chip = event.target.closest('.chat-suggestion-chip');
      if (chip) sendMessage(chip.textContent.trim());
    });
  }

  async function sendMessage(text) {
    const selectedLanguage = getSelectedChatLanguage();
    activeLanguage = selectedLanguage;
    messages.push({ sender: 'user', text });
    if (chatInput) chatInput.value = '';
    renderMessages();
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
      removeTypingIndicator();
      renderMessages();
    }
  }

  function renderMessages() {
    if (!messagesContainer) return;
    messagesContainer.innerHTML = messages.map((message) => `
      <div class="max-w-[85%] whitespace-pre-line rounded-xl px-4 py-2.5 text-xs leading-5 mb-2 ${
        message.sender === 'user' ? 'ml-auto bg-navy text-white' : 'bg-white text-slate-700 shadow-sm border border-slate-100'
      }">${escapeHtml(message.text)}</div>
    `).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    if (!messagesContainer) return;
    const typing = document.createElement('div');
    typing.id = 'chat-typing';
    typing.className = 'flex items-center gap-1 bg-white px-4 py-2.5 rounded-xl text-xs text-slate-400 w-fit mb-2 shadow-sm';
    typing.innerHTML = `<span>${chatCopy[activeLanguage].typing}</span><span class="animate-pulse">...</span>`;
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
