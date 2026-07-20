import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Tenant Management',
    description: 'Community coordination, surveys, documentation, tenant readiness and relocation support.',
    href: '/tenant-management.html',
    image: '/images/tenant-management-service-card.png',
  },
  {
    title: 'Liaisoning',
    description: 'Government coordination, statutory approvals and SRA regulatory compliance.',
    href: '/liaisoning.html',
    image: '/images/liaisoning-service-card.png',
  },
  {
    title: 'IEC Activities',
    description: 'Clear communication, community engagement and awareness throughout redevelopment.',
    href: '/iec-activities.html',
    image: '/images/iec-activities.png',
  },
  {
    title: 'Facility Management',
    description: 'Coordinated operations, upkeep, vendor management and safety oversight.',
    href: '/facility-management.html',
    image: '/images/facility-management.png',
  },
];

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);

  const moveCards = (direction: 'previous' | 'next') => {
    cardsRef.current?.scrollBy({
      left: direction === 'next' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-crimson">What We Offer</p>
          <h1 className="text-4xl font-extrabold text-navy md:text-5xl">Our Services</h1>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <h2 className="text-2xl font-medium text-navy md:text-3xl">Discover more</h2>
          <div className="flex gap-2">
            <button type="button" onClick={() => moveCards('previous')} aria-label="Previous services" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => moveCards('next')} aria-label="Next services" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={cardsRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {services.map((service) => (
            <a key={service.title} href={service.href} className="group relative h-[376px] min-w-[252px] snap-start overflow-hidden rounded-sm bg-navy shadow-sm sm:min-w-[280px] lg:min-w-[calc((100%-3rem)/4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy">
              <img src={service.image} alt={`${service.title} services`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-bold leading-tight">{service.title}</h3>
                <p className="mt-2 text-sm font-medium leading-snug text-white">{service.description}</p>
                <span className="mt-4 grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-crimson" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
