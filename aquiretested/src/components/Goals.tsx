const goals = [
  {
    number: '01',
    title: 'Operational Excellence',
    description:
      'Ensure seamless execution of SRA projects through structured processes, accurate documentation, and strict adherence to timelines, delivering efficiency and consistency at every stage.',
  },
  {
    number: '02',
    title: 'Regulatory Compliance and Coordination',
    description:
      'Maintain strong liaisoning with authorities to secure timely approvals, ensure full compliance with SRA regulations, and enable smooth coordination between all stakeholders.',
  },
  {
    number: '03',
    title: 'Sustainable Urban Impact',
    description:
      'Contribute to organized urban redevelopment by delivering high-quality rehabilitation solutions, improving community living standards, and creating long-term value for clients and society.',
  },
];

export default function Goals() {
  return (
    <section id="goals" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative image */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full overflow-hidden opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-start gap-16 flex-col lg:flex-row">
          {/* Left text */}
          <div className="lg:w-1/3">
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">What We Aim For</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-6 leading-tight">Our Goals</h2>
            <p className="text-gray-500 leading-relaxed">
              We aim to ensure timely project delivery, uphold the highest standards of compliance and transparency,
              strengthen stakeholder collaboration, and create sustainable, high-value outcomes that contribute to
              organized urban development and long-term client success.
            </p>
          </div>

          {/* Goals cards */}
          <div className="lg:w-2/3 grid sm:grid-cols-3 gap-6 w-full">
            {goals.map((g) => (
              <div
                key={g.number}
                className="relative bg-white rounded-lg border-2 border-crimson/30 hover:border-crimson transition-all duration-300 p-6 pt-14 shadow-sm hover:shadow-lg group"
              >
                {/* Number badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-navy rounded-lg flex items-center justify-center shadow-md group-hover:bg-crimson transition-colors duration-300">
                  <span className="text-white font-extrabold text-lg leading-none">{g.number}</span>
                </div>

                <h3 className="text-navy font-bold text-base mb-3 text-center">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed text-center">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
