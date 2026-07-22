import { Shield, TrendingUp, Users } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Transparency', text: 'We communicate clearly, work openly, and create confidence at every stage of a project.' },
  { icon: Users, title: 'Accountability', text: 'We take ownership of our responsibilities and remain committed to every stakeholder.' },
  { icon: TrendingUp, title: 'Efficiency', text: 'We use disciplined processes and practical execution to keep projects moving forward.' },
];

export default function CoreValues() {
  return <section id="core-values" className="py-24 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3 text-center">What Guides Us</p><h1 className="text-4xl md:text-5xl text-navy mb-12 text-center">Our Core Values</h1><div className="grid md:grid-cols-3 gap-7">{values.map(({ icon: Icon, title, text }) => <article key={title} className="bg-white p-8 rounded-lg shadow-sm text-center"><div className="w-12 h-12 mx-auto mb-5 rounded-full bg-crimson/10 flex items-center justify-center"><Icon className="text-crimson" /></div><h2 className="text-2xl text-navy mb-3">{title}</h2><p className="text-gray-500 leading-relaxed">{text}</p></article>)}</div></div></section>;
}
