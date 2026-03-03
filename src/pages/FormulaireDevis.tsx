import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Send, X } from 'lucide-react';
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

  // Hook de validation
  const { errors, touched, setFieldTouched, setFieldError, clearFieldError } = useFormValidation();

  // Récupérez votre clé API Google Maps depuis les variables d'environnement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Récupère les données transmises depuis Accueil
  const initialDevisData = location.state?.devisData || {};

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
    contactName: "",
    telContact: "",
    entreprise: "",
    date: initialDevisData.date || "",
  });

  const [devisData, setDevisData] = useState({
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

    // Champs toujours obligatoires
    if (!devisData.name) newErrors.name = "Le nom est requis";
    if (!devisData.email) newErrors.email = "L'email est requis";
    if (!devisData.telephone) newErrors.telephone = "Le téléphone est requis";
    if (!devisData.date) newErrors.date = "La date est requise";
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

      // Validation ascenceur départ
      if (departData.elevator && !departData.elevatorSize) {
        newErrors.departElevatorSize = "La taille de l'ascenseur est requise";
      }

      // Validation étage arrivée
      if (arrivalData.floor && parseInt(arrivalData.floor) > 0) {
        if (!arrivalData.stairsSize) newErrors.arrivalStairsSize = "La taille de l'escalier est requise";
      }

      // Validation ascenceur arrivée
      if (arrivalData.elevator && !arrivalData.elevatorSize) {
        newErrors.arrivalElevatorSize = "La taille de l'ascenseur est requise";
      }
    }

    if (devisData.service === "transport") {
      if (!departData.volume) newErrors.volume = "Le volume est requis";
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

  const fetchDevisNumber = async () => {
    const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
    const response = await fetch(`${API_URL}/api/next-number`);
    const data = await response.json();
    return data.devisNumber;
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

    try {
      console.log('📍 Calcul de distance entre:', departData.address, 'et', arrivalData.address);

      // Calculer la distance - PLUS DE PARAMÈTRE API KEY
      const distanceResult = await calculateDistance(
        departData.address,
        arrivalData.address
      );

      console.log('✅ Résultat distance:', distanceResult);

      if (!distanceResult || distanceResult.status !== 'OK') {
        toast({
          title: "Erreur de calcul",
          description: "Impossible de calculer la distance entre les adresses",
          variant: "destructive"
        });
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

      setDevisData(prev => ({
        ...prev,
        estimatedAmount: estimatedAmount.toFixed(2),
        distance: distanceText,
        duration: durationText,
      }));

      toast({
        title: "Estimation calculée",
        description: `Distance: ${distanceText} | Durée: ${durationText} | Estimation: ${estimatedAmount}€`,
      });

    } catch (error) {
      console.error("❌ Erreur lors du calcul de distance:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du calcul de la distance",
        variant: "destructive"
      });
    }
  };

  // Fonctions de calcul (inchangées)
  const calculateMovingPrice = (offer: string, surface: number, distanceKm: number): number => {
    let basePrice = 0;
    switch (offer) {
      case "economique": basePrice = 790; break;
      case "standard": basePrice = 990; break;
      case "premium": basePrice = 1790; break;
      case "premium+": basePrice = 2190; break;
      default: basePrice = 0;
    }
    let price = basePrice;
    if (surface > 50) price += (surface - 50) * 7;
    if (distanceKm > 100) price += (distanceKm - 100) * 0.3;
    return Math.round(price * 100) / 100;
  };

  const calculateTransportPrice = (distanceKm: number, volume: string): number => {
    const volumeValue = parseFloat(volume) || 0;
    const basePrice = 300;
    const pricePerKm = 1.5;
    const pricePerM3 = 50;
    const price = basePrice + (distanceKm * pricePerKm) + (volumeValue * pricePerM3);
    return Math.round(price * 100) / 100;
  };

  const handleSubmit = async () => {
    const API_URL = import.meta.env.VITE_KDM_SERVER_URI;

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

      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });

      if (response.ok) {
        const data = { message: "Nouvelle demande de devis" };
        await fetch(`${API_URL}/api/new-devis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        // Réinitialiser le formulaire
        setDepartData({ surface: '', volume: '', rooms: '', floor: '', elevator: false, elevatorSize: '', stairsSize: '', address: '' });
        setArrivalData({ floor: '', elevator: false, elevatorSize: '', stairsSize: '', address: '', contactName: '', telContact: '', entreprise: '', date: '' });
        setDevisData({ name: '', email: '', entreprise: '', telephone: '', service: '', offer: '', billingAddress: '', devisNumber: '', departure: departData, arrival: arrivalData, date: '', archived: false, inManagement: false, message: '', distance: '', duration: '', estimatedAmount: '', finalAmount: '', adjustmentReason: '', adjustmentAmount: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end">
        <Button onClick={() => navigate(-1)} className="bg-gray-400 hover:bg-gray-500">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <h2 className="text-3xl font-bold text-[#001964] text-center mb-4">Obtenez un devis en un clic !</h2>
      <section className="pb-8 lg:pb-16 px-4 sm:px-8 lg:px-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl">Demande de devis</CardTitle>
            <CardDescription className="text-lg italic">
              <span className="mr-1">Remplissez le formulaire ci-dessous et obtenez une estimation rapide.</span>
              <span>Validez la demande et nous vous recontacterons rapidement</span>
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
                <div className="space-y-2">
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
                  <div className="w-full flex justify-center">
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={devisData.date}
                      onChange={handleInputChange}
                      onBlur={() => setFieldTouched('date')}
                      className={`text-sm lg:text-base flex justify-center w-[46%] ${errors.date ? 'border-red-500' : ''}`}
                    />
                  </div>
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
                              <Label htmlFor="elevator" className="text-lg">Ascenceur</Label>
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
                          {errors.volume && touched.volume && (
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
                              <Label htmlFor="arrivalElevator" className="text-lg">Ascenceur</Label>
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

                        <div>
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

                        <div>
                          <Label htmlFor="arrivalDate" className="text-lg">Date d'arrivée souhaitée</Label>
                          <div className="w-full flex justify-center">
                            <Input
                              id="arrivalDate"
                              name="date"
                              type="date"
                              value={arrivalData.date}
                              onChange={handleArrivalInputChange}
                              className="text-sm lg:text-base flex justify-center w-[46%]"
                            />
                          </div>
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
    </div>
  );
};

export default FormulaireDevis;