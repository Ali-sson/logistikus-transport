
import { ArrowRight, CalendarDays } from "lucide-react";
import heroImage from "../assets/BlueCar.png"

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[540px] overflow-hidden bg-brand-blue bg-cover bg-center"
      style={{
          backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue/95 via-brand-blue/75 to-brand-blue/10" />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Safe. Comfortable. Reliable.
          </p>
<h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
  Your Journey
  <span className="block">
    Starts <span className="text-cyan-300">Here.</span>
  </span>
</h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
           At Logistikus Transport Services, we make every journey simple and convenient. Travel with comfort, book with ease, and arrive with confidence as we connect you to your destination.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
            >
              <CalendarDays size={19} />
              Book a Trip
            </a>

            <a
              href="#schedule"
              className="inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-brand-blue"
            >
              About Us 
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
