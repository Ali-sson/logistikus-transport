
import {
  ShieldCheck,
  CarFront,
  Clock,
  Headset,
  CreditCard,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Your safety is our priority.",
  },
  {
    icon: CarFront,
    title: "Comfortable Travel",
    description: "Clean, reliable and well-maintained vehicles.",
  },
  {
    icon: Clock,
    title: "On-Time Departure",
    description: "We value your time.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're always here to help.",
  },
  {
    icon: CreditCard,
    title: "Easy Booking & Payments",
    description: "Book and pay with ease.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#F8FAFC] py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-4
                ${index !== benefits.length - 1
                  ? "lg:border-r lg:border-blue-200"
                  : ""
                }`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#0A3D78]
                  flex items-center justify-center mb-4">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#0A3D78] mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed max-w-[220px]">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
