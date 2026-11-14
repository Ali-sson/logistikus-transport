
import {
  Armchair,
  Snowflake,
  Wifi,
  ArrowRight,
} from "lucide-react";
import seatImage from "../assets/seat.png"; // Import the seat image

const features = [
  {
    icon: Armchair,
    title: "Spacious Seats",
    description: "More legroom, more comfort.",
  },
  {
    icon: Snowflake,
    title: "Air Conditioned",
    description: "Cool and refreshing throughout your journey.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected on the go.",
  },
];

const TravelComfort = () => {
  return (
    <section className="px-4 py-10 md:px-8">
      <div
        className="relative max-w-7xl mx-auto overflow-hidden
        rounded-2xl min-h-[320px] md:min-h-[280px]
        bg-[#0A3D78]"
        style={{
          backgroundImage: `url(${seatImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r
          from-[#003B5C] via-[#006080]/95
          to-[#003B5C]/40" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1
          lg:grid-cols-5 gap-8 items-center
          px-6 py-10 md:px-10 lg:px-12">

          {/* Left Content */}
          <div className="lg:col-span-2 text-white">
            <span className="text-xs font-semibold uppercase
              tracking-[2px] text-cyan-300">
              Travel with Logistikus
            </span>

            <h2 className="text-2xl md:text-3xl font-bold
              leading-tight mt-3 mb-3">
              Travel in Comfort.
              <br />
              Experience the Difference.
            </h2>

            <p className="text-sm text-blue-100
              leading-relaxed max-w-md mb-6">
              At Logistikus Travels, we believe that your
              journey should be as enjoyable as your
              destination. Sit back, relax, and let us
              take you there.
            </p>

            <a
              href="#booking"
              className="inline-flex items-center gap-3
              bg-cyan-500 hover:bg-cyan-400
              text-white font-semibold text-sm
              px-6 py-3 rounded-full transition-all
              duration-300 hover:gap-5 shadow-lg"
            >
              Book Now
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-3 
            grid-cols-3 sm:grid-cols-3 gap-6
            lg:gap-8 mt-4 lg:mt-0 grid">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="text-white flex-col
                  items-start gap-3 md:flex"
                >
                  <div className="w-11 h-11 rounded-xl
                    bg-white/10 border border-white/20
                    flex items-center justify-center
                    backdrop-blur-sm">
                    <Icon
                      size={23}
                      className="text-cyan-300"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-xs text-blue-100
                      leading-relaxed max-w-[160px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelComfort;
