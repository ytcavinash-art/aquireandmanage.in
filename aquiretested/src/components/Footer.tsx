import { Facebook, Globe2, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { scrollToFooter } from '../lib/scrollToFooter';
import FloatingActions from './FloatingActions';

const services = [
  { label: 'Tenant Management', href: '/tenant-management.html' },
  { label: 'Liaisoning', href: '/liaisoning.html' },
  { label: 'IEC Activities', href: '/iec-activities.html' },
  { label: 'Facility Management', href: '/facility-management.html' },
];

const companyLinks = [
  { label: 'About Us', href: '/about.html' },
  { label: 'Our Vision', href: '/vision.html' },
  { label: 'Core Values', href: '/core-values.html' },
  { label: 'Blog', href: '/blog.html' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Careers', href: '/careers.html' },
  { label: 'Contact Us', href: '/#footer' },
];

const ringOnDark = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-sm';

export default function Footer() {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToFooter();
  };

  return (
    <>
    <footer id="footer" className="bg-[#0e172a] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.35fr] lg:gap-12">
          <div>
            <a href="/#home" className={`inline-block ${ringOnDark}`} aria-label="A&M Advisory home">
              <img src="/a&mwhitelogo.png" alt="A&M Advisory" loading="lazy" decoding="async" width="112" height="64" className="h-auto w-28" />
            </a>
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-slate-300">
              Strategic consulting and business management firm helping organizations improve performance and accelerate sustainable growth.
            </p>
            <div className="mt-5 flex gap-2.5" aria-label="Social media links">
              {[
                { label: 'LinkedIn', Icon: Linkedin },
                { label: 'Twitter', Icon: Twitter },
                { label: 'Facebook', Icon: Facebook },
                { label: 'Instagram', Icon: Instagram },
              ].map(({ label, Icon }) => (
                <a key={label} href="#footer" aria-label={label} className={`grid h-7 w-7 place-items-center rounded-full bg-slate-700/70 text-slate-300 transition-colors hover:bg-[#eb1f54] hover:text-white ${ringOnDark}`}>
                  <Icon size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="border-b-2 border-[#eb1f54] pb-2 text-xs font-bold">Our Services</h2>
            <ul className="mt-4 space-y-2.5 text-[11px] text-slate-200">
              {services.map((service) => <li key={service.label}><a href={service.href} className={`transition-colors hover:text-[#eb1f54] ${ringOnDark}`}><span className="mr-2 text-[#eb1f54]">›</span>{service.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h2 className="border-b-2 border-[#eb1f54] pb-2 text-xs font-bold">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[11px] text-slate-200">
              {companyLinks.map((link) => <li key={link.label}><a href={link.href} onClick={link.label === 'Contact Us' ? handleContactClick : undefined} className={`transition-colors hover:text-[#eb1f54] ${ringOnDark}`}><span className="mr-2 text-[#eb1f54]">›</span>{link.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h2 className="border-b-2 border-[#eb1f54] pb-2 text-xs font-bold">Get In Touch</h2>
            <address className="mt-4 space-y-3.5 not-italic text-[11px] text-slate-200">
              <a href="tel:+91-22-45648350" className={`flex items-center gap-2.5 hover:text-[#eb1f54] ${ringOnDark}`}><Phone size={13} className="text-[#eb1f54]" aria-hidden="true" />+91 022-45648350</a>
              <a href="mailto:info@aquireandmanage.com" className={`flex items-center gap-2.5 hover:text-[#eb1f54] ${ringOnDark}`}><Mail size={13} className="text-[#eb1f54]" aria-hidden="true" />info@aquireandmanage.com</a>
              <a href="https://www.aquireandmanage.com" className={`flex items-center gap-2.5 hover:text-[#eb1f54] ${ringOnDark}`}><Globe2 size={13} className="text-[#eb1f54]" aria-hidden="true" />www.aquireandmanage.com</a>
            </address>
          </div>
        </div>

        <div className="mt-9 border-t border-slate-700/70 pt-5 text-[9px] text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Advisory Excellence, Building the Future Together. All Rights Reserved.</p>
          <p className="mt-3 sm:mt-0">Designed with Avinash</p>
        </div>
      </div>
    </footer>
    <FloatingActions />
    </>
  );
}
