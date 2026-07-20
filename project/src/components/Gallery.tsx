const galleryImages = [
  {
    id: 'anj-group',
    src: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern residential redevelopment towers',
    title: 'ANJ Group of Companies',
  },
  {
    id: 'avenue-landmark-realty',
    src: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Urban residential buildings',
    title: 'Avenue Landmark Realty',
  },
  {
    id: 'navbharat-mega-developers',
    src: 'https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Contemporary building exterior',
    title: 'Navbharat Mega Developers',
  },
  {
    id: 'tata-projects',
    src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern urban development project',
    title: 'Tata Projects',
  },
  {
    id: 'l-and-t-realty',
    src: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'High-rise real estate development',
    title: 'L&T Realty',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-crimson text-sm font-semibold tracking-widest uppercase mb-3">A&amp;M Advisory</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">A&amp;M Projects Gallery</h2>
          <p className="text-gray-500 leading-relaxed">
            A glimpse into the kind of urban redevelopment work we help plan, coordinate, and deliver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <figure id={image.id} key={image.title} className="group relative aspect-[4/3] scroll-mt-24 overflow-hidden rounded-xl bg-navy shadow-sm">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent px-6 pb-5 pt-16 text-white">
                <p className="text-lg font-bold">{image.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
