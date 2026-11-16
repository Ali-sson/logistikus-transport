
import { UserRound, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Daniel James",
    role: "Frequent Traveller",
    review:
      "Logistikus made my journey from Kaduna to Abuja stress-free. The booking process was simple, the vehicle was comfortable, and the driver was professional.",
  },
  {
    name: "Mary Johnson",
    role: "Business Owner",
    review:
      "I appreciate their reliability and excellent customer service. They made my travel arrangements easy and ensured I arrived safely and on time.",
  },
  {
    name: "Samuel David",
    role: "Regular Customer",
    review:
      "A very reliable transport service. Their vehicles are comfortable, their drivers are courteous, and the entire travel experience was smooth.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#05708C] font-semibold uppercase tracking-widest text-sm mb-3">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#064A6F] mb-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We are committed to making every journey comfortable,
            safe, and reliable. Here's what our customers have to say.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-center mb-6">
                <Quote size={35} className="text-[#006080]/30" />

                <div className="flex gap-1 text-[#05708C]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-8">
                "{item.review}"
              </p>

              {/* Customer */}
              <div className="flex items-center gap-4 border-t pt-5">
                <div className="w-12 h-12 rounded-full bg-[#05708C] flex items-center justify-center">
                  <UserRound className="text-white" size={25} />
                </div>

                <div>
                  <h3 className="font-bold text-[#003B5C]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
