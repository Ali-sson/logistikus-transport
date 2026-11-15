
import seat from "../assets/seater.png";

const PageHero = ({ title, subtitle, backgroundImage }) => {
  const heroImage = backgroundImage || seat;

  return (
    <section
      className="relative min-h-[350px] md:min-h-[450px] w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(5, 20, 40, 0.95), rgba(5, 20, 40, 0.5), transparent), url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C] via-[#006080]/80 to-[#003B5C]/40" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="max-w-6xl">
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
