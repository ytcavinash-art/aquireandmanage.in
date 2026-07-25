import { useState } from 'react';
import { Camera, PlayCircle, Construction, Images, MoveHorizontal } from 'lucide-react';

type Filter = 'All' | 'Before / After' | 'Videos' | 'Drone Photos' | 'Construction Progress';

const filters: Array<{ label: Filter; Icon: typeof Images }> = [
  { label: 'All', Icon: Images },
  { label: 'Before / After', Icon: MoveHorizontal },
  { label: 'Videos', Icon: PlayCircle },
  { label: 'Drone Photos', Icon: Camera },
  { label: 'Construction Progress', Icon: Construction },
];

const mediaItems = [
  {
    id: 'anj-group',
    type: 'Drone Photos' as Filter,
    src: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1400',
    title: 'ANJ Group of Companies',
    caption: 'Urban redevelopment perspective',
  },
  {
    id: 'avenue-landmark-realty',
    type: 'Construction Progress' as Filter,
    src: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1400',
    title: 'Avenue Landmark Realty',
    caption: 'Residential development progress',
  },
  {
    id: 'navbharat-mega-developers',
    type: 'Construction Progress' as Filter,
    src: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1400',
    title: 'Navbharat Mega Developers',
    caption: 'Project execution perspective',
  },
  {
    id: 'tata-projects',
    type: 'Drone Photos' as Filter,
    src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400',
    title: 'Tata Projects',
    caption: 'Urban development overview',
  },
  {
    id: 'l-and-t-realty',
    type: 'Construction Progress' as Filter,
    src: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1400',
    title: 'L&T Realty',
    caption: 'High-rise development perspective',
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [comparison, setComparison] = useState(50);
  const showComparison = activeFilter === 'All' || activeFilter === 'Before / After';
  const showVideos = activeFilter === 'All' || activeFilter === 'Videos';
  const filteredMedia = activeFilter === 'All'
    ? mediaItems
    : mediaItems.filter((item) => item.type === activeFilter);

  return (
    <section id="gallery" className="bg-slate-50 py-16 md:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">Project Media</p>
          <h1 id="gallery-heading" className="text-4xl font-bold text-navy md:text-5xl">A&amp;M Projects Gallery</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Explore transformation visuals, project videos, aerial perspectives and construction progress.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Filter gallery media">
          {filters.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(label)}
              aria-pressed={activeFilter === label}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${
                activeFilter === label
                  ? 'border-navy bg-navy text-white shadow-md'
                  : 'border-slate-300 bg-white text-slate-600 hover:border-navy hover:text-navy'
              }`}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {showComparison && (
          <article className="mb-8 overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.55fr_0.75fr]">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                <img
                  src="https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Representative view before redevelopment"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${comparison}%` }}>
                  <img
                    src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    alt="Representative redevelopment vision"
                    className="h-full max-w-none object-cover"
                    style={{ width: 'calc((100vw - 3rem) * 0.68)', minWidth: '700px' }}
                  />
                </div>
                <div className="absolute inset-y-0 w-0.5 bg-white shadow-xl" style={{ left: `${comparison}%` }} aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-xl">
                    <MoveHorizontal size={20} />
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 bg-navy/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Vision</span>
                <span className="absolute bottom-4 right-4 bg-crimson/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Before</span>
                <label htmlFor="gallery-comparison" className="sr-only">Adjust before and after comparison</label>
                <input
                  id="gallery-comparison"
                  type="range"
                  min="10"
                  max="90"
                  value={comparison}
                  onChange={(event) => setComparison(Number(event.target.value))}
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-crimson">Interactive Comparison</p>
                <h2 className="mt-3 text-3xl font-bold text-navy">Before &amp; Vision</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Drag across the image to explore how thoughtful redevelopment can transform the urban environment.
                </p>
                <p className="mt-5 text-xs text-slate-400">Drag the divider to compare</p>
              </div>
            </div>
          </article>
        )}

        {showVideos && (
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {[
              { src: '/hero-video.mp4', title: 'Redevelopment Overview' },
              { src: '/footer-hero-video.mp4', title: 'Building the Future Together' },
            ].map((video) => (
              <article key={video.src} className="group overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-video overflow-hidden bg-navy">
                  <video src={video.src} controls muted playsInline preload="metadata" className="h-full w-full object-cover" aria-label={video.title} />
                  <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    <PlayCircle size={14} aria-hidden="true" /> Video
                  </span>
                </div>
                <h2 className="p-5 text-lg font-bold text-navy">{video.title}</h2>
              </article>
            ))}
          </div>
        )}

        {filteredMedia.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <figure id={item.id} key={item.id} className="group relative aspect-[4/3] scroll-mt-24 overflow-hidden bg-navy shadow-sm">
                <img src={item.src} alt={item.caption} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/10 to-transparent transition group-hover:via-navy/25" aria-hidden="true" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy backdrop-blur">
                  {item.type}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-white transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-lg font-bold">{item.title}</p>
                  <p className="mt-1 text-xs text-white/70">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-7 text-center text-[11px] leading-5 text-slate-500">
          Selected visuals are representative until project-specific before/after, drone and progress media receives publication approval.
        </p>
      </div>
    </section>
  );
}
