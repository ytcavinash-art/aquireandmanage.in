import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ServiceSolutionsSliderProps = {
  serviceName: string;
  services: Array<string | { title: string; image?: string }>;
};

export default function ServiceSolutionsSlider({ services }: ServiceSolutionsSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const moveSlider = (direction: 'previous' | 'next') => {
    sliderRef.current?.scrollBy({
      left: direction === 'next' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between gap-6">
          <h2 className="text-4xl font-bold text-navy">Services and Solutions</h2>
          <div className="flex gap-3">
            <button type="button" onClick={() => moveSlider('previous')} aria-label="Previous services" className="grid h-11 w-11 place-items-center rounded-md bg-slate-100 text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => moveSlider('next')} aria-label="Next services" className="grid h-11 w-11 place-items-center rounded-md bg-navy text-white transition-colors hover:bg-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div ref={sliderRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 [scrollbar-width:thin]">
          {services.map((service) => {
            const title = typeof service === 'string' ? service : service.title;
            const image = typeof service === 'string' ? undefined : service.image;

            return (
              <article key={title} className="relative flex min-h-72 min-w-[280px] snap-start flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-navy via-slate-800 to-black p-7 shadow-lg sm:min-w-[320px]">
                {image && (
                  <>
                    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" aria-hidden="true" />
                  </>
                )}
                <div className="relative z-10 flex min-h-[13rem] flex-col justify-end">
                  <h3 className="mt-auto text-left text-2xl font-semibold leading-snug text-white">{title}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
