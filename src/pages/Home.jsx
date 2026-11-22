
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import WhyChooseUs from "../components/WhyChooseUs";
// import RouteInfo from "../components/RouteInfo";
import Footer from "../components/Footer";
import TravelComfort from "../components/TravelComfort";
import Testimonials from "../components/Testimonials";
import ServiceSection from "../components/ServiceSection";
// import DispatchDelivery from "../components/DispatchDelivery";
// import Terminals from "../components/Terminals";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <BookingForm />
        <WhyChooseUs />

      <ServiceSection/>

      {/* <DispatchDelivery/> */}
        <TravelComfort/>
        {/* <RouteInfo /> */}
        {/* <Terminals /> */}
      </main>

      <Testimonials/>

      <Footer />
    </div>
  );
}

export default Home;
