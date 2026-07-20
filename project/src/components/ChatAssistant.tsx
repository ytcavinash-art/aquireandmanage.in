import { FormEvent, useState } from 'react';
import { Mail, MessageCircle, Send, X } from 'lucide-react';
import { leadCapturePrompt, whatsappCta } from '../chatbotPrompt';
import QuickActions from './QuickActions';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

const initialMessages: ChatMessage[] = [
  { id: 1, role: 'user', text: 'Hi' },
  { id: 2, role: 'assistant', text: 'Hello!\n\nHow can I help you today?' },
];

const apiBaseUrl = (import.meta.env.VITE_API_URL as string | undefined)
  ?.trim()
  .replace(/\/$/, '');

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  function requestContactDetails(action: 'callback' | 'meeting') {
    console.log(action);
    alert('Working');

    const intro =
      action === 'callback'
        ? 'I can help you request a callback.'
        : 'I can help you book a meeting.';

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: 'assistant',
        text: `${intro}\n\n${leadCapturePrompt}`,
      },
    ]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = message.trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage('');
    setIsSending(true);

    try {
      const apiResponse = await fetch(`${apiBaseUrl ?? ''}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!apiResponse.ok) {
        throw new Error('Chat request failed');
      }

      const data = (await apiResponse.json()) as { answer?: string };

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text:
            data.answer?.trim() ||
            'I’m sorry, that information is unavailable. Please contact our team.',
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text:
            'I’m sorry, I’m unable to respond right now. Please contact our team.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-2xl transition hover:bg-navy-light"
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={26} aria-hidden="true" />
      </button>
    );
  }

  return (
    <aside
      className="fixed bottom-4 right-4 z-50 flex h-[min(580px,calc(100vh-2rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      aria-label="AI Assistant chat"
    >
      <header className="flex items-center gap-3 bg-navy px-5 py-4 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <MessageCircle size={21} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-sans text-base font-semibold">AI Assistant</h2>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Close AI Assistant"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5" aria-live="polite">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`flex items-end gap-2 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {item.role === 'assistant' && (
              <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white">
                AI
              </span>
            )}
            <p
              className={`max-w-[78%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                item.role === 'user'
                  ? 'rounded-br-sm bg-crimson text-white'
                  : 'rounded-bl-sm border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {item.text}
            </p>
          </div>
        ))}
        {isSending && (
          <div className="flex items-end gap-2">
            <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white">
              AI
            </span>
            <p className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              Typing…
            </p>
          </div>
        )}
      </div>

      <div className="relative z-50 border-t border-slate-200 bg-white p-4">
        <div className="relative z-50 mb-4 grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <QuickActions
              onRequestCallback={() => requestContactDetails('callback')}
              calendlyUrl="https://calendly.com/your-company"
            />
          </div>
          <a
            href={whatsappCta.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <a
            href="mailto:info@company.com"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-crimson hover:text-crimson"
          >
            <Mail size={16} aria-hidden="true" />
            Email Our Team
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="chat-message" className="sr-only">
            Type a message
          </label>
          <input
            id="chat-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="flex items-center gap-2 rounded-full bg-crimson px-4 py-3 text-sm font-semibold text-white transition hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="hidden sm:inline">Send</span>
            <Send size={17} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">{whatsappCta.heading}</span>
          <a
            href={whatsappCta.href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-emerald-700 hover:underline"
          >
            {whatsappCta.label}
          </a>
        </div>
      </div>
    </aside>
  );
}
