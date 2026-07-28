/**
 * A&M Advisory - Floating Actions & AI Chatbot Handler
 * ES6 Vanilla JavaScript for chatbot assistant, scroll-to-top, and quick enquiry triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollToTop();
  initChatbot();
});

const chatApiUrl = 'https://aquiretested-2.onrender.com/api/chat';
const suggestedQuestions = ['SRA kya hai?', 'Kaunse documents chahiye?', 'Timeline kitni hoti hai?', 'Eligibility kaise decide hoti hai?'];

function getAssistantReply(message) {
  const text = message.toLowerCase();
  if (text.includes('tenant') || text.includes('family') || text.includes('survey')) {
    return 'Our tenant management support covers surveys, documentation, resident coordination, rent readiness and relocation planning. Would you like to send a project enquiry?';
  }
  if (text.includes('approval') || text.includes('sra') || text.includes('mhada') || text.includes('government')) {
    return 'Our liaisoning team supports submissions, compliance documentation, authority coordination, NOCs and approval follow-ups. Timelines depend on project readiness and the relevant authority.';
  }
  if (text.includes('dharavi') || text.includes('antop') || text.includes('juhu')) {
    return 'We support complex Mumbai rehabilitation and redevelopment corridors through community coordination, documentation and execution advisory. Project-specific details are shared subject to approval.';
  }
  if (text.includes('contact') || text.includes('call') || text.includes('meeting') || text.includes('consult')) {
    return 'You can call +91 022-45648350, use WhatsApp, or complete the Quick Enquiry form in the Contact section.';
  }
  if (text.includes('service') || text.includes('help')) {
    return 'A&M Advisory provides Tenant Management, Liaisoning, IEC Activities and Facility Management support for redevelopment projects.';
  }
  return 'I can help with services, tenant management, SRA approvals, rehabilitation locations or contact details. For a project-specific answer, please use Quick Enquiry.';
}

/* Scroll To Top Button */
function initScrollToTop() {
  const topBtn = document.getElementById('scroll-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.remove('hidden');
      topBtn.classList.add('flex');
    } else {
      topBtn.classList.add('hidden');
      topBtn.classList.remove('flex');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Floating AI Chatbot */
function initChatbot() {
  const chatToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotModal = document.getElementById('chatbot-dialog');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestionsContainer = document.getElementById('chatbot-suggestions');

  if (!chatbotModal) return;

  let messages = [
    { sender: 'assistant', text: 'Hello! I’m A&M’s quick project assistant. How can I help with your redevelopment enquiry?' }
  ];

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener('click', () => {
      chatbotModal.classList.toggle('hidden');
      if (!chatbotModal.classList.contains('hidden') && chatInput) {
        chatInput.focus();
      }
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', () => {
      chatbotModal.classList.add('hidden');
    });
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = chatInput ? chatInput.value.trim() : '';
      if (userText) {
        sendMessage(userText);
      }
    });
  }

  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = suggestedQuestions.map(q => `
      <button type="button" class="chat-suggestion-chip rounded-full border border-slate-300 bg-white px-3 py-1.5 text-left text-[11px] font-semibold text-navy transition hover:border-crimson hover:text-crimson">
        ${q}
      </button>
    `).join('');

    suggestionsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-suggestion-chip');
      if (chip) {
        sendMessage(chip.textContent.trim());
      }
    });
  }

  async function sendMessage(text) {
    messages.push({ sender: 'user', text });
    if (chatInput) chatInput.value = '';
    renderMessages();

    // Show typing indicator
    showTypingIndicator();

    try {
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(-8).map(m => ({
            role: m.sender === 'assistant' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      removeTypingIndicator();
      messages.push({ sender: 'assistant', text: data.answer || getAssistantReply(text) });
    } catch {
      removeTypingIndicator();
      messages.push({ sender: 'assistant', text: getAssistantReply(text) });
    }

    renderMessages();
  }

  function renderMessages() {
    if (!messagesContainer) return;

    messagesContainer.innerHTML = messages.map(m => `
      <div class="max-w-[85%] rounded-xl px-4 py-2.5 text-xs leading-5 mb-2 ${
        m.sender === 'user' ? 'ml-auto bg-navy text-white' : 'bg-white text-slate-700 shadow-sm border border-slate-100'
      }">
        ${escapeHtml(m.text)}
      </div>
    `).join('');

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    if (!messagesContainer) return;
    const typing = document.createElement('div');
    typing.id = 'chat-typing';
    typing.className = 'flex items-center gap-1 bg-white px-4 py-2.5 rounded-xl text-xs text-slate-400 w-fit mb-2 shadow-sm';
    typing.innerHTML = `<span>Assistant is typing</span><span class="animate-pulse">...</span>`;
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('chat-typing');
    if (typing) typing.remove();
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}
