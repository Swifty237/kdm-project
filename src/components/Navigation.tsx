import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { HashLink } from "react-router-hash-link";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Offres & Services', path: '/offres' },
    { label: 'A propos', path: '/a-propos' },
  ];

  const handleAnchorClick = (path: string) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleShadow = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);    // fermer le menu mobile si ouvert
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur-sm transition-shadow duration-300
        ${hasShadow ? "shadow-md bg-white/90" : "bg-white/50"}
      `}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src="/img/Logo.png"
              alt="KDM Logo"
              className="h-24 w-auto" // Ajustez la hauteur selon votre logo
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="space-x-6">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <button
                  key={item.path}
                  onClick={() => handleAnchorClick(item.path)}
                  className="font-medium transition-colors duration-200 hover:text-[#001964] text-muted-foreground text-lg"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 hover:text-[#001964] text-lg ${location.pathname === item.path
                    ? 'text-[#001964]'
                    : 'text-muted-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side - Secondary links and CTA (Desktop) */}
          <div className="flex items-center space-x-6">
            <Link to="/devis" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full px-6 py-2 text-xl text-white">
              Devis instantané
            </Link>
            <HashLink to="/#contact" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full p-4 flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </HashLink>
          </div>
        </div>

        {/* Mobile CTA and Menu button */}
        <div className="flex flex-col items-start lg:hidden">
          {/* Logo */}
          <Link to="/">
            <img
              src="/img/Logo.png"
              alt="KDM Logo"
              className="h-16 w-auto"
            />
          </Link>

          <div className="flex pb-2 justify-between w-full my-2">
            {/* Right side - Secondary links and CTA (Desktop) */}
            <Link to="/devis" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full px-6 py-2 text-xl text-white">
              Devis instantané
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-[#001964] hover:bg-[#001964]/5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border backdrop-blur-md mt-2 bg-[#ecf0f1] rounded-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.path.startsWith('#') ? (
                  <button
                    key={item.path}
                    onClick={() => handleAnchorClick(item.path)}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-[#001964] hover:bg-[#001964]/5 rounded-md w-full text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${location.pathname === item.path
                      ? 'text-[#001964] bg-[#001964]/5'
                      : 'text-muted-foreground hover:text-[#001964] hover:bg-[#001964]/5'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;