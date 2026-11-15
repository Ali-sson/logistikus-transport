import seat from "../assets/seater.png"
const PageHero = ({ title, subtitle }) => {
  return (
    <section
      className="relative h-[0vh] min-h-[200px] w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(5, 20, 40, 0.95), rgba(5, 20, 40, 0.5), transparent), url(${seat})`,
      }}
    >

          {/* Dark overlay */}

    {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r
          from-[#003B5C] via-[#006080]/95
          to-[#003B5C]/40" />


      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="max-w-6xl">
          {/* <p className="text-[#FBBF24] uppercase tracking-[3px] font-semibold text-sm mb-4">
            Logistikus
          </p> */}

          <h1 className="text-white text-4xl md:text-6xl font-bold mb-5">
            {title}
          </h1>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
