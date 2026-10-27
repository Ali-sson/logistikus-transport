
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import logo from "../assets/Logo2.png"; 

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-brand-blue text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company information */}
          <div>

            <a href="#home" className="flex items-center">
            <img
              src={logo}
              alt="Logistikus Transport Services"
              className="h-12 w-auto object-contain"
  />
</a>
           

            <p className="mt-4 max-w-xs text-sm leading-7 text-white/75">
              Your trusted travel partner for comfortable, convenient, 
              and reliable journeys to your destination.
            </p>

            <a
              href="#booking"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-white"
            >
              Book a Trip
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>

            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>
                <a href="#home" className="hover:text-cyan-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cyan-300">
                  Route Information
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-cyan-300">
                  Book a Trip
                </a>
              </li>
            </ul>
          </div>

          {/* Route */}
          <div>
            <h3 className="text-lg font-bold">Our Route</h3>

            <div className="mt-5 flex items-start gap-3 text-sm text-white/75">
              <MapPin size={19} className="mt-0.5 shrink-0 text-cyan-300" />
              <p>
                Kaduna
                <span className="mx-2 text-cyan-300">→</span>
                Abuja
              </p>
            </div>

             <div className="mt-5 flex items-start gap-3 text-sm text-white/75">
              <MapPin size={19} className="mt-0.5 shrink-0 text-cyan-300" />
              <p>
                Abuja
                <span className="mx-2 text-cyan-300">→</span>
                Kaduna
              </p>
            </div>

            {/* <p className="mt-4 text-sm leading-6 text-white/75">
              Check your booking confirmation for the latest
              departure information.
            </p> */}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>

            <div className="mt-5 space-y-4 text-sm text-white/75">
              <p className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                <span>0816 725 1663</span>
                <span>0816 128 5804</span>

              </p>

              <p className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                <span>Company email to be confirmed</span>
              </p>

            

             <div className="mt-4 space-y-3 text-sm text-white/75">
  <p className="flex items-start gap-3">
    <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-300" />
    <span>
      <span className="block font-medium">Abuja Terminals</span>
      <span className="mt-1 block text-white/60">
        Boot 40, Mabushi Bus Terminal, FCT Abuja
      </span>
    </span>
  </p>
</div>

  <div className="mt-4 space-y-3 text-sm text-white/75">
                <p className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-cyan-300" />
             <span>
      <span className="block font-medium">Kaduna Terminals</span>
      <span className="mt-1 block text-white/60">
        Shop 7, Third Floor, El-Gibbor Plaza, opposite Barnawa Market, Aliyu Makama, Barnawa Kaduna
      </span>
    </span>
  </p>
</div>


            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Logistikus Transport Services.
              All rights reserved.
            </p>

            <p>Safe journeys start here.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
