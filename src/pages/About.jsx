import AboutIntro from "../components/AboutIntro";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import ServiceSection from "../components/ServiceSection";

function About() {
  return (
    <>
    <Navbar />
      <PageHero
        title="About Us"
        subtitle="We are committed to delivering reliable transportation, logistics, and travel solutions that connect people, businesses, and opportunities."
        backgroundImage="/images/about-hero.jpg"
      />

    <AboutIntro/>

    <ServiceSection/>

    <Footer/>
    
    </>
  )
}

export default About