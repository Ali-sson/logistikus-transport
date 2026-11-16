
import {
  Route,
  PlaneTakeoff,
  TrainFront,
  Clock,
  CalendarDays,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const servicesection = [
  {
    icon: Route,
    title: "Interstate Luxury Travel",
    description:
      "Enjoy comfortable and reliable journeys between Kaduna and Abuja with our well-maintained vehicles and professional drivers.",
    link: "/#booking",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport Pick-up & Drop-off",
    description:
      "Enjoy stress-free airport transfers with timely pick-ups and drop-offs designed around your flight schedule.",
    link: "/contact",
  },
  {
    icon: TrainFront,
    title: "Train Station Transfers",
    description:
      "Get to and from train stations conveniently with dependable transportation that keeps your journey smooth.",
    link: "/booking",
  },
  {
    icon: Clock,
    title: "Hourly Car Hire",
    description:
      "Hire a private vehicle by the hour for meetings, errands, appointments and other personal engagements.",
    link: "/booking",
  },
  {
    icon: CalendarDays,
    title: "Full-Day Car Hire",
    description:
      "Enjoy the convenience of a dedicated vehicle and professional driver throughout your busy day.",
    link: "/booking",
  },
  {
    icon: BriefcaseBusiness,
    title: "Private & Corporate",
    description:
      "Reliable transportation solutions for individuals, executives, organisations and corporate events.",
    link: "/booking",
  },
];

const ServiceSection = () => {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#05708C] uppercase tracking-widest text-sm font-semibold">
            What We Offer
          </span>

          <h2 className="text-[#064A6F] text-3xl md:text-4xl font-bold mt-3 mb-5">
            Our Services
          </h2>

          <p className="text-gray-600 text-base leading-relaxed">
            From interstate journeys to personalised transportation,
            Logistikus Travels provides convenient, comfortable and
            dependable travel solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesection.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-7 md:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#05708C] transition-colors duration-300">
                  <Icon
                    size={28}
                    className="text-[#05708C] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3 className="text-[#05708C] text-xl font-bold mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Book Now */}
                <Link
                  to={service.link}
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#05708C] hover:bg-[#05708C] text-white font-semibold py-3 px-5 rounded-lg transition-all duration-300"
                >
                  Book Now

                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServiceSection;
