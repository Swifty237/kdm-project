
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { HashLink } from "react-router-hash-link";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Offres & Services', path: '/offres' },
    { label: 'A propos', path: '/a-propos' },
    // { label: 'Contact', path: '/#contact' }
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

  return (
    <nav className="bg-background sticky top-0 z-50 backdrop-blur-sm bg-background/95 h-[12em] pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center h-16">
            <img
              src="/img/Logo.png"
              alt="KDM Logo"
              className=""
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <button
                  key={item.path}
                  onClick={() => handleAnchorClick(item.path)}
                  className="font-medium transition-colors duration-200 hover:text-[#001964] text-muted-foreground"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors duration-200 hover:text-[#001964] ${location.pathname === item.path
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
          <div className="hidden lg:flex items-center space-x-6">
            <Button size="sm" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full px-6 text-lg">
              Demander un devis
            </Button>
            <HashLink to="/#contact" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full p-4 flex items-center justify-center"
            >
              <Phone className="h-6 w-6 text-white" />
            </HashLink>
          </div>
        </div>

        {/* Mobile CTA and Menu button */}
        <div className="flex items-center w-full justify-between mt-12 lg:hidden">
          <Button size="sm" className="bg-[#001964] hover:bg-[#001964]/90 rounded-full px-3 sm:px-4 text-xs sm:text-sm">
            Devis
          </Button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-muted-foreground hover:text-[#001964] hover:bg-[#001964]/5"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.path.startsWith('#') ? (
                  <button
                    key={item.path}
                    onClick={() => handleAnchorClick(item.path)}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-[#25423d] hover:bg-[#25423d]/5 rounded-md w-full text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md ${location.pathname === item.path
                      ? 'text-[#25423d] bg-[#25423d]/5'
                      : 'text-muted-foreground hover:text-[#25423d] hover:bg-[#25423d]/5'
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
