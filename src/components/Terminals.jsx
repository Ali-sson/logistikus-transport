
import { useState } from "react";
import {
  Phone,
  MapPin,
  ArrowUpRight,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

const terminals = [
  {
    name: "Kaduna Terminal",
    address:
      "Shop 7, Third Floor, El-Gibbor Plaza, opposite Barnawa Market, Aliyu Makama, Barnawa, Kaduna.",
    phone: "0816 725 1663",
    tel: "+2348167251663",
    email: "kad@logistikustravels.com",
  },
  {
    name: "Abuja Terminal",
    address: "Boot 40, Mabushi Bus Terminal, FCT Abuja.",
    phone: "0816 128 5804",
    tel: "+2348161285804",
    email: "abj@logistikustravels.com",
  },
];

const socials = [
  {
    name: "Instagram",
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

const services = [
  "Interstate Luxury Travel",
  "Airport Pick-up & Drop-off",
  "Hourly Car Hire",
  "Full Day Car Hire",
  "Train Station Transfers",
  "Private & Corporate transportation",
];

const Terminals = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent("New Service Request - Logistikus");

    const body = encodeURIComponent(`
Name: ${name}
Email: ${email}

Requested Services:
${selectedServices.join(", ")}

Message:
${message}
    `);

    // Change this to your preferred enquiries email if necessary.
    window.location.href =
      `mailto:info@logistikustravels.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="bg-[#F8FAFC] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-[#EAF4FF] text-[#0A3D78] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <MapPin size={14} />
            Get In Touch
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#05708C] tracking-tight">
            Let's Talk About Your Journey
          </h2>

          <p className="text-slate-500 mt-4 text-sm md:text-base leading-relaxed">
            From interstate luxury travel and airport transfers to private, corporate and car hire services, Logistikus provides reliable transportation solutions tailored to your needs. Explore our services or send us a request today.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* LEFT: Terminals and Socials */}
          <div className="lg:col-span-2 space-y-6">

            <div className="mb-5">
              <h3 className="text-2xl font-bold text-[#05708C]">
                Our Terminals
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Visit us or speak directly with our terminal teams.
              </p>
            </div>

            {terminals.map((terminal) => (
              <div
                key={terminal.name}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#4FC3F7] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-xl font-bold text-[#05708C]">
                    {terminal.name}
                  </h4>

                  <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] flex items-center justify-center">
                    <MapPin size={20} className="text-[#1E88E5]" />
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-5">
                  <MapPin
                    size={18}
                    className="text-[#1E88E5] mt-1 shrink-0"
                  />

                  <p className="text-slate-600 text-sm leading-6">
                    {terminal.address}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4">

                  <a
                    href={`tel:${terminal.tel}`}
                    className="flex items-center gap-3 text-[#0A3D78] font-bold hover:text-[#1E88E5] transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#EAF4FF] flex items-center justify-center">
                      <Phone size={17} className="text-[#1E88E5]" />
                    </span>
                    <span className="text-sm">{terminal.phone}</span>
                  </a>

                  <a
                    href={`mailto:${terminal.email}`}
                    className="flex items-center gap-3 text-slate-500 text-sm hover:text-[#1E88E5] transition-colors"
                  >
                    <Mail size={17} className="text-[#1E88E5]" />
                    {terminal.email}
                  </a>

                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="bg-[#05708C] rounded-2xl p-6">
              <h4 className="text-white font-bold text-lg mb-4">
                Connect With Us
              </h4>

              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-blue-100 hover:text-white transition-colors group"
                  >
                    <div>
                      <p className="text-xs text-blue-200">
                        {social.name}
                      </p>
                      <p className="text-sm font-medium">
                        {social.handle}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Request Form */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">

            <div className="mb-8">
              <span className="text-[#05708C] text-xs font-bold uppercase tracking-widest">
                Service Enquiry
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-[#0A3D78] mt-2">
                Send Us a Request
              </h3>

              <p className="text-slate-500 text-sm mt-3 leading-6">
                Tell us what you need. Select one or more services
                and our team will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

              </div>

              {/* Services Selection */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700">
                    What service are you interested in?
                  </label>

                  <p className="text-xs text-slate-400 mt-1">
                    You can select multiple services.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {services.map((service) => {
                    const checked = selectedServices.includes(service);

                    return (
                      <label
                        key={service}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          checked
                            ? "border-[#1E88E5] bg-[#EAF4FF]"
                            : "border-slate-200 hover:border-[#4FC3F7]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(service)}
                          className="w-4 h-4 accent-[#0A3D78]"
                        />

                        <span className={`text-sm font-medium ${
                          checked ? "text-[#0A3D78]" : "text-slate-600"
                        }`}>
                          {service}
                        </span>

                        {checked && (
                          <CheckCircle2
                            size={16}
                            className="ml-auto text-[#1E88E5]"
                          />
                        )}
                      </label>
                    );
                  })}

                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us more about what you need..."
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none resize-none focus:border-[#1E88E5] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={selectedServices.length === 0}
                className="w-full flex items-center justify-center gap-3 bg-[#05708C] hover:bg-[#025165]  text-white font-bold py-4 rounded-xl transition-all duration-300"
              >
                Send Service Request
                <Send size={18} />
              </button>

              <p className="text-center text-xs text-slate-400">
                Thank you for choosing Logistikus Transport Services.
              </p>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Terminals;
