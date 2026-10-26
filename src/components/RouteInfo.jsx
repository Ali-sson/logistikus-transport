
import {
  MapPin,
  Clock3,
  Route,
  BusFront,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  "Modern and comfortable buses",
  "Professional and experienced drivers",
  "Transparent pricing",
  "Easy online booking and payment",
  "Reliable customer support",
];

function RouteInfo() {
  return (
    <section
      id="schedule"
      className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-7">

        {/* LEFT: Route images */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-3 lg:max-w-none">
          <div className="relative h-[260px] sm:h-[300px]">
            {/* Kaduna image */}
            <div className="absolute left-0 top-0 z-10 h-[175px] w-[58%] overflow-hidden rounded-xl shadow-md sm:h-[205px]">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=80"
                alt="City landscape representing Kaduna"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-brand-blue/90 px-3 py-2 text-sm font-semibold text-white">
                <MapPin size={14} className="mr-1 inline" />
                Kaduna
              </div>
            </div>

            {/* Connecting route */}
            <div className="absolute left-[45%] top-[22%] z-20 flex h-12 w-[43%] items-center justify-center rounded-full border border-brand-teal/40 bg-white/95 text-brand-teal">
              <Route size={19} />
              <ArrowRight size={17} className="ml-1" />
            </div>

            {/* Abuja image */}
            <div className="absolute bottom-0 right-0 h-[175px] w-[58%] overflow-hidden rounded-xl shadow-md sm:h-[205px]">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=700&q=80"
                alt="Modern buildings representing Abuja"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-brand-blue/90 px-3 py-2 text-sm font-semibold text-white">
                <MapPin size={14} className="mr-1 inline" />
                Abuja
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: Route details */}
        <div className="lg:col-span-5">
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-teal">
            Our Route
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
            Kaduna <span className="text-brand-teal">→</span> Abuja
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Travel the Kaduna to Abuja route with ease. Our
            buses offer a comfortable and reliable journey,
            designed to get you to your destination safely
            and on time.
          </p>

          {/* Trip facts */}
          <div className="mt-6 grid grid-cols-2 gap-5 border-y border-gray-100 py-5 sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <Clock3
                size={22}
                className="mt-1 shrink-0 text-brand-teal"
              />
              <div>
                <p className="text-xs text-gray-500">Travel Time</p>
                <p className="mt-1 text-sm font-semibold text-brand-blue">
                  3–4 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin
                size={22}
                className="mt-1 shrink-0 text-brand-teal"
              />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="mt-1 text-sm font-semibold text-brand-blue">
                  Approx. 170 km
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-start gap-2 sm:col-span-1">
              <BusFront
                size={22}
                className="mt-1 shrink-0 text-brand-teal"
              />
              <div>
                <p className="text-xs text-gray-500">Frequency</p>
                <p className="mt-1 text-sm font-semibold text-brand-blue">
                  Demand-based departures
                </p>
              </div>
            </div>
          </div>

          <a
            href="#booking"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
          >
            View Trip Schedule
            <ArrowRight size={17} />
          </a>
        </div>

        {/* RIGHT: Why choose us */}
        <div className="rounded-2xl border border-slate-100 bg-brand-light p-6 sm:p-7 lg:col-span-4">
          <h3 className="text-xl font-extrabold text-brand-blue">
            Why Choose Logistikus Travels?
          </h3>

          <ul className="mt-5 space-y-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm leading-5 text-slate-700"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-teal"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <p className="font-serif text-lg italic text-brand-teal">
              Your Comfort. Our Priority.
            </p>

            <div className="mx-auto mt-2 h-1 w-28 -rotate-2 rounded-full bg-brand-teal" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RouteInfo;
