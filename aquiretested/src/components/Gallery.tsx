export default function Gallery() {
  return (
    <section
      id="gallery"
      className="min-h-[60vh] bg-slate-50 py-16 md:py-24"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-crimson">
            Project Media
          </p>
          <h1 id="gallery-heading" className="text-4xl font-bold text-navy md:text-5xl">
            A&amp;M Projects Gallery
          </h1>
        </div>
      </div>
    </section>
  );
}
