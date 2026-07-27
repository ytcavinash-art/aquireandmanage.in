import { useState, type FormEvent } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

const CONTACT_API = 'https://aquiretested-2.onrender.com/api/contact';
const phoneDisplay = '+91 022-45648350';
const phoneHref = 'tel:+912245648350';
const whatsappHref = 'https://wa.me/912245648350?text=Hello%20A%26M%20Advisory%2C%20I%20would%20like%20to%20discuss%20a%20redevelopment%20project.';
const configuredCalendlyUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
const meetingHref = configuredCalendlyUrl
  || 'mailto:info@aquireandmanage.com?subject=Consultation%20Meeting%20Request';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('sending');
    const form = new FormData(formElement);
    const payload = {
      fullName: form.get('fullName'),
      mobileNumber: form.get('mobileNumber'),
      emailAddress: form.get('emailAddress'),
      message: form.get('message'),
    };

    try {
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Unable to submit enquiry.');
      formElement.reset();
      setStatus('success');
    } catch (error) {
      console.error('Quick enquiry submission failed:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 bg-white py-16 md:py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-11 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">Contact A&amp;M Advisory</p>
          <h2 id="contact-heading" className="text-4xl font-bold text-navy md:text-5xl">Let&apos;s Move Your Project Forward</h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-600">
            Connect with our Mumbai slum rehabilitation advisory team by call, WhatsApp, scheduled consultation or quick enquiry.
          </p>
        </div>

        <div className="grid overflow-hidden border border-slate-200 shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-navy p-6 text-white md:p-9">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="group border border-white/15 bg-white/[0.06] p-5 transition hover:border-[#25D366] hover:bg-[#25D366]">
                <MessageCircle size={23} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white/80">WhatsApp</p>
                <p className="mt-1 text-sm font-bold">Chat with our team</p>
              </a>
              <a href={phoneHref} className="group border border-white/15 bg-white/[0.06] p-5 transition hover:border-crimson hover:bg-crimson">
                <Phone size={23} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white/80">Call Now</p>
                <p className="mt-1 text-sm font-bold">{phoneDisplay}</p>
              </a>
              <a href={meetingHref} target={configuredCalendlyUrl ? '_blank' : undefined} rel={configuredCalendlyUrl ? 'noreferrer' : undefined} className="group border border-white/15 bg-white/[0.06] p-5 transition hover:border-blue-400 hover:bg-blue-600">
                <CalendarDays size={23} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-white/80">Schedule</p>
                <p className="mt-1 text-sm font-bold">{configuredCalendlyUrl ? 'Book on Calendly' : 'Request a meeting'}</p>
              </a>
              <a href="mailto:info@aquireandmanage.com" className="group border border-white/15 bg-white/[0.06] p-5 transition hover:border-white hover:bg-white hover:text-navy">
                <Mail size={23} aria-hidden="true" />
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/60 group-hover:text-navy/60">Email</p>
                <p className="mt-1 break-all text-sm font-bold">info@aquireandmanage.com</p>
              </a>
            </div>

            <div className="mt-6 overflow-hidden border border-white/15">
              <iframe
                title="A&M Advisory service area on Google Maps"
                src="https://www.google.com/maps?q=A%26M%20Advisory%20Mumbai&output=embed"
                width="100%"
                height="250"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block grayscale-[25%]"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#ff6985]" aria-hidden="true" />Mumbai, Maharashtra</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={14} className="text-[#ff6985]" aria-hidden="true" />Business hours consultation</span>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-crimson">Quick Enquiry</p>
            <h3 className="mt-2 text-3xl font-bold text-navy">Tell us about your project</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">Share a few details and our advisory team will connect with you.</p>

            {status === 'success' ? (
              <div className="mt-8 border border-emerald-200 bg-emerald-50 p-7 text-center" role="status">
                <CheckCircle2 size={34} className="mx-auto text-emerald-600" aria-hidden="true" />
                <h4 className="mt-3 text-xl font-bold text-navy">Enquiry received</h4>
                <p className="mt-2 text-sm text-slate-600">Thank you. Our team will review your message and get in touch.</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-5 text-sm font-bold text-crimson underline underline-offset-4">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="mt-7 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="quick-name" className="mb-2 block text-xs font-bold text-navy">Full Name</label>
                  <input id="quick-name" name="fullName" required className="h-12 w-full border border-slate-300 bg-slate-50 px-4 text-sm text-navy focus:border-navy focus:bg-white" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="quick-phone" className="mb-2 block text-xs font-bold text-navy">Mobile Number</label>
                  <input
                    id="quick-phone"
                    name="mobileNumber"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    onInput={(event) => {
                      event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
                    }}
                    className="h-12 w-full border border-slate-300 bg-slate-50 px-4 text-sm text-navy focus:border-navy focus:bg-white"
                    placeholder="+91"
                    aria-describedby="quick-phone-hint"
                  />
                  <span id="quick-phone-hint" className="sr-only">Enter a 10-digit mobile number using numbers only.</span>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="quick-email" className="mb-2 block text-xs font-bold text-navy">Email Address</label>
                  <input id="quick-email" name="emailAddress" type="email" required className="h-12 w-full border border-slate-300 bg-slate-50 px-4 text-sm text-navy focus:border-navy focus:bg-white" placeholder="you@company.com" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="quick-message" className="mb-2 block text-xs font-bold text-navy">Project Requirement</label>
                  <textarea id="quick-message" name="message" required rows={5} className="w-full resize-y border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-navy focus:border-navy focus:bg-white" placeholder="Location, project type and support required..." />
                </div>
                {status === 'error' && <p className="sm:col-span-2 text-sm font-semibold text-red-600" role="alert">Submission failed. Please call or email us directly.</p>}
                <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 items-center justify-center gap-2 bg-crimson px-6 text-sm font-bold text-white transition hover:bg-navy disabled:cursor-wait disabled:opacity-60 sm:col-span-2">
                  <Send size={16} aria-hidden="true" />
                  {status === 'sending' ? 'Sending Enquiry…' : 'Send Quick Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
