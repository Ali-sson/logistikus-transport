
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
import WhyChooseUs from "../components/WhyChooseUs";
// import RouteInfo from "../components/RouteInfo";
import Footer from "../components/Footer";
import TravelComfort from "../components/TravelComfort";
import Terminals from "../components/Terminals";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <BookingForm />
        <WhyChooseUs />
        <TravelComfort/>
        {/* <RouteInfo /> */}
        <Terminals />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
