import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[460px] items-center overflow-hidden md:min-h-[520px]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-navy/75" aria-hidden="true" />

      <div className="relative z-10 w-full px-6 py-20 md:px-10">
        {/* Logo mark — decorative, hidden from assistive tech since Nav has the real logo */}
        <p className="text-white/80 text-sm font-medium mb-8 tracking-widest uppercase">
          Advisory Excellence, Building the Future Together.
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none max-w-5xl">
          Aquire Opportunities.<br />
          Manage Growth.<br />
          <span className="text-white">Build Lasting Success.</span>
        </h1>

        <p className="mt-8 text-white/80 text-xl max-w-2xl leading-relaxed">
          End-to-end advisory and execution support for Slum Rehabilitation (SRA) projects in Mumbai.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/about.html"
            className="px-8 py-3 bg-white text-navy font-semibold rounded-sm hover:bg-slate-100 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Learn More
          </a>
          <a
            href="/services.html"
            className="px-8 py-3 border border-white text-white font-semibold rounded-sm hover:bg-white hover:text-navy transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:rounded-full"
        aria-label="Scroll down to About section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
