
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#001964] border-t border-white/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <img
                src="/img/Logo.png"
                alt="CDLM Logo blanc"
                className="h-20 bg-white rounded me-2"
              />
              <span>Commandez Dans Le Monde</span>
            </Link>
            <p className="text-white/80 mb-4">
              Votre partenaire de confiance pour tous vos besoins professionnels.
              Nous offrons des solutions innovantes et personnalisées.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-white/70">
                <Phone className="h-4 w-4 mr-2" />
                +33 1 23 45 67 89
              </div>
              <div className="flex items-center text-sm text-white/70">
                <Mail className="h-4 w-4 mr-2" />
                contact@monentreprise.fr
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2">
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
                <Link to="/sites-confiance" className="text-white/70 hover:text-white transition-colors">
                  Sites de confiance
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
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-start text-sm text-white/70">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Rue de l'Exemple<br />75000 Paris, France</span>
              </div>
              <Link to="/contact" className="inline-block text-sm text-white hover:underline">
                Formulaire de contact
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-white/70">
            © 2024 Commandez Dans Le Monde. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
