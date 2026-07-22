import type { FormEvent } from 'react';
import { Globe, Mail, Phone, Send } from 'lucide-react';

const contactLinks = [
  { icon: Mail, label: 'Email Us', value: 'info@aquireandmanage.com', href: 'mailto:info@aquireandmanage.com' },
  { icon: Globe, label: 'Website', value: 'www.aquireandmanage.com', href: 'https://www.aquireandmanage.com' },
  { icon: Phone, label: 'Call Us', value: '+91 022-45648350', href: 'tel:+91-22-45648350' },
];

export default function GetInTouch() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nPhone: ${form.get('phone')}\n\nMessage:\n${form.get('message')}`,
    );
    window.location.href = `mailto:info@aquireandmanage.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-crimson">Get In Touch</p>
            <h2 className="mb-5 font-serif text-4xl font-bold text-navy md:text-5xl">Let&apos;s Start a Conversation</h2>
            <p className="mb-11 max-w-xl text-lg leading-relaxed text-slate-600">
              Ready to transform your business? Reach out to us today.
            </p>

            <div className="space-y-6">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="group flex items-center gap-4 text-slate-600 transition-colors hover:text-navy">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crimson/10 text-crimson transition-colors group-hover:bg-crimson group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
                    <span className="text-base font-medium">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3" aria-label="Contact form">
            <label className="sr-only" htmlFor="contact-name">Your Name</label>
            <input id="contact-name" name="name" type="text" required placeholder="Your Name" className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-navy focus:outline-none" />
            <label className="sr-only" htmlFor="contact-email">Email Address</label>
            <input id="contact-email" name="email" type="email" required placeholder="Email Address" className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-navy focus:outline-none" />
            <label className="sr-only" htmlFor="contact-phone">Phone Number</label>
            <input id="contact-phone" name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-navy focus:outline-none" />
            <label className="sr-only" htmlFor="contact-message">Your Message</label>
            <textarea id="contact-message" name="message" required rows={5} placeholder="Your Message" className="w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-navy focus:outline-none" />
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
              <Send size={15} aria-hidden="true" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
