
import { FaMotorcycle, FaBox, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

function DispatchDelivery() {
  const phoneNumber = "234XXXXXXXXXX";

  const message = encodeURIComponent(
    "Hello Logistikus, I would like to book a dispatch pickup or delivery within Kaduna."
  );

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              Dispatch & Delivery - Kaduna
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 leading-tight">
              Fast, Reliable & Convenient
              <span className="text-blue-600"> Delivery Services</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              Need something picked up or delivered? Logistikus
              provides reliable dispatch and delivery services
              within Kaduna. From personal packages to business
              deliveries, we make sending and receiving items easier.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">

              <div className="flex items-center gap-3">
                <FaMotorcycle className="text-blue-600 text-2xl" />
                <span className="text-gray-700 font-medium">
                  Fast Dispatch
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaBox className="text-blue-600 text-2xl" />
                <span className="text-gray-700 font-medium">
                  Package Delivery
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <span className="text-gray-700 font-medium">
                  Doorstep Pickup
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-blue-600 text-2xl" />
                <span className="text-gray-700 font-medium">
                  Easy Booking
                </span>
              </div>

            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-9 bg-blue-700 hover:bg-blue-800 text-white px-7 py-4 rounded-lg font-semibold transition"
            >
              <FaWhatsapp />
              Book a Dispatch Rider
            </a>

            <p className="text-sm text-gray-500 mt-3">
              Available within Kaduna, Nigeria.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="/dispatch-rider.jpg"
              alt="Logistikus dispatch delivery rider in Kaduna"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default DispatchDelivery;
