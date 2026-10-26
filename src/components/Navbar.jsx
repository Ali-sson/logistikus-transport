import { useState } from "react";
import { Menu, X, UserRound } from "lucide-react";
import logo from "../assets/Logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Rates & Schedule", href: "#schedule" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" aria-label="Logistikus Travels home">
          <img
            src={logo}
            alt="Logistikus Travels"
            className="h-12 w-auto object-contain"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-brand-blue transition hover:text-brand-teal"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="#booking"
            className="flex items-center gap-2 text-sm font-medium text-brand-blue"
          >
            <UserRound size={17} />
            Book a Trip
          </a>

          <a
            href="#booking"
            className="rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue"
          >
            Reserve Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-brand-blue hover:bg-gray-100 lg:hidden"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-brand-blue hover:text-brand-teal"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-brand-teal px-4 py-3 text-center font-semibold text-white"
            >
              Book a Trip
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;