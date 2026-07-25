export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-8 leading-tight">About Us</h2>
            <div className="space-y-5 text-justify text-gray-600 leading-relaxed text-[1.0625rem]">
              <p>
                A&M Private Limited specializes in end-to-end advisory and execution support for Slum Rehabilitation
                (SRA) projects across the Mumbai Metropolitan Region (MMR). We play a vital role in managing the entire
                project Lifecycle From initial surveys and documentation to approvals, coordination, and final handover.
              </p>
              <p>
                Our expertise lies in liaisoning with government authorities, ensuring compliance with SRA regulations,
                and facilitating seamless communication between developers, societies, and stakeholders. With a strong
                focus on transparency, efficiency, and accountability, we help transform redevelopment visions into
                successful, legally compliant, and socially impactful outcomes.
              </p>
              <p>
                Driven by Advisory Excellence, we are committed to Building The Future Together by contributing to
                structured urban development and improved living standards.
              </p>
            </div>

          </div>

          {/* Visual */}
          <div className="relative">
            <img
              src="/images/sra-project.png"
              alt="SRA rehabilitation housing project in Mumbai"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
            />
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-crimson rounded-lg -z-10" />
            {/* Stat badge */}
            <div className="absolute -left-6 -bottom-6 bg-navy text-white rounded-lg px-6 py-4 shadow-xl">
              <p className="text-3xl font-extrabold text-crimson">SRA</p>
              <p className="text-xs text-white/70 mt-0.5 whitespace-nowrap">Project Specialists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-24 h-1.5">
        <div className="bg-crimson h-1/2" />
        <div className="bg-navy h-1/2" />
      </div>
    </section>
  );
}
