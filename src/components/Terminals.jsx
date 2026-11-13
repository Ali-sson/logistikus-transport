
import { Phone, MapPin, ArrowUpRight } from "lucide-react";

const terminals = [
  {
    name: "Kaduna Terminal",
    address:
      "Shop 7, Third Floor, El-Gibbor Plaza, opposite Barnawa Market, Aliyu Makama, Barnawa, Kaduna.",
    phone: "0816 725 1663",
    tel: "+2348167251663",
    email: "kad@logistikustravels.com"
  },
  {
    name: "Abuja Terminal",
    address:
      "Boot 40, Mabushi Bus Terminal, FCT Abuja.",
    phone: "0816 128 5804",
    tel: "+2348161285804",
    email: "abj@logistikustravels.com"
  },
];

const socials = [
  {
    name: "X / Instagram",
    handle: "@logistikusLtd",
    href: "https://www.instagram.com/logistikusLtd/",
  },
  {
    name: "TikTok",
    handle: "@logistikuslogisticsltd",
    href: "https://www.tiktok.com/@logistikuslogisticsltd",
  },
  {
    name: "Facebook",
    handle: "Logistikus Logistics",
    href: "https://www.facebook.com/",
  },
];

const Terminals = () => {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24 ">
      <div  id="contact" className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Heading */}
        <div className="mb-10 md:mb-12 text-center md:text-center">
          <span className="inline-flex items-center gap-2
            bg-[#EAF4FF] text-[#0A3D78]
            text-xs font-bold uppercase tracking-widest
            px-4 py-2 rounded-full mb-5">
            <MapPin size={14} />
            Our Locations
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl
            font-bold text-[#0A3D78] tracking-tight
            leading-tight">
            Contact Us <br className="hidden sm:block" />
          </h2>

          <p className="text-slate-500 mt-4 max-w-xl
            text-sm md:text-base leading-relaxed text-center mx-auto">
            We're always within reach. Visit our terminals
            or contact our team for bookings and enquiries.
          </p>
        </div>

        {/* Terminal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {terminals.map((terminal) => (
            <div
              key={terminal.name}
              className="group bg-white border
                border-slate-200 rounded-2xl
                p-6 md:p-8
                hover:border-[#4FC3F7]
                hover:shadow-xl hover:shadow-blue-900/5
                transition-all duration-300"
            >
              {/* Terminal Name */}
              <div className="flex items-center
                justify-between mb-5">

                <h3 className="text-xl md:text-2xl
                  font-bold text-[#0A3D78]">
                  {terminal.name}
                </h3>

                <div className="w-11 h-11 rounded-xl
                  bg-[#EAF4FF] flex items-center
                  justify-center group-hover:bg-[#0A3D78]
                  transition-colors duration-300">

                  <MapPin
                    size={21}
                    className="text-[#1E88E5]
                    group-hover:text-white"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start
                gap-3 mb-7">

                <MapPin
                  size={19}
                  className="text-[#1E88E5]
                  mt-1 shrink-0"
                />

                <p className="text-slate-600
                  text-sm md:text-base leading-7">
                  {terminal.address}
                </p>
              </div>

              {/* Phone */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold
                  uppercase tracking-wider
                  text-slate-400 mb-3">
                  Call this terminal
                </p>

                <a
                  href={`tel:${terminal.tel}`}
                  className="inline-flex items-center
                    gap-3 text-[#0A3D78]
                    font-bold text-lg
                    hover:text-[#1E88E5]
                    transition-colors"
                >
                  <span className="w-10 h-10 rounded-full
                    bg-[#EAF4FF] flex items-center
                    justify-center">
                    <Phone
                      size={18}
                      className="text-[#1E88E5]"
                    />
                  </span>

                  {terminal.phone}

                </a>

                <p className="mt-3 text-sm text-slate-500">
                  Email:{" "}
                  <a
                    href={`mailto:${terminal.email}`}
                    className="text-[#0A3D78] hover:text-[#1E88E5] transition-colors"
                  >
                    {terminal.email}
                  </a>
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Social Media */}
        <div className="mt-10 md:mt-12
          border-t border-slate-200 pt-7">

          <p className="text-sm font-semibold
            text-[#0A3D78] mb-5">
            Connect with us
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-5">

            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2
                  text-sm transition-colors"
              >
                <span className="text-slate-500
                  group-hover:text-[#1E88E5]">
                  {social.handle}
                  <span className="text-xs ml-1">
                    ({social.name})
                  </span>
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-[#1E88E5]
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  transition-transform"
                />
              </a>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Terminals;
