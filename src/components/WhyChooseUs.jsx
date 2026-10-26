
import {
  ShieldCheck,
  Armchair,
  CalendarCheck,
  Headset,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safe and Reliable",
    description:
      "We aim to provide a dependable travel experience from Kaduna to Abuja.",
  },
  {
    icon: Armchair,
    title: "Comfortable Travel",
    description:
      "Enjoy a comfortable journey with our passenger-focused transport service.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description:
      "Reserve your trip online or visit our terminal to make a booking.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "Our team is available to help with your booking and travel enquiries.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-brand-light px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-teal">
            Why Travel With Us
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-brand-blue sm:text-4xl">
            A Better Way to Travel
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            We make travelling between Kaduna and Abuja
            straightforward, convenient, and comfortable.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-brand-blue">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
