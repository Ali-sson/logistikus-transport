import Navbar from "../components/Navbar"
import PageHero from "../components/PageHero"
import seater from "../assets/seater.png"
import Terminals from "../components/Terminals"
import Footer from "../components/Footer"


function Contact() {
  return (
    <>
    
    <Navbar/>

     <PageHero
        title="Contact Us"
        subtitle="We are always ready to assist you with your travel needs. Get in touch with our team today, and let us help you find the right solution for a smooth, safe, and reliable experience.s"
        backgroundImage={seater}
      />

    <Terminals/>

    <Footer/>
    </>
  )
}

export default Contact