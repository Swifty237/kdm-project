import { HashLink } from "react-router-hash-link";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Clock, Send, HandCoins, Handshake, ArrowBigRight, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import InputAdress from "@/components/InputAdress";

const Accueil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messageData, setMessageData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    telephone: '',
    service: '',
    message: '',
  });

  const [devisData, setDevisData] = useState({
    service: 'demenagement',
    departure: '',
    arrival: '',
    date: '',
    surface: '',
  });

  const [currentIndex, setCurrentIndex] = useState(0);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDevisInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDevisData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSelectChange = (value: string) => {
    setMessageData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_KDM_SERVER_URI; // pour Vite

    console.log('Données du formulaire:', messageData);


    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });


      const result = await response.json();

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });

      if (response.ok) {
        // alert("Message envoyé avec succès !");
        setMessageData({
          nom: "",
          email: "",
          entreprise: "",
          telephone: "",
          service: "",
          message: "",
        });
      } else {
        alert("Erreur : " + result.error);
      }
    } catch (err) {
      console.error(err);
      // alert("Erreur réseau lors de l'envoi du message.");
    }
  };

  const handleSubmitDevis = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Données du formulaire:', devisData);

    // Redirige vers /devis en transmettant les infos
    navigate("/devis", { state: { devisData } });

    setDevisData({
      service: 'demenagement',
      departure: '',
      arrival: '',
      date: '',
      surface: '',
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Téléphone",
      content: "+33 6 66 28 32 43",
      description: "Lun-Sam : 8h30-19h"
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      content: "kdmlogistique@gmail.com",
      description: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Adresse",
      content: "17 Rue du Champtier",
      description: "92500 Rueil-Malmaison, France"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Horaires",
      content: "Lun-Sam : 8h30-19h",
      description: "Sur rendez-vous"
    }
  ];

  // 🔹 Liste des images du carrousel
  const images = [
    "img/demenageurs.png",
    "img/packers-and-movers.jpg",
    "img/homme-meubles-en-mouvement.jpg",
    "img/nouvel-appartement.jpg",
    "img/livreur-de-coup-moyen-tenant-la-boite.jpg"
  ];

  // 🔹 Fait défiler automatiquement les images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // change toutes les 4 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}

      <section className="relative pb-16 sm:py-20 lg:py-32 px-4 sm:px-8 lg:px-32">

        {/* 🔹 Arrière-plan avec effet de fondu */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Contenu au-dessus du carrousel */}
        {/* <div className="relative z-10 bg-black/40 w-full h-full flex flex-col justify-center items-center text-white text-center rounded-2xl"> */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-white text-center rounded-2xl">

          <Card className="bg-[#ecf0f1d7] border-0 shadow-lg ">
            <CardHeader>
              <CardTitle className="text-4xl lg:text-5xl text-center text-[#001964]">
                Confiez nous vos cartons sans stress et nous nous occupons du reste
              </CardTitle>
              <CardDescription className="italic text-center text-2xl text-[#001964]">
                Remplissez le formulaire ci-dessous et obtenez un devis rapidement.
              </CardDescription>
            </CardHeader>
            <CardContent>

              <form onSubmit={handleSubmitDevis} className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  <div className="space-y-2">
                    <InputAdress
                      id="departure"
                      name="departure"
                      required
                      value={devisData.departure}
                      onChange={(val) => setDevisData({ ...devisData, departure: val })}
                      placeholder="Adresse de départ"
                      className="text-sm lg:text-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <InputAdress
                      id="arrival"
                      name="arrival"
                      required
                      value={devisData.arrival}
                      onChange={(val) => setDevisData({ ...devisData, arrival: val })}
                      placeholder="Adresse d'arrivée"
                      className="text-sm lg:text-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                  <div className="space-y-2">
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={devisData.date}
                      onChange={handleDevisInputChange}
                      placeholder="Date de départ"
                      className="text-sm lg:text-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="surface"
                      name="surface"
                      type="text"
                      value={devisData.surface}
                      onChange={handleDevisInputChange}
                      placeholder="Surface en m2"
                      className="text-sm lg:text-xl"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#001964] hover:bg-[#001964]/90 text-sm lg:text-base" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  C'est parti !
                </Button>
              </form>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Orange Money Card */}
            <Card className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[#001964] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <HandCoins className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#001964] mb-2 text-xl">Formule économique ou premium</h3>
                <p className="text-gray-700 text-lg text-justify mb-4">
                  Parmi nos 4 formules, vous trouverez la prestation adaptée à vos besoins et à votre budget.
                </p>
                <p className="text-gray-700 text-lg text-justify">
                  De l’essentiel au tout compris : à vous de choisir !
                </p>
              </CardContent>
            </Card>

            {/* Mobile Money Card */}
            <Card className="backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[#001964] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Award className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#001964] mb-2 text-base text-xl">Service de qualité</h3>
                <p className="text-gray-700 text-lg text-justify mb-4">
                  Un service rigoureux, ponctuel et à votre écoute.
                </p>
                <p className="text-gray-700 text-lg text-justify">
                  De la première prise de contact à la livraison finale, la qualité guide chacune de nos actions.
                </p>
              </CardContent>
            </Card>

            {/* PayPal Card */}
            <Card className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[#001964] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Handshake className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#001964] mb-2 text-xl">Equipe courtoise & professionnelle</h3>
                <p className="text-gray-700 text-lg text-justify mb-4">
                  Professionnalisme, respect et bonne humeur à chaque étape de notre prestation.
                </p>
                <p className="text-gray-700 text-lg text-justify">
                  Avec nous, déménager devient une expérience fluide et agréable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Command Process Section */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mb-8 lg:mb-16 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Step 1 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-3 lg:mb-4">Envoyez une demande de devis</h3>
                <p className="text-muted-foreground mb-3 lg:mb-4 text-lg lg:text-xl">
                  Remplissez notre formulaire en ligne, consultez instantanément une estimation indicative et transmettez-nous votre demande de devis.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-3 lg:mb-4">Validez votre devis</h3>
                <p className="text-muted-foreground mb-3 lg:mb-4 text-lg lg:text-xl">
                  Dès réception de votre demande, nous vous adressons un devis détaillé dans les plus brefs délais pour validation et réservation de votre date de déménagement.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-3 lg:mb-4">Réservez votre sérénité</h3>
                <p className="text-muted-foreground mb-3 lg:mb-4 text-lg lg:text-xl">
                  Une fois votre réservation confirmée, fini le stress, nous nous occupons du reste.
                </p>

                <div className="flex items-center justify-around w-full">
                  <p className="text-muted-foreground text-xl">
                    Pour plus d'informations.
                  </p>

                  <ArrowBigRight className="h-12 w-12 text-[#001964]" />

                  <HashLink to="#contact" className="bg-[#001964] hover:bg-[#001964]/90 text-white rounded-full px-4 py-2 lg:px-6 lg:text-xl"
                  >
                    Contactez nous
                  </HashLink>
                </div>
              </div>
            </div>

            {/* Right Side - Large Text */}
            <div className="text-center lg:text-right h-full order-1 lg:order-2">
              <div className="flex flex-col items-center lg:items-end justify-center">
                <img
                  src="/lovable-uploads/cdlm-avatar-telephone.png"
                  className="max-w-full h-auto"
                  alt=""
                />
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#001964] leading-tight mb-6 lg:mb-12">
                  Obtenez votre devis rapidement et réservez votre date de déménagement.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer reviews Section */}
      <section className="pb-4 lg:py-10 px-4 sm:px-8 lg:px-16 flex flex-col items-center w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12 shadow-lg">
            {/* Elfsight Google Reviews | KDM logistique */}
            {/* <script src="https://elfsightcdn.com/platform.js" async></script> */}
            <div className="elfsight-app-842bb9ef-d1c6-480a-9fda-f80dc1077672" data-elfsight-app-lazy></div>
          </div>
        </div>

        <Button className="shadow-lg border-2 border-[#95a5a6] text-[#95a5a6] bg-white hover:bg-white hover:border-[#001964] hover:text-[#001964] rounded-full px-6 lg:px-8 text-lg font-bold">
          Découvrez tous les avis
        </Button>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8 lg:mt-16 bg-muted/30 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001964] mb-4 lg:mb-6">
              Contactez-nous
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Prêt à démarrer votre projet ? Notre équipe est là pour vous accompagner.
              Contactez-nous dès aujourd'hui pour discuter de vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-4 lg:mb-6">
                  Informations de contact
                </h3>
                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="shadow-lg">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex items-start space-x-3 lg:space-x-4">
                          <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#001964] rounded-lg flex items-center justify-center flex-shrink-0">
                            {info.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#001964] mb-1 text-sm lg:text-base">{info.title}</h4>
                            <p className="text-foreground mb-1 text-sm lg:text-base">{info.content}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <Card className="shadow-lg">
                <CardContent className="p-4 lg:p-6">
                  <h4 className="font-semibold text-[#001964] mb-3 lg:mb-4 text-sm lg:text-base">Notre localisation</h4>
                  <div className="w-full h-36 lg:h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-6 lg:h-8 w-6 lg:w-8 mx-auto mb-2 text-[#001964]" />
                      <p className="text-sm lg:text-base">Carte interactive</p>
                      <p className="text-xs lg:text-sm">17 Rue du Champtier, 92500 Rueil-Malmaison</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl text-[#001964]">Envoyez-nous un message</CardTitle>
                  <CardDescription className="text-sm lg:text-base">
                    Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom" className="text-sm lg:text-base ">Nom complet *</Label>
                        <Input
                          id="nom"
                          name="nom"
                          type="text"
                          required
                          value={messageData.nom}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm lg:text-base">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={messageData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="entreprise" className="text-sm lg:text-base">Entreprise</Label> <br />
                        <span className="text-sm italic text-[#636e72]">(* Si vous nous contactez pour le compte d'une entreprise)</span>
                        <Input
                          id="entreprise"
                          name="entreprise"
                          type="text"
                          value={messageData.entreprise}
                          onChange={handleInputChange}
                          placeholder="Nom de votre entreprise"
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telephone" className="text-sm lg:text-base">Téléphone</Label>
                        <Input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          value={messageData.telephone}
                          onChange={handleInputChange}
                          placeholder="+33 1 23 45 67 89"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm lg:text-base">Service souhaité</Label>
                      <Select onValueChange={handleSelectChange} value={messageData.service}>
                        <SelectTrigger className="text-sm lg:text-base">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Demenagement">Service de déménagement</SelectItem>
                          <SelectItem value="transport">Service de transport marchandises</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm lg:text-base">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={messageData.message}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre projet ou vos besoins..."
                        rows={5}
                        className="text-sm lg:text-base"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#001964] hover:bg-[#001964]/90 text-sm lg:text-base" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;
