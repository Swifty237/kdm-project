import { HashLink } from "react-router-hash-link";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone, Clock, Send, HandCoins, ShieldCheck, Handshake, ArrowBigRight } from 'lucide-react';
import { useState } from 'react';

const Accueil = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    telephone: '',
    service: '',
    message: '',
    departure: '',
    arrival: '',
    date: '',
    surface: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Données du formulaire:', formData);

    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });

    setFormData({
      nom: '',
      email: '',
      entreprise: '',
      telephone: '',
      service: '',
      message: '',
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
      content: "+33 1 23 45 67 89",
      description: "Lun-Ven : 9h-18h"
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      content: "contact@cdlm.fr",
      description: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Adresse",
      content: "123 Rue de l'Exemple",
      description: "75000 Paris, France"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Horaires",
      content: "Lun-Ven : 9h-18h",
      description: "Sur rendez-vous"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="header-section-bg-img py-16 sm:py-20 lg:py-32 px-4 sm:px-8 lg:px-32 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="items-center">

            {/* Left Column - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start h-[50vh] items-center">

                <Card className="bg-[#ecf0f1d7] border-0 shadow-lg ">
                  <CardHeader>
                    <CardTitle className="text-4xl lg:text-5xl text-center text-[#001964]">
                      Confiez nous vos cartons sans stress et nous nous occupons du reste
                    </CardTitle>
                    <CardDescription className="italic text-center text-xl text-[#001964]">
                      Remplissez le formulaire ci-dessous et obtenez un devis rapidement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>

                    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        <div className="space-y-2">
                          <Input
                            id="departure"
                            name="departure"
                            type="text"
                            required
                            value={formData.departure}
                            onChange={handleInputChange}
                            placeholder="Adresse de départ"
                            className="text-sm lg:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            id="arrival"
                            name="arrival"
                            type="text"
                            required
                            value={formData.arrival}
                            onChange={handleInputChange}
                            placeholder="Adresse d'arrivée"
                            className="text-sm lg:text-base"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        <div className="space-y-2">
                          <Input
                            id="date"
                            name="date"
                            type="text"
                            value={formData.date}
                            onChange={handleInputChange}
                            placeholder="Date de départ"
                            className="text-sm lg:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Input
                            id="surface"
                            name="surface"
                            type="text"
                            value={formData.surface}
                            onChange={handleInputChange}
                            placeholder="Surface en m2"
                            className="text-sm lg:text-base"
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
            </div>

          </div>
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
                <h3 className="font-bold text-[#001964] mb-2 text-base lg:text-lg">Formule économique</h3>
                <p className="text-gray-700 text-xs lg:text-sm">

                </p>
              </CardContent>
            </Card>

            {/* Mobile Money Card */}
            <Card className="backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[#001964] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <ShieldCheck className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#001964] mb-2 text-base lg:text-lg">Service de qualité</h3>
                <p className="text-gray-700 text-xs lg:text-sm text-white">
                </p>
              </CardContent>
            </Card>

            {/* PayPal Card */}
            <Card className="bg-white/95 backdrop-blur-sm hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1 shadow-lg">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-[#001964] rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Handshake className="h-6 lg:h-8 w-6 lg:w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#001964] mb-2 text-base lg:text-lg">Equipe courtoise & proféssionnelle</h3>
                <p className="text-gray-700 text-xs lg:text-sm">
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
                  Vous choisissez vos produits sur n'importe quelle boutique en ligne et nous transmettez le lien sur WhatsApp pour obtenir un devis sécurisé
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-3 lg:mb-4">Validez votre devis</h3>
                <p className="text-muted-foreground mb-3 lg:mb-4 text-lg lg:text-xl">
                  Confirmez votre commande en réglant le devis via Orange Money, Mobile Money, virement bancaire ou PayPal, puis indiquez l'adresse de livraison souhaitée
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-3 lg:mb-4">On s'occupe du reste</h3>
                <p className="text-muted-foreground mb-3 lg:mb-4 text-lg lg:text-xl">
                  Dès l'arrivée de votre commande, nous vous informons immédiatement afin que vous puissiez vous organiser pour la réception.
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
                  Commandez en ligne sur vos sites favoris et faites vous livrer directement à domicile
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer reviews Section */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 flex flex-col items-center w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-12 text-[#001964]">Avis clients</h2>
            {/* Elfsight Google Reviews | Untitled Google Reviews */}
            <div className="elfsight-app-01c071c0-c3c8-40f9-8cd3-20a2aabb41a3" data-elfsight-app-lazy></div>
          </div>
        </div>

        <Button className="bg-[#001964] text-white hover:bg-[#001964]/90 rounded-full px-6 lg:px-8 text-xl">
          Découvrez tous les avis
        </Button>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8 lg:mt-16 bg-muted/30 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-3xl font-bold text-[#001964] mb-4 lg:mb-6">
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
                    <Card key={index}>
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
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <h4 className="font-semibold text-[#001964] mb-3 lg:mb-4 text-sm lg:text-base">Notre localisation</h4>
                  <div className="w-full h-36 lg:h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-6 lg:h-8 w-6 lg:w-8 mx-auto mb-2 text-[#001964]" />
                      <p className="text-sm lg:text-base">Carte interactive</p>
                      <p className="text-xs lg:text-sm">123 Rue de l'Exemple, 75000 Paris</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
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
                          value={formData.nom}
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
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="entreprise" className="text-sm lg:text-base">Entreprise</Label>
                        <Input
                          id="entreprise"
                          name="entreprise"
                          type="text"
                          value={formData.entreprise}
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
                          value={formData.telephone}
                          onChange={handleInputChange}
                          placeholder="+33 1 23 45 67 89"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm lg:text-base">Service souhaité</Label>
                      <Select onValueChange={handleSelectChange} value={formData.service}>
                        <SelectTrigger className="text-sm lg:text-base">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="achat">Achat personnalisé</SelectItem>
                          <SelectItem value="paiement">Paiement simplifié</SelectItem>
                          <SelectItem value="livraison">Livraison économique</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm lg:text-base">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
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
