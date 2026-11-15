// import AboutIntro from "../components/AboutIntro";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import PageHero from "../components/PageHero";
// import ServiceSection from "../components/ServiceSection";

// function About() {
//   return (
//     <>
//     <Navbar />
//       <PageHero
//         title="About Us"
//         subtitle="We are committed to delivering reliable transportation, logistics, and travel solutions that connect people, businesses, and opportunities."
//         backgroundImage="/images/about-hero.jpg"
//       />

//     <AboutIntro/>

//     <ServiceSection/>

//     <Footer/>
    
//     </>
//   )
// }

// export default About



import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-black pt-32 px-10">
        <h1 className="text-4xl font-bold">
          About Logistikus
        </h1>

        <p className="mt-4">
          We provide reliable transportation and logistics services.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;