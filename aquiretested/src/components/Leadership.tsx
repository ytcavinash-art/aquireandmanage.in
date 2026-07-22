import manojPhoto from '../assets/manoj-harlikar.jpg';
import srinivasanPhoto from '../assets/srinivasan-mohan.jpg';
import mayilvananPhoto from '../assets/mayilvanan-pandi.jpg';

const leaders = [
  {
    name: 'Dr. Manoj Harlikar',
    title: 'CEO',
    bio: 'Postgraduate veterinary professional with a PGDBM and over 26 years of diversified industry experience across pharmaceuticals, insurance, banking, real estate and large-scale ground operations.',
    photo: manojPhoto,
    profile: '/leadership-manoj-harlikar.html',
  },
  {
    name: 'Srinivasan Mohan',
    title: 'COO',
    bio: 'A seasoned professional with nearly 30 years of experience across Banking, Financial Services, Real Estate, and SRA Redevelopment Projects.',
    photo: srinivasanPhoto,
    profile: '/leadership-srinivasan-mohan.html',
  },
  {
    name: 'Mayilvanan Pandi',
    title: 'HOD-Annexure',
    bio: 'Professional with over 29 years of diverse industry experience across spanning Banking, Aviation (Airlines), and Real Estate sectors.',
    photo: mayilvananPhoto,
    profile: '/leadership-mayilvanan-pandi.html',
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3 text-center">
          The People Behind A and M
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-4 text-center">Our Leadership Team</h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-16">
          Decades of combined experience across real estate, finance, banking, and urban redevelopment.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((l) => (
            <a
              key={l.name}
              href={l.profile}
              aria-label={`View ${l.name}'s profile`}
              className="group bg-white rounded-lg border-2 border-transparent hover:border-crimson transition-all duration-300 shadow-md hover:shadow-xl overflow-visible relative pt-16"
            >
              {/* Avatar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-crimson transition-transform group-hover:scale-105">
                <img src={l.photo} alt={l.name} className="w-full h-full object-cover" />
              </div>

              <div className="px-8 pb-8 text-center">
                <h3 className="text-xl font-bold text-navy">{l.name}</h3>
                <p className="text-crimson font-medium text-lg mt-1 mb-4">{l.title}</p>
                <div className="w-10 h-0.5 bg-crimson/30 mx-auto mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">{l.bio}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
