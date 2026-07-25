import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { scrollToFooter } from '../lib/scrollToFooter';

const statistics = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 100, suffix: '+', label: 'Projects' },
  { value: 5000, suffix: '+', label: 'Families Assisted' },
  { value: 98, suffix: '%', label: 'Success Rate' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1600;
    const startTime = performance.now();
    let frameId = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));
      if (progress < 1) frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, reduceMotion, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {displayValue.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToContent = () => {
    document.getElementById('hero-statistics')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToFooter();
  };

  return (
    <section id="home" className="relative overflow-hidden bg-navy-dark pt-16 text-white">
      <div className="relative flex min-h-[690px] items-center lg:min-h-[720px]">
        <video
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sra-project.png"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,15,50,0.97)_0%,rgba(10,25,70,0.87)_48%,rgba(10,21,64,0.46)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(255,255,255,0.13),transparent_32%)]" aria-hidden="true" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-40 pt-20 md:px-10 lg:pb-44"
        >
          <div className="max-w-4xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-white/80 sm:text-sm">
              <span className="h-px w-9 bg-crimson-light" aria-hidden="true" />
              Mumbai&apos;s SRA Advisory Partner
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transforming Mumbai Redevelopment Through{' '}
              <span className="text-[#ff496b]">Trusted SRA Advisory</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              From community engagement to regulatory approvals, we bring people,
              process and precision together to move complex redevelopment projects forward.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <motion.a
                href="#footer"
                onClick={handleContact}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-crimson-light px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-white hover:text-navy focus-visible:outline-white"
              >
                Discuss Your Project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="/services.html"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="inline-flex min-h-12 items-center justify-center border border-white/55 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-navy focus-visible:outline-white"
              >
                Explore Our Services
              </motion.a>
            </div>
          </div>
        </motion.div>

        <button
          type="button"
          onClick={scrollToContent}
          className="absolute bottom-32 right-6 z-20 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white md:flex lg:right-10"
          aria-label="Scroll to key statistics"
        >
          Scroll
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30">
            <ChevronDown size={18} className="motion-safe:animate-bounce" aria-hidden="true" />
          </span>
        </button>

        <div id="hero-statistics" className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-2 border-t border-white/20 bg-[#0a1540]/90 shadow-2xl backdrop-blur-md lg:grid-cols-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className={`px-4 py-5 sm:px-7 sm:py-6 ${
                    index % 2 !== 0 ? 'border-l border-white/15' : ''
                  } ${index >= 2 ? 'border-t border-white/15 lg:border-t-0' : ''} ${
                    index > 0 ? 'lg:border-l lg:border-white/15' : ''
                  }`}
                >
                  <p className="font-serif text-3xl font-bold leading-none text-white sm:text-4xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300 sm:text-xs">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
