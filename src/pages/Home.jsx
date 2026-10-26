
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";
// import WhyChooseUs from "../components/WhyChooseUs";
// import RouteInfo from "../components/RouteInfo";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <BookingForm />
        {/* <WhyChooseUs />
        <RouteInfo /> */}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
