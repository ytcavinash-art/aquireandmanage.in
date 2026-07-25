import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('Subscribe me to A&M Advisory Insights');
    const body = encodeURIComponent(`Please add ${email} to the A&M Advisory newsletter mailing list.`);
    window.location.href = `mailto:info@aquireandmanage.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className={compact ? 'bg-navy p-6 text-white' : 'bg-navy px-6 py-12 text-white md:px-10'}>
      <div className={compact ? '' : 'mx-auto flex max-w-5xl flex-col justify-between gap-7 md:flex-row md:items-center'}>
        <div className={compact ? '' : 'max-w-xl'}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#ff6985]">
            <Mail size={18} aria-hidden="true" />
          </span>
          <h2 className={`${compact ? 'mt-4 text-2xl' : 'mt-4 text-3xl'} font-bold text-white`}>Redevelopment insights, directly to you.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Receive practical updates on SRA policy, compliance, community engagement and project execution.
          </p>
        </div>
        <form onSubmit={subscribe} className={`${compact ? 'mt-5' : 'w-full md:max-w-md'} flex flex-col gap-2 sm:flex-row`}>
          <label htmlFor={compact ? 'newsletter-email-compact' : 'newsletter-email'} className="sr-only">Email address</label>
          <input
            id={compact ? 'newsletter-email-compact' : 'newsletter-email'}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your work email"
            className="min-h-12 min-w-0 flex-1 border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 focus:border-white"
          />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-crimson px-5 text-sm font-bold text-white transition hover:bg-white hover:text-navy">
            Subscribe <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
