import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp, Bot, MessageCircle, Phone, Send, X } from 'lucide-react';

type ChatMessage = { id: number; sender: 'assistant' | 'user'; text: string };

const whatsappHref = 'https://wa.me/912245648350?text=Hello%20A%26M%20Advisory%2C%20I%20would%20like%20to%20discuss%20a%20redevelopment%20project.';
const chatApiUrl = 'https://aquiretested-2.onrender.com/api/chat';
const suggestedQuestions = ['SRA kya hai?', 'Kaunse documents chahiye?', 'Timeline kitni hoti hai?', 'Eligibility kaise decide hoti hai?'];

function getAssistantReply(message: string) {
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
    return 'You can call +91 022-45648350, use WhatsApp, or complete the Quick Enquiry form in the Contact section. I can take you there now.';
  }
  if (text.includes('service') || text.includes('help')) {
    return 'A&M Advisory provides Tenant Management, Liaisoning, IEC Activities and Facility Management support for redevelopment projects.';
  }
  return 'I can help with services, tenant management, SRA approvals, rehabilitation locations or contact details. For a project-specific answer, please use Quick Enquiry.';
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'assistant', text: 'Hello! I’m A&M’s quick project assistant. How can I help with your redevelopment enquiry?' },
  ]);
  const [input, setInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'ai' | 'knowledge-base'>('knowledge-base');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatOpen) inputRef.current?.focus();
  }, [chatOpen]);

  const askQuestion = async (message: string) => {
    if (!message) return;
    const timestamp = Date.now();
    const nextMessages: ChatMessage[] = [
      ...messages,
      { id: timestamp, sender: 'user', text: message },
    ];
    setMessages(nextMessages);
    setInput('');
    setIsReplying(true);

    try {
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-8).map((item) => ({
            role: item.sender === 'assistant' ? 'assistant' : 'user',
            content: item.text,
          })),
        }),
      });
      if (!response.ok) throw new Error('Chat service unavailable');
      const data = await response.json();
      setAssistantMode(data.mode === 'ai' ? 'ai' : 'knowledge-base');
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: timestamp + 1, sender: 'assistant', text: data.answer },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: timestamp + 1, sender: 'assistant', text: getAssistantReply(message) },
      ]);
    } finally {
      setIsReplying(false);
    }
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(input.trim());
  };

  const goToContact = () => {
    setChatOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const actionClass = 'group relative grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white';

  return (
    <>
      {chatOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-title"
          className="fixed inset-x-3 bottom-3 top-20 z-[90] flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-28 sm:right-6 sm:top-auto sm:h-[min(520px,70vh)] sm:w-[calc(100vw-3rem)] sm:max-w-sm sm:rounded-none"
        >
          <header className="flex shrink-0 items-center justify-between bg-navy px-4 py-3.5 text-white sm:px-5 sm:py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10"><Bot size={19} aria-hidden="true" /></span>
              <div>
                <h2 id="assistant-title" className="text-sm font-bold text-white">A&amp;M Project Assistant</h2>
                <p className="mt-0.5 text-[10px] text-white/60">{assistantMode === 'ai' ? 'AI-powered guidance' : 'Verified knowledge guidance'}</p>
              </div>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close chat assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message) => (
              <p key={message.id} className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-5 ${
                message.sender === 'user' ? 'ml-auto bg-navy text-white' : 'bg-white text-slate-600 shadow-sm'
              }`}>
                {message.text}
              </p>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedQuestions.map((question) => (
                  <button key={question} type="button" onClick={() => void askQuestion(question)} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-left text-[11px] font-semibold text-navy transition hover:border-crimson hover:text-crimson">
                    {question}
                  </button>
                ))}
              </div>
            )}
            {isReplying && (
              <div className="flex w-fit items-center gap-1 rounded-xl bg-white px-4 py-3 shadow-sm" role="status" aria-label="Assistant is typing">
                {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${dot * 120}ms` }} />)}
              </div>
            )}
          </div>

          <button type="button" onClick={goToContact} className="shrink-0 border-t border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-crimson hover:bg-slate-50">
            Open Quick Enquiry
          </button>
          <form onSubmit={sendMessage} className="flex shrink-0 gap-2 border-t border-slate-200 bg-white p-3">
            <label htmlFor="assistant-message" className="sr-only">Ask the project assistant</label>
            <input
              ref={inputRef}
              id="assistant-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about SRA, approvals..."
              disabled={isReplying}
              className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 text-sm text-navy focus:border-navy"
            />
            <button type="submit" disabled={isReplying || !input.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crimson text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message">
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <nav aria-label="Quick contact actions" className={`fixed bottom-5 right-4 z-[65] flex-col items-end gap-2.5 sm:bottom-6 sm:right-6 ${chatOpen ? 'hidden sm:flex' : 'flex'}`}>
        {showTop && (
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${actionClass} bg-slate-700`} aria-label="Back to top">
            <ArrowUp size={19} aria-hidden="true" />
            <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-[10px] font-bold opacity-0 transition group-hover:opacity-100">Back to Top</span>
          </button>
        )}
        <button type="button" onClick={() => setChatOpen((open) => !open)} className={`${actionClass} bg-navy`} aria-label={chatOpen ? 'Close project assistant' : 'Open project assistant'} aria-expanded={chatOpen}>
          {chatOpen ? <X size={19} aria-hidden="true" /> : <Bot size={20} aria-hidden="true" />}
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-[10px] font-bold opacity-0 transition group-hover:opacity-100">Chat Assistant</span>
        </button>
        <a href="tel:+912245648350" className={`${actionClass} bg-crimson`} aria-label="Call A&M Advisory">
          <Phone size={19} aria-hidden="true" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-[10px] font-bold opacity-0 transition group-hover:opacity-100">Call Now</span>
        </a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className={`${actionClass} bg-[#25D366]`} aria-label="Chat with A&M Advisory on WhatsApp">
          <MessageCircle size={21} fill="currentColor" aria-hidden="true" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-[10px] font-bold opacity-0 transition group-hover:opacity-100">WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
