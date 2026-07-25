import navbharatLogo from "../assets/navbharat-logo.png";
import drpplLogo from "../assets/drppl-logo.png";
import avenueLogo from "../assets/avenue-landmark-realty.png";
import anjGroupLogo from "../assets/ANJ-Group-logo.png";
import tataProjectsLogo from "../assets/tata-projects-logo.webp";
import lAndTRealtyLogo from "../assets/l-and-t-realty-logo.png";

const clients = [
  { name: "Navbharat", logo: navbharatLogo },
  { name: "DRPPL", logo: drpplLogo },
  { name: "Avenue Landmark Realty", logo: avenueLogo },
  { name: "ANJ Group of Companies", logo: anjGroupLogo },
  { name: "Tata Projects", logo: tataProjectsLogo },
  { name: "L&T Realty", logo: lAndTRealtyLogo },
];

const OurClients = () => {
  return (
    <section id="clients" className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-[#10254C] mb-10">
          Our Clients
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Fade edges (optional, dikhne mein smooth lagega) */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <div className="flex w-max animate-scroll">
            {[0, 1, 2, 3].map((set) => (
              <div key={set} className="flex shrink-0 gap-4 pr-4">
                {clients.map((client) => (
                  <div
                    key={`${set}-${client.name}`}
                    className="bg-white rounded-lg shadow-md p-2 h-[45px] w-[140px] flex items-center justify-center hover:shadow-xl transition flex-shrink-0"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      width="140"
                      height="32"
                      className="max-h-8 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurClients;
