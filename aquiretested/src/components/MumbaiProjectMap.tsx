import { useState } from 'react';
import { Building2, ExternalLink, MapPin, Navigation, RotateCcw } from 'lucide-react';

type ProjectType = 'SRA Projects' | 'Slum Rehabilitation' | 'MHADA' | 'Redevelopment';

type MapLocation = {
  id: number;
  area: string;
  zone: string;
  type: ProjectType;
  x: number;
  y: number;
  description: string;
};

const types: Array<{ label: ProjectType; color: string; pin: string }> = [
  { label: 'SRA Projects', color: 'bg-[#ed1b45]', pin: '#ed1b45' },
  { label: 'Slum Rehabilitation', color: 'bg-[#8b5cf6]', pin: '#8b5cf6' },
  { label: 'MHADA', color: 'bg-[#f59e0b]', pin: '#f59e0b' },
  { label: 'Redevelopment', color: 'bg-[#2563eb]', pin: '#2563eb' },
];

const locations: MapLocation[] = [
  { id: 1, area: 'South Mumbai', zone: 'Island City', type: 'Redevelopment', x: 48, y: 83, description: 'Urban renewal and stakeholder advisory coverage.' },
  { id: 2, area: 'Worli–Prabhadevi', zone: 'Central Mumbai', type: 'MHADA', x: 51, y: 68, description: 'Housing and redevelopment coordination coverage.' },
  { id: 3, area: 'Sion', zone: 'Central Mumbai', type: 'SRA Projects', x: 62, y: 50, description: 'SRA and community engagement advisory coverage.' },
  { id: 4, area: 'Bandra–Khar', zone: 'Western Suburbs', type: 'SRA Projects', x: 38, y: 47, description: 'Tenant and rehabilitation advisory coverage.' },
  { id: 5, area: 'Kurla–Chembur', zone: 'Eastern Suburbs', type: 'MHADA', x: 68, y: 43, description: 'Documentation and authority coordination coverage.' },
  { id: 6, area: 'Andheri–Jogeshwari', zone: 'Western Suburbs', type: 'Redevelopment', x: 34, y: 29, description: 'Redevelopment planning and liaisoning coverage.' },
  { id: 7, area: 'Ghatkopar–Vikhroli', zone: 'Eastern Suburbs', type: 'SRA Projects', x: 70, y: 27, description: 'SRA execution and stakeholder support coverage.' },
  { id: 8, area: 'Borivali–Kandivali', zone: 'Western Suburbs', type: 'Redevelopment', x: 31, y: 11, description: 'Residential redevelopment advisory coverage.' },
  { id: 9, area: 'Malad–Goregaon', zone: 'Western Suburbs', type: 'Slum Rehabilitation', x: 27, y: 20, description: 'Resident engagement, eligibility documentation and rehabilitation support coverage.' },
  { id: 10, area: 'Govandi–Mankhurd', zone: 'Eastern Suburbs', type: 'Slum Rehabilitation', x: 78, y: 48, description: 'Community coordination, shifting readiness and rehabilitation advisory coverage.' },
  { id: 11, area: 'Dharavi', zone: 'Central Mumbai', type: 'Slum Rehabilitation', x: 53, y: 56, description: 'Large-scale rehabilitation, tenant management and community stakeholder coordination coverage.' },
  { id: 12, area: 'Antop Hill', zone: 'Central Mumbai', type: 'Slum Rehabilitation', x: 67, y: 58, description: 'Slum rehabilitation, resident documentation and on-ground stakeholder coordination coverage.' },
  { id: 13, area: 'Juhu Gali', zone: 'Western Suburbs', type: 'Slum Rehabilitation', x: 27, y: 34, description: 'Resident engagement, rehabilitation documentation and community coordination coverage.' },
];

export default function MumbaiProjectMap() {
  const [activeType, setActiveType] = useState<ProjectType | 'All'>('All');
  const [selectedId, setSelectedId] = useState(3);

  const visibleLocations = activeType === 'All'
    ? locations
    : locations.filter((location) => location.type === activeType);
  const selected = locations.find((location) => location.id === selectedId) ?? locations[0];

  const selectType = (type: ProjectType | 'All') => {
    setActiveType(type);
    const next = type === 'All' ? locations[0] : locations.find((location) => location.type === type);
    if (next) setSelectedId(next.id);
  };

  return (
    <section id="project-map" className="scroll-mt-20 overflow-hidden bg-[#081536] py-16 text-white md:py-24" aria-labelledby="map-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ff496b]">Mumbai Footprint</p>
            <h2 id="map-heading" className="text-4xl font-bold text-white md:text-5xl">
              Redevelopment Across Mumbai
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Explore our service coverage across Mumbai&apos;s key SRA, slum rehabilitation, MHADA and redevelopment corridors.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filter map by project type">
            <button
              type="button"
              onClick={() => selectType('All')}
              aria-pressed={activeType === 'All'}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                activeType === 'All' ? 'border-white bg-white text-navy' : 'border-white/20 text-slate-300 hover:border-white/50'
              }`}
            >
              All Projects
            </button>
            {types.map((type) => (
              <button
                key={type.label}
                type="button"
                onClick={() => selectType(type.label)}
                aria-pressed={activeType === type.label}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  activeType === type.label ? 'border-white bg-white text-navy' : 'border-white/20 text-slate-300 hover:border-white/50'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${type.color}`} aria-hidden="true" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid overflow-hidden border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 lg:grid-cols-[1.55fr_0.75fr]">
          <div className="relative min-h-[560px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.16),transparent_50%)] p-5 sm:p-9">
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden="true" />

            <div className="relative mx-auto h-[500px] max-w-xl" role="img" aria-label="Stylised map of Mumbai with selectable redevelopment coverage markers">
              <svg viewBox="0 0 340 640" className="absolute inset-0 h-full w-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]" aria-hidden="true">
                <defs>
                  <linearGradient id="mumbai-land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#263a65" />
                    <stop offset="100%" stopColor="#12264c" />
                  </linearGradient>
                  <pattern id="map-lines" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M0 14 H28 M14 0 V28" stroke="#fff" strokeOpacity=".055" strokeWidth="1" />
                  </pattern>
                </defs>
                <path d="M115 8 C145 20 157 55 150 91 C144 124 158 144 175 174 C195 209 184 247 200 277 C219 312 254 329 248 374 C242 415 218 437 219 476 C220 516 244 552 221 600 C210 622 186 635 161 628 C137 621 128 596 131 568 C136 526 109 497 101 456 C93 416 112 388 103 348 C94 307 65 281 72 236 C77 202 100 181 102 147 C104 110 82 76 91 39 C95 21 103 12 115 8 Z" fill="url(#mumbai-land)" stroke="#5f7eb9" strokeWidth="2" />
                <path d="M115 8 C145 20 157 55 150 91 C144 124 158 144 175 174 C195 209 184 247 200 277 C219 312 254 329 248 374 C242 415 218 437 219 476 C220 516 244 552 221 600 C210 622 186 635 161 628 C137 621 128 596 131 568 C136 526 109 497 101 456 C93 416 112 388 103 348 C94 307 65 281 72 236 C77 202 100 181 102 147 C104 110 82 76 91 39 C95 21 103 12 115 8 Z" fill="url(#map-lines)" />
                <path d="M111 61 C124 143 119 200 145 266 C166 320 148 391 169 463 C182 509 175 562 166 609" fill="none" stroke="#7f9acb" strokeDasharray="5 7" strokeOpacity=".5" strokeWidth="2" />
                <path d="M93 232 C127 246 164 245 195 281 M105 350 C143 359 196 354 241 377 M106 454 C145 444 181 452 218 475" fill="none" stroke="#7f9acb" strokeDasharray="5 7" strokeOpacity=".4" strokeWidth="2" />
              </svg>

              {visibleLocations.map((location) => {
                const type = types.find((item) => item.label === location.type)!;
                const isSelected = location.id === selectedId;
                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => setSelectedId(location.id)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:rounded-full focus-visible:outline-white"
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                    aria-label={`${location.area}, ${location.type}`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={`absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 motion-safe:animate-ping ${isSelected ? 'block' : 'hidden group-hover:block'}`}
                      style={{ backgroundColor: type.pin }}
                      aria-hidden="true"
                    />
                    <span
                      className={`relative grid place-items-center rounded-full border-2 border-white text-white shadow-lg transition-all ${
                        isSelected ? 'h-11 w-11 scale-110' : 'h-8 w-8 group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: type.pin }}
                    >
                      <MapPin size={isSelected ? 20 : 15} fill="currentColor" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:left-9">
              <Navigation size={13} aria-hidden="true" />
              North Mumbai
              <span className="h-px w-8 bg-slate-500" aria-hidden="true" />
            </div>
          </div>

          <aside className="flex flex-col border-t border-white/10 bg-[#0c1b3d] p-6 sm:p-8 lg:border-l lg:border-t-0" aria-live="polite">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: types.find((type) => type.label === selected.type)?.pin }}
                >
                  <Building2 size={13} aria-hidden="true" />
                  {selected.type}
                </span>
                <button
                  type="button"
                  onClick={() => selectType('All')}
                  className="text-slate-400 transition hover:text-white"
                  aria-label="Reset map filters"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#ff496b]">{selected.zone}</p>
              <h3 className="mt-2 text-3xl font-bold text-white">{selected.area}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{selected.description}</p>
            </div>

            <div className="mt-8 border-y border-white/10 py-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Coverage Includes</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Stakeholder coordination</li>
                <li>Documentation and compliance</li>
                <li>On-ground execution support</li>
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <a
                href="/gallery.html"
                className="group inline-flex w-full items-center justify-center gap-2 bg-[#ed1b45] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-navy"
              >
                Explore Our Projects
                <ExternalLink size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <p className="mt-4 text-center text-[10px] leading-4 text-slate-500">
                Representative coverage map; markers do not disclose confidential project addresses.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
