import { Eye, Target } from 'lucide-react';

const content = [
  { title: 'Vision', Icon: Eye, text: 'To contribute towards a slum-free Mumbai by enabling inclusive, sustainable, and well-executed slum rehabilitation.' },
  { title: 'Mission', Icon: Target, text: 'To transform complex slum rehabilitation challenges into executable solutions through strategic advisory and disciplined project execution.' },
];

export default function VisionMission() {
  return (
    <section id="vision" className="relative py-0 overflow-hidden" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-navy/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3 text-center">Our Direction</p>
        <h1 className="text-4xl md:text-5xl text-white mb-16 text-center">Vision and Mission</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {content.map(({ title, Icon, text }) => <article key={title} className="relative bg-crimson/90 backdrop-blur rounded-lg p-10 overflow-hidden group hover:bg-crimson transition-colors duration-300">
            <div className="absolute -right-8 top-0 bottom-0 w-16 bg-white/10 skew-x-12 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Icon size={20} className="text-white" /></div><h2 className="text-3xl text-white">{title}</h2></div>
              <div className="w-12 h-0.5 bg-white/40 mb-6" />
              <p className="text-white/90 text-lg leading-relaxed">{text}</p>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
