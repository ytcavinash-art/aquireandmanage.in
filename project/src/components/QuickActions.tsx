import { Calendar, Phone } from 'lucide-react';

type QuickActionsProps = {
  onRequestCallback: () => void;
  calendlyUrl: string;
};

export default function QuickActions({
  onRequestCallback,
  calendlyUrl,
}: QuickActionsProps) {
  function handleMeeting() {
    window.location.href = calendlyUrl;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => {
          console.log('Callback clicked');
          alert('Callback clicked');
          onRequestCallback();
        }}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-semibold text-slate-700 transition hover:border-crimson hover:bg-slate-50 hover:text-crimson"
      >
        <Phone size={16} aria-hidden="true" />
        Request a Callback
      </button>

      <button
        type="button"
        onClick={handleMeeting}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-xs font-semibold text-slate-700 transition hover:border-crimson hover:bg-slate-50 hover:text-crimson"
      >
        <Calendar size={16} aria-hidden="true" />
        Book a Meeting
      </button>
    </div>
  );
}
