
const promises = [
  {
    title: "Safety first.",
    description: "Experienced drivers and well-maintained vehicles.",
  },
  {
    title: "Comfort.",
    description: "Clean, air-conditioned SUVs every time.",
  },
  {
    title: "On time.",
    description: "We plan around your flight, train or meeting.",
  },
  {
    title: "Clear pricing.",
    description: "You see the fare before you book.",
  },
];

const stats = [
  {
    number: "2",
    label: "Terminals",
  },
  {
    number: "6",
    label: "Services",
  },
  {
    number: "24/7",
    label: "Online booking",
  },
];

const AboutIntro = () => {
  return (
    <section className="bg-[#F4F6FD] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">

          {/* Who We Are */}
          <div className="bg-white border border-[#DCE2F0] rounded-2xl p-7 md:p-8">
            <h2 className="text-[#05708C] text-2xl font-bold uppercase mb-3 font-poppins">
              Who We Are
            </h2>

            <p className="text-[#536080] text-base leading-7 mb-3">
              Logistikus Travels is the passenger travel service of
              Logistikus Logistics Ltd. From our terminals in Barnawa,
              Kaduna and Mabushi, Abuja, we move individuals, families
              and businesses in comfort.
            </p>

            <p className="text-[#536080] text-base leading-7">
              Whether it's an early flight, a train to catch, a day
              of meetings or the drive between Kaduna and Abuja,
              we make it simple to book and easy to ride.
            </p>
          </div>

          {/* Our Promise */}
          <div className="bg-white border border-[#DCE2F0] rounded-3xl p-7 md:p-8">
            <h2 className="text-[#05708C] text-sm md:text-2xl font-bold uppercase mb-3 font-poppins">
              Why Choose Us
            </h2>

            <div className="space-y-3">
              {promises.map((promise, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#05708C] text-xl font-bold">
                    ✓
                  </span>

                  <p className="text-[#3e4244] text-base leading-7">
                    <strong>{promise.title}</strong>{" "}
                    {promise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-[#DCE2F0] rounded-2xl py-5 px-4 text-center hover:shadow-md transition duration-300"
            >
              <h3 className="text-[#05708C] text-5xl md:text-6xl font-extrabold font-['Oswald']">
                {stat.number}
              </h3>

              <p className="text-[#536080] font-semibold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutIntro;
