import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader, Send, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputAdress from '@/components/InputAdress';
import { Textarea } from '@/components/ui/textarea';
import ConfirmDevisDialog from '@/components/ConfirmDevisDialog';
import { calculateDistance } from '@/lib/distanceCalculator';
import { useFormValidation } from '@/hooks/useFormValidation';

const FormulaireDevis = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // États de validation pour les adresses
  const [billingAddressValid, setBillingAddressValid] = useState(false);
  const [departAddressValid, setDepartAddressValid] = useState(false);
  const [arrivalAddressValid, setArrivalAddressValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculationLoading, setCalculationLoading] = useState(false);

  // Hook de validation
  const { errors, touched, setFieldTouched, setFieldError, clearFieldError } = useFormValidation();

  // Récupérez votre clé API Google Maps depuis les variables d'environnement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Récupère les données transmises depuis Accueil
  const initialDevisData = location.state?.devisData || {};
  const initialDepartureValid = location.state?.departureValid || false;
  const initialArrivalValid = location.state?.arrivalValid || false;

  useEffect(() => {
    if (billingAddressValid) {
      clearFieldError('billingAddress');
    }

    if (departAddressValid) {
      clearFieldError('departAddress');
    }

    if (arrivalAddressValid) {
      clearFieldError('arrivalAddress');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingAddressValid, departAddressValid, arrivalAddressValid]);

  // États initiaux (pré-remplis si données reçues)
  const [departData, setDepartData] = useState({
    surface: initialDevisData.surface || "",
    volume: "",
    rooms: "",
    floor: "",
    elevator: false,
    elevatorSize: "",
    stairsSize: "",
    address: initialDevisData.departure || "",
  });

  const [arrivalData, setArrivalData] = useState({
    floor: "",
    elevator: false,
    elevatorSize: "",
    stairsSize: "",
    address: initialDevisData.arrival || "",
    contactCivility: "",
    contactName: "",
    telContact: "",
    entreprise: "",
    date: initialDevisData.date || "",
  });

  const [devisData, setDevisData] = useState({
    civility: "",
    name: "",
    email: "",
    entreprise: "",
    telephone: "",
    service: "Demenagement",
    offer: "",
    billingAddress: "",
    devisNumber: "",
    departure: departData,
    arrival: arrivalData,
    date: initialDevisData.date || "",
    archived: false,
    inManagement: false,
    message: "",
    distance: "",
    duration: "",
    estimatedAmount: "",
    finalAmount: "",
    adjustmentReason: "",
    adjustmentAmount: "",
  });

  // Synchronise les sous-objets départ/arrivée avec devisData
  useEffect(() => {
    setDevisData(prev => ({
      ...prev,
      departure: departData,
      arrival: arrivalData,
    }));
  }, [departData, arrivalData]);

  // Fonction de validation globale
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date().toISOString().split('T')[0];

    // Champs toujours obligatoires
    if (!devisData.civility) newErrors.civility = "La civilité est requise";
    if (!devisData.name) newErrors.name = "Le nom est requis";
    if (!devisData.email) newErrors.email = "L'email est requis";
    if (!devisData.telephone) newErrors.telephone = "Le téléphone est requis";
    if (!devisData.date) newErrors.date = "La date est requise";
    if (devisData.date <= today) newErrors.date = "La date est invalide";
    if (!billingAddressValid) newErrors.billingAddress = "Adresse de facturation invalide";
    if (!departAddressValid) newErrors.departAddress = "Adresse de départ invalide";
    if (!arrivalAddressValid) newErrors.arrivalAddress = "Adresse d'arrivée invalide";

    // Validation selon le service
    if (devisData.service === "Demenagement") {
      if (!devisData.offer) newErrors.offer = "La formule est requise";
      if (!departData.surface) newErrors.surface = "La surface est requise";
      if (!departData.rooms) newErrors.rooms = "Le nombre de pièces est requis";

      // Validation étage départ
      if (departData.floor && parseInt(departData.floor) > 0) {
        if (!departData.stairsSize) newErrors.departStairsSize = "La taille de l'escalier est requise";
      }

      // Validation ascenseur départ
      if (departData.elevator && !departData.elevatorSize) {
        newErrors.departElevatorSize = "La taille de l'ascenseur est requise";
      }

      // Validation étage arrivée
      if (arrivalData.floor && parseInt(arrivalData.floor) > 0) {
        if (!arrivalData.stairsSize) newErrors.arrivalStairsSize = "La taille de l'escalier est requise";
      }

      // Validation ascenseur arrivée
      if (arrivalData.elevator && !arrivalData.elevatorSize) {
        newErrors.arrivalElevatorSize = "La taille de l'ascenseur est requise";
      }
    }

    if (devisData.service === "transport") {
      if (!departData.volume) newErrors.volume = "Le volume est requis";
      if (!arrivalData.contactCivility) newErrors.contactCivility = "Le nom du contact est requis";
      if (!arrivalData.contactName) newErrors.contactName = "Le nom du contact est requis";
      if (!arrivalData.telContact) newErrors.telContact = "Le téléphone du contact est requis";
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDevisData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const handleDepartInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartData(prev => {
      const updated = { ...prev, [name]: value };
      setDevisData(d => ({ ...d, departure: updated }));
      return updated;
    });
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const handleArrivalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArrivalData(prev => {
      const updated = { ...prev, [name]: value };
      setDevisData(d => ({ ...d, arrival: updated }));
      return updated;
    });
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const handleSelectCivility = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      civility: value
    }));
    clearFieldError('civility');
  };

  const handlecontactCivility = (value: string) => {
    setArrivalData(prev => ({
      ...prev,
      contactCivility: value
    }));
    clearFieldError('contactCivility');
  };


  const handleSelectChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      service: value
    }));
    clearFieldError('service');
  };

  const handleSelectOfferChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      offer: value
    }));
    clearFieldError('offer');
  };

  const handleSelectDepartStairsChange = (value: string) => {
    setDepartData(prev => ({
      ...prev,
      stairsSize: value
    }));
    clearFieldError('departStairsSize');
  };

  const handleSelectArrivalStairsChange = (value: string) => {
    setArrivalData(prev => ({
      ...prev,
      stairsSize: value
    }));
    clearFieldError('arrivalStairsSize');
  };

  const roundToNearestTen = (value) => {
    // Convertir en nombre (au cas où on reçoit une chaîne)
    const num = parseFloat(value);
    if (isNaN(num)) return "0.00";

    // Partie entière
    const integerPart = Math.floor(num);
    // Dernier chiffre de la partie entière (unités)
    const lastDigit = integerPart % 10;

    let roundedInteger;
    if (lastDigit < 5) {
      // Arrondir à la dizaine inférieure
      roundedInteger = integerPart - lastDigit;
    } else {
      // Arrondir à la dizaine supérieure
      roundedInteger = integerPart + (10 - lastDigit);
    }

    // Retourner le montant avec deux décimales (toujours .00)
    return roundedInteger.toFixed(2);
  };

  const handleEstimate = async () => {
    // Valider le formulaire
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // Afficher les erreurs
      Object.entries(formErrors).forEach(([field, message]) => {
        setFieldError(field, message);
      });

      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setCalculationLoading(true)

    try {

      // Calculer la distance - PLUS DE PARAMÈTRE API KEY
      const distanceResult = await calculateDistance(
        departData.address,
        arrivalData.address
      );

      if (!distanceResult || distanceResult.status !== 'OK') {
        toast({
          title: "Erreur de calcul",
          description: "Impossible de calculer la distance entre les adresses",
          variant: "destructive"
        });
        setCalculationLoading(false);
        return;
      }

      // Utiliser les valeurs formatées directement
      const distanceText = distanceResult.distance;      // ex: "467 km"
      const durationText = distanceResult.duration;      // ex: "4 heures 34 min"
      const distanceKm = distanceResult.distanceValue / 1000; // Conversion mètres → km

      let estimatedAmount = 0;

      if (devisData.service === "transport") {
        estimatedAmount = calculateTransportPrice(distanceKm, departData.volume);
      } else if (devisData.service === "Demenagement") {
        const surface = parseFloat(departData.surface) || 0;
        estimatedAmount = calculateMovingPrice(devisData.offer, surface, distanceKm);
      }

      const convertEstimatedAmount = roundToNearestTen(estimatedAmount)

      setDevisData(prev => ({
        ...prev,
        estimatedAmount: convertEstimatedAmount,
        distance: distanceText,
        duration: durationText,
      }));

      toast({
        title: "Estimation calculée",
        description: `Distance: ${distanceText} | Durée du trajet: ${durationText} | Estimation: ${convertEstimatedAmount}€`,
      });

      setCalculationLoading(false);

    } catch (error) {
      console.error("❌ Erreur lors du calcul de distance:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du calcul de la distance",
        variant: "destructive"
      });

      setCalculationLoading(false);
    }
  };

  // Fonctions de calcul
  const calculateMovingPrice = (offer: string, surface: number, distanceKm: number): number => {
    // Vérifier que l'offre est valide
    const validOffers = ["economique", "standard", "premium", "premium+"];
    if (!validOffers.includes(offer)) {
      console.warn("Offre invalide :", offer);
      return 0;
    }

    const validOffer = offer as "economique" | "standard" | "premium" | "premium+";

    const getBasePriceBySurface = (offer: typeof validOffer, surface: number): number => {
      if (surface < 50) return basePriceTable[offer].tranche1;
      if (surface < 80) return basePriceTable[offer].tranche2;
      if (surface < 110) return basePriceTable[offer].tranche3;
      if (surface < 140) return basePriceTable[offer].tranche4;
      if (surface < 170) return basePriceTable[offer].tranche5;
      if (surface < 200) return basePriceTable[offer].tranche6;
      return basePriceTable[offer].tranche7;
    };

    const basePriceTable = {
      economique: { tranche1: 200, tranche2: 300, tranche3: 400, tranche4: 500, tranche5: 600, tranche6: 700, tranche7: 800 },
      standard: { tranche1: 300, tranche2: 400, tranche3: 500, tranche4: 600, tranche5: 700, tranche6: 800, tranche7: 900 },
      premium: { tranche1: 400, tranche2: 500, tranche3: 600, tranche4: 700, tranche5: 800, tranche6: 900, tranche7: 1000 },
      "premium+": { tranche1: 600, tranche2: 700, tranche3: 800, tranche4: 900, tranche5: 1000, tranche6: 1100, tranche7: 1200 },
    };

    if (!offer || surface <= 0 || distanceKm < 0) {
      console.warn("Paramètres invalides pour calculateMovingPrice");
      return 0;
    }

    const basePrice = getBasePriceBySurface(validOffer, surface);

    let priceWithDistance: number;
    if (distanceKm < 200) {
      priceWithDistance = basePrice + 100 + 0.4 * distanceKm * 2;
    } else {
      priceWithDistance = basePrice + 200 + 0.6 * distanceKm * 2;
    }

    const finalPrice = priceWithDistance * 1.5;
    return Math.round(finalPrice * 100) / 100;
  };

  const calculateTransportPrice = (distanceKm: number, volume: string): number => {
    const volumeValue = parseFloat(volume) || 0;
    const basePrice = 300;
    const pricePerKm = 3;
    const pricePerM3 = 10;
    const price = basePrice + (distanceKm * pricePerKm) + (volumeValue * pricePerM3);
    return Math.round(price * 100) / 100;
  };

  const fetchDevisNumber = async () => {
    const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
    const response = await fetch(`${API_URL}/api/next-number`);
    const data = await response.json();
    return data.devisNumber;
  };

  const handleSubmit = async () => {
    const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
    setLoading(true);

    try {
      const generatedNumber = await fetchDevisNumber();
      const finalDevis = { ...devisData, devisNumber: generatedNumber };

      const response = await fetch(`${API_URL}/api/devis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalDevis),
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await response.json();

      if (response.ok) {

        const data = { message: "Nouvelle demande de devis" };
        await fetch(`${API_URL}/api/new-devis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });


        toast({
          title: "Demande de devis envoyée !",
          description: "Nous vous recontacterons dans les plus brefs délais.",
        });


        // Réinitialiser le formulaire
        setDepartData({ surface: '', volume: '', rooms: '', floor: '', elevator: false, elevatorSize: '', stairsSize: '', address: '' });
        setArrivalData({ floor: '', elevator: false, elevatorSize: '', stairsSize: '', address: '', contactCivility: '', contactName: '', telContact: '', entreprise: '', date: '' });
        setDevisData({ civility: '', name: '', email: '', entreprise: '', telephone: '', service: '', offer: '', billingAddress: '', devisNumber: '', departure: departData, arrival: arrivalData, date: '', archived: false, inManagement: false, message: '', distance: '', duration: '', estimatedAmount: '', finalAmount: '', adjustmentReason: '', adjustmentAmount: '' });

        setTimeout(() => {
          setLoading(false);
          window.location.href = "/devis";
        }, 3000);

      } else {
        // Gestion de l'erreur HTTP
        console.error('Erreur serveur', response.status);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-40 mt-8 p-8">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <Button onClick={() => navigate(-1)} className="bg-gray-400 hover:bg-gray-500">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <h2 className="text-3xl font-bold text-[#001964] text-center mb-4"> Obtenez votre prix en 1 minute !</h2>
          <section className="pb-8 lg:pb-16 px-4 sm:px-8 lg:px-16">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl text-center">Demande de devis</CardTitle>
                <CardDescription className="text-md italic flex flex-col items-center">
                  <span>Remplissez le formulaire ci-dessous et obtenez une estimation instantanée en ligne.</span>
                  <span>Validez la demande et nous vous recontacterons rapidement.</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formErrors = validateForm();
                  if (Object.keys(formErrors).length > 0) {
                    Object.entries(formErrors).forEach(([field, message]) => {
                      setFieldError(field, message);
                    });
                    toast({
                      title: "Formulaire incomplet",
                      description: "Veuillez remplir tous les champs obligatoires",
                      variant: "destructive"
                    });
                  } else {
                    setConfirmOpen(true);
                  }
                }} className="space-y-4 lg:space-y-6">

                  {/* Section informations client */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="flex space-y-2">
                      <div className="w-[35%] me-4 mt-2">
                        <Label htmlFor="civility" className="text-lg font-bold">
                          Civilité
                        </Label>
                        <Select onValueChange={handleSelectCivility} value={devisData.civility}>
                          <SelectTrigger className={`text-sm lg:text-base ${errors.civility ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Civilité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mr.">Mr.</SelectItem>
                            <SelectItem value="Mme.">Mme.</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.civility && <p className="text-red-500 text-xs mt-1">{errors.civility}</p>}
                      </div>
                      <div className="w-full">
                        <Label htmlFor="name" className="text-lg font-bold">
                          Nom complet
                          <span className="text-gray-500 italic text-sm"> ( Nom, prénom ) </span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={devisData.name}
                          onChange={handleInputChange}
                          onBlur={() => setFieldTouched('name')}
                          placeholder="Votre nom et prénom"
                          className={`text-sm lg:text-base ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-bold">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={devisData.email}
                        onChange={handleInputChange}
                        onBlur={() => setFieldTouched('email')}
                        placeholder="votre@email.com"
                        className={`text-sm lg:text-base ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entreprise" className="text-lg font-bold">Entreprise
                        <span className="text-gray-500 italic text-sm"> ( Optionnel )</span>
                      </Label>
                      <Input
                        id="entreprise"
                        name="entreprise"
                        type="text"
                        value={devisData.entreprise}
                        onChange={handleInputChange}
                        placeholder="Nom de votre entreprise"
                        className="text-sm lg:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress" className="text-lg font-bold">
                        Adresse de facturation
                        <span className="text-gray-500 italic text-sm"> ( N°, rue, code postal, ville ) </span>
                      </Label>
                      <InputAdress
                        id="billingAddress"
                        name="billingAddress"
                        value={devisData.billingAddress}
                        onChange={(val) => setDevisData({ ...devisData, billingAddress: val })}
                        onValidAddress={setBillingAddressValid}
                        placeholder="Adresse de facturation"
                        className={`text-sm lg:text-base ${errors.billingAddress ? 'border-red-500' : ''}`}
                      />
                      {errors.billingAddress && (
                        <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="text-lg font-bold">Téléphone</Label>
                      <Input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={devisData.telephone}
                        onChange={handleInputChange}
                        onBlur={() => setFieldTouched('telephone')}
                        placeholder="+33 1 23 45 67 89"
                        className={`text-sm lg:text-base ${errors.telephone ? 'border-red-500' : ''}`}
                      />
                      {errors.telephone && touched.telephone && (
                        <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-lg font-bold">Service souhaité</Label>
                      <Select onValueChange={handleSelectChange} value={devisData.service}>
                        <SelectTrigger className="text-sm lg:text-base">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Demenagement">Service de déménagement</SelectItem>
                          <SelectItem value="transport">Service de transport marchandises</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-lg font-bold">Date souhaitée</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={devisData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}  // ← date du jour au format YYYY-MM-DD
                        onBlur={() => setFieldTouched('date')}
                        className={`text-sm lg:text-base flex justify-center ${errors.date ? 'border-red-500' : ''}`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                      )}
                    </div>

                    {devisData.service === "Demenagement" && (
                      <div className="space-y-2">
                        <Label htmlFor="offer" className="text-lg font-bold">Formule souhaitée</Label>
                        <Select onValueChange={handleSelectOfferChange} value={devisData.offer}>
                          <SelectTrigger className={`text-sm lg:text-base ${errors.offer ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Sélectionnez une offre de service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economique">Économique</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="premium+">Premium +</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.offer && <p className="text-red-500 text-xs mt-1">{errors.offer}</p>}
                        <Link className="italic text-[blue] underline" to="/offres" target="_blank">
                          Cliquez ici pour plus de détails sur nos offres !
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Section Départ */}
                  {devisData.service !== "" && (
                    <div className="">
                      <Label htmlFor="departure" className="text-lg font-bold">Informations au départ </Label>
                      <div className="px-4 py-2">
                        {devisData.service === "Demenagement" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                            <div className="mb-2">
                              <Label htmlFor="surface" className="text-lg">Surface</Label>
                              <Input
                                id="surface"
                                name="surface"
                                type="text"
                                value={departData.surface}
                                onChange={handleDepartInputChange}
                                onBlur={() => setFieldTouched('surface')}
                                placeholder="en m2"
                                className={`text-sm lg:text-base ${errors.surface ? 'border-red-500' : ''}`}
                              />
                              {errors.surface && (
                                <p className="text-red-500 text-xs mt-1">{errors.surface}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="floor" className="text-lg">N° d'étage</Label>
                              <Input
                                id="floor"
                                name="floor"
                                type="text"
                                value={departData.floor}
                                onChange={handleDepartInputChange}
                                placeholder="0"
                                className="text-sm lg:text-base"
                              />
                            </div>

                            <div className="mb-2">
                              <Label htmlFor="rooms" className="text-lg">Nombre de pièces</Label>
                              <Input
                                id="rooms"
                                name="rooms"
                                type="text"
                                value={departData.rooms}
                                onChange={handleDepartInputChange}
                                onBlur={() => setFieldTouched('rooms')}
                                placeholder="1"
                                className={`text-sm lg:text-base ${errors.rooms ? 'border-red-500' : ''}`}
                              />
                              {errors.rooms && (
                                <p className="text-red-500 text-xs mt-1">{errors.rooms}</p>
                              )}
                            </div>

                            {departData.floor && parseInt(departData.floor) > 0 && (
                              <>
                                <div>
                                  <Label htmlFor="elevator" className="text-lg">Ascenseur</Label>
                                  <div className="h-[40px] flex items-center justify-around">
                                    <div className="space-x-2 flex items-center h-[20px]">
                                      <Checkbox
                                        id="elevator"
                                        checked={departData.elevator}
                                        onCheckedChange={(checked) => {
                                          setDepartData(prev => ({
                                            ...prev,
                                            elevator: checked === true,
                                            // Optionnel : réinitialiser la taille si on décoche
                                            ...(checked === false ? { elevatorSize: '' } : {})
                                          }));
                                          // Effacer l'erreur si on décoche
                                          if (!checked) {
                                            clearFieldError('departElevatorSize');
                                          }
                                        }}
                                      />
                                      <label htmlFor="elevator" className="text-lg text-gray-700">
                                        Cochez si oui !
                                      </label>
                                    </div>

                                    {departData.elevator && (
                                      <div className="space-x-2">
                                        <Select
                                          onValueChange={(value) => {
                                            setDepartData((prev) => ({ ...prev, elevatorSize: value }));
                                            clearFieldError('departElevatorSize');
                                          }}
                                          value={departData.elevatorSize}
                                        >
                                          <SelectTrigger className={`text-sm lg:text-base ${errors.departElevatorSize ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Taille de l'ascenseur" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="2">2 personnes</SelectItem>
                                            <SelectItem value="3">3 personnes</SelectItem>
                                            <SelectItem value="4">4 personnes</SelectItem>
                                            <SelectItem value="5">5 pers. ou plus</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {errors.departElevatorSize && (
                                          <p className="text-red-500 text-xs mt-1">{errors.departElevatorSize}</p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="departStairsSize" className="text-lg">Escalier</Label>
                                  <Select
                                    onValueChange={handleSelectDepartStairsChange}
                                    value={departData.stairsSize}
                                  >
                                    <SelectTrigger className={`text-sm lg:text-base ${errors.departStairsSize ? 'border-red-500' : ''}`}>
                                      <SelectValue placeholder="Taille de l'escalier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="small">Petit</SelectItem>
                                      <SelectItem value="average">Moyen</SelectItem>
                                      <SelectItem value="wide">Large</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {errors.departStairsSize && (
                                    <p className="text-red-500 text-xs mt-1">{errors.departStairsSize}</p>
                                  )}
                                </div>
                              </>
                            )}

                            <div>
                              <Label htmlFor="departAddress" className="text-lg">
                                Adresse complète
                                <span className="text-gray-500 italic text-sm"> ( N°, rue, code postal, ville ) </span>
                              </Label>
                              <InputAdress
                                id="departAddress"
                                name="address"
                                value={departData.address}
                                onChange={(val) => setDepartData({ ...departData, address: val })}
                                onValidAddress={setDepartAddressValid}
                                placeholder="Adresse de départ"
                                className={`text-sm lg:text-base ${errors.departAddress ? 'border-red-500' : ''}`}
                                defaultValid={initialDepartureValid && departData.address === initialDevisData.departure}
                              />
                              {errors.departAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.departAddress}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {devisData.service === "transport" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                            <div className="mb-2">
                              <Label htmlFor="volume" className="text-lg">Volume</Label>
                              <Input
                                id="volume"
                                name="volume"
                                type="text"
                                value={departData.volume}
                                onChange={handleDepartInputChange}
                                onBlur={() => setFieldTouched('volume')}
                                placeholder="en m3"
                                className={`text-sm lg:text-base ${errors.volume && touched.volume ? 'border-red-500' : ''}`}
                              />
                              {errors.volume && (
                                <p className="text-red-500 text-xs mt-1">{errors.volume}</p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="departAddress" className="text-lg">Adresse complète</Label>
                              <InputAdress
                                id="departAddress"
                                name="address"
                                value={departData.address}
                                onChange={(val) => setDepartData({ ...departData, address: val })}
                                onValidAddress={setDepartAddressValid}
                                placeholder="Adresse de départ"
                                className={`text-sm lg:text-base ${errors.departAddress ? 'border-red-500' : ''}`}
                              />
                              {errors.departAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.departAddress}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Section Arrivée */}
                  {(devisData.service === "Demenagement" || devisData.service === "transport") && (
                    <div className="">
                      <Label htmlFor="arrival" className="text-lg font-bold">Informations à l'arrivée </Label>
                      <div className="px-4 py-2">
                        {devisData.service === "Demenagement" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                            <div className="mb-2">
                              <Label htmlFor="arrivalFloor" className="text-lg">N° d'étage</Label>
                              <Input
                                id="arrivalFloor"
                                name="floor"
                                type="text"
                                value={arrivalData.floor}
                                onChange={handleArrivalInputChange}
                                placeholder="0"
                                className="text-sm lg:text-base"
                              />
                            </div>

                            {arrivalData.floor && parseInt(arrivalData.floor) > 0 && (
                              <>
                                <div>
                                  <Label htmlFor="arrivalElevator" className="text-lg">Ascenseur</Label>
                                  <div className="h-[40px] flex items-center justify-around">
                                    <div className="space-x-2 flex h-[20px] items-center">
                                      <Checkbox
                                        id="arrivalElevator"
                                        checked={arrivalData.elevator}
                                        onCheckedChange={(checked) => {
                                          setArrivalData(prev => ({
                                            ...prev,
                                            elevator: checked === true,
                                            // Optionnel : réinitialiser la taille si on décoche
                                            ...(checked === false ? { elevatorSize: '' } : {})
                                          }));
                                          // Effacer l'erreur si on décoche
                                          if (!checked) {
                                            clearFieldError('arrivalElevatorSize');
                                          }
                                        }}
                                      />
                                      <label htmlFor="arrivalElevator" className="text-lg text-gray-700">
                                        Cochez si oui !
                                      </label>
                                    </div>

                                    {arrivalData.elevator && (
                                      <div className="space-x-2">
                                        <Select
                                          onValueChange={(value) => {
                                            setArrivalData((prev) => ({ ...prev, elevatorSize: value }));
                                            clearFieldError('arrivalElevatorSize');
                                          }}
                                          value={arrivalData.elevatorSize}
                                        >
                                          <SelectTrigger className={`text-sm lg:text-base ${errors.arrivalElevatorSize ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Taille de l'ascenseur" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="2">2 personnes</SelectItem>
                                            <SelectItem value="3">3 personnes</SelectItem>
                                            <SelectItem value="4">4 personnes</SelectItem>
                                            <SelectItem value="5">5 pers. ou plus</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        {errors.arrivalElevatorSize && (
                                          <p className="text-red-500 text-xs mt-1">{errors.arrivalElevatorSize}</p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="arrivalStairsSize" className="text-lg">Escalier</Label>
                                  <Select
                                    onValueChange={handleSelectArrivalStairsChange}
                                    value={arrivalData.stairsSize}
                                  >
                                    <SelectTrigger className={`text-sm lg:text-base ${errors.arrivalStairsSize ? 'border-red-500' : ''}`}>
                                      <SelectValue placeholder="Taille de l'escalier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="small">Petit</SelectItem>
                                      <SelectItem value="average">Moyen</SelectItem>
                                      <SelectItem value="wide">Large</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {errors.arrivalStairsSize && (
                                    <p className="text-red-500 text-xs mt-1">{errors.arrivalStairsSize}</p>
                                  )}
                                </div>
                              </>
                            )}

                            <div>
                              <Label htmlFor="arrivalAddress" className="text-lg">
                                Adresse complète
                                <span className="text-gray-500 italic text-sm"> ( N°, rue, code postal, ville ) </span>
                              </Label>
                              <InputAdress
                                id="arrivalAddress"
                                name="address"
                                value={arrivalData.address}
                                onChange={(val) => setArrivalData({ ...arrivalData, address: val })}
                                onValidAddress={setArrivalAddressValid}
                                placeholder="Adresse d'arrivée"
                                className={`text-sm lg:text-base ${errors.arrivalAddress ? 'border-red-500' : ''}`}
                                defaultValid={initialArrivalValid && arrivalData.address === initialDevisData.arrival}
                              />
                              {errors.arrivalAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.arrivalAddress}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {devisData.service === "transport" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                            <div className="mb-2">
                              <Label htmlFor="arrivalEntreprise" className="text-lg">Entreprise</Label>
                              <Input
                                id="arrivalEntreprise"
                                name="entreprise"
                                type="text"
                                value={arrivalData.entreprise}
                                onChange={handleArrivalInputChange}
                                placeholder="Nom de l'entreprise à l'arrivée"
                                className="text-sm lg:text-base"
                              />
                            </div>

                            <div className="flex">
                              <div className="w-[35%] me-4">
                                <Label htmlFor="contactCivility" className="text-lg">
                                  Civilité
                                </Label>
                                <Select onValueChange={handlecontactCivility} value={arrivalData.contactCivility}>
                                  <SelectTrigger className={`text-sm lg:text-base ${errors.contactCivility ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Civilité" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Mr.">Mr.</SelectItem>
                                    <SelectItem value="Mme.">Mme.</SelectItem>
                                  </SelectContent>
                                </Select>
                                {errors.contactCivility && <p className="text-red-500 text-xs mt-1">{errors.contactCivility}</p>}
                              </div>
                              <div className="w-full">
                                <Label htmlFor="contactName" className="text-lg">Nom du contact</Label>
                                <Input
                                  id="contactName"
                                  name="contactName"
                                  type="text"
                                  value={arrivalData.contactName}
                                  onChange={handleArrivalInputChange}
                                  onBlur={() => setFieldTouched('contactName')}
                                  placeholder="Nom du contact à l'arrivée"
                                  className={`text-sm lg:text-base ${errors.contactName && touched.contactName ? 'border-red-500' : ''}`}
                                />
                                {errors.contactName && touched.contactName && (
                                  <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="telContact" className="text-lg">Téléphone du contact</Label>
                              <Input
                                id="telContact"
                                name="telContact"
                                type="tel"
                                value={arrivalData.telContact}
                                onChange={handleArrivalInputChange}
                                onBlur={() => setFieldTouched('telContact')}
                                placeholder="+33 1 23 45 67 89"
                                className={`text-sm lg:text-base ${errors.telContact && touched.telContact ? 'border-red-500' : ''}`}
                              />
                              {errors.telContact && touched.telContact && (
                                <p className="text-red-500 text-xs mt-1">{errors.telContact}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="arrivalAddress" className="text-lg">Adresse</Label>
                              <InputAdress
                                id="arrivalAddress"
                                name="address"
                                value={arrivalData.address}
                                onChange={(val) => setArrivalData({ ...arrivalData, address: val })}
                                onValidAddress={setArrivalAddressValid}
                                placeholder="Adresse d'arrivée"
                                className={`text-sm lg:text-base ${errors.arrivalAddress ? 'border-red-500' : ''}`}
                              />
                              {errors.arrivalAddress && (
                                <p className="text-red-500 text-xs mt-1">{errors.arrivalAddress}</p>
                              )}
                            </div>

                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-col-1">
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-lg font-bold">Précision(s) ou information(s) complémentaire(s)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={devisData.message}
                        onChange={handleInputChange}
                        placeholder="Mobilier très lourd (ex: Piano), accès difficiles, etc..."
                        rows={5}
                        className="text-sm lg:text-base"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleEstimate}
                    className="w-full bg-[#001964] hover:bg-[#001964]/90 text-lg"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Estimez votre demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>


          <ConfirmDevisDialog
            open={confirmOpen}
            loading={calculationLoading}
            devis={devisData}
            title="Récapitulatif de la demande"
            description="Veuillez vérifier vos informations avant de valider."
            confirmText="Validez et envoyez"
            cancelText="Annulez la demande"
            onConfirm={async () => {
              await handleSubmit();
              setConfirmOpen(false);
            }}
            onCancel={() => setConfirmOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default FormulaireDevis;