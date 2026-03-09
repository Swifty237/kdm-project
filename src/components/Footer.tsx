
import { Link } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="main-footer" className="bg-[#001964] border-t border-white/20 mt-16 absolute bottom-0 w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo et description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <img
                src="/img/Logo.png"
                alt="CDLM Logo blanc"
                className="h-20 bg-white rounded me-2"
              />
              <span>Qualité - Simplicité - Sérénité</span>
            </Link>
            <p className="text-white/80 mb-4">
              Votre partenaire de confiance pour le déménagement et le transport de marchandises.
            </p>
          </div>

          <div>
            {/* Liens rapides */}
            <div className="flex justify-between">
              <h3 className="font-semibold text-white">Liens rapides</h3>
              <ul className="space-y-2 w-[50%]">
                <li>
                  <Link to="/" className="text-white/70 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/offres" className="text-white/70 hover:text-white transition-colors">
                    Offres
                  </Link>
                </li>
                <li>
                  <Link to="/a-propos" className="text-white/70 hover:text-white transition-colors">
                    A propos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex justify-between mt-10">
              <h3 className="font-semibold text-white">Contact</h3>

              <ul className="space-y-2 w-[50%]">
                <li>
                  <a href={`tel:+33 6 66 28 32 43`} className="flex items-center text-sm text-white/70">
                    <Phone className="h-4 w-4 mr-2" />
                    +33 6 66 28 32 43
                  </a>
                </li>
                <li>
                  <a href={`mailto:kdmlogistique@gmail.com`} className="flex items-center text-sm text-white/70">
                    <Mail className="h-4 w-4 mr-2" />
                    kdmlogistique@gmail.com
                  </a>
                </li>
                <li>
                  <HashLink to="/#contact" className="inline-block text-sm text-white hover:underline">
                    Formulaire de contact
                  </HashLink>
                </li>
              </ul>
            </div>


            {/* Adresse */}
            <div className="flex justify-between mt-10">
              <h3 className="font-semibold text-white">Adresse</h3>

              <div className="space-y-2 w-[50%]">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent("17 Rue du Champtier" + ', ' + "92500 Rueil-Malmaison, France")}`}
                  target="_blank"
                  rel="noopener noreferrer" className="flex items-start text-sm text-white/70">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>17 Rue du Champtier<br />92500 Rueil-Malmaison, France</span>
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/70">
            © 2026 KDM LOGISTIQUE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
