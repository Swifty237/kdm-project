
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputAdress from '@/components/InputAdress';
import { Textarea } from '@/components/ui/textarea';

const FormulaireDevis = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Récupère les données transmises depuis Accueil
  const initialDevisData = location.state?.devisData || {};

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
    message: ""
  });

  // Synchronise les sous-objets départ/arrivée avec devisData
  useEffect(() => {
    setDevisData(prev => ({
      ...prev,
      departure: departData,
      arrival: arrivalData,
    }));
  }, [departData, arrivalData]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDevisData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setDepartData(prev => {
      const updated = { ...prev, [name]: value };
      setDevisData(d => ({ ...d, departure: updated }));
      return updated;
    });
  };


  const handleArrivalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setArrivalData(prev => {
      const updated = { ...prev, [name]: value };
      setDevisData(d => ({ ...d, arrival: updated }));
      return updated;
    });
  };


  const handleSelectChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSelectOfferChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      offer: value
    }));
  };



  const handleSelectDepartStairsChange = (value: string) => {
    setDepartData(prev => ({
      ...prev,
      stairsSize: value
    }));
  };


  const handleSelectArrivalStairsChange = (value: string) => {
    setArrivalData(prev => ({
      ...prev,
      stairsSize: value
    }));
  };

  const fetchDevisNumber = async () => {
    const API_URL = import.meta.env.VITE_KDM_SERVER_URI;
    const response = await fetch(`${API_URL}/api/next-number`);
    const data = await response.json();
    return data.devisNumber;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_KDM_SERVER_URI; // pour Vite

    console.log('Données du formulaire:', devisData);


    try {

      // Générer le numéro automatiquement
      const generatedNumber = await fetchDevisNumber();

      const finalDevis = {
        ...devisData,
        devisNumber: generatedNumber,
      };

      const response = await fetch(`${API_URL}/api/devis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalDevis),
      });


      const result = await response.json();

      toast({
        title: "Demande de devis envoyée !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });

      if (response.ok) {
        // alert("Message envoyé avec succès !");

        setDepartData({
          surface: '',
          volume: '',
          rooms: '',
          floor: '',
          elevator: false,
          elevatorSize: '',
          stairsSize: '',
          address: ''
        })

        setArrivalData({
          floor: '',
          elevator: false,
          elevatorSize: '',
          stairsSize: '',
          address: '',
          contactName: '',
          telContact: '',
          entreprise: '',
          date: ''
        })

        setDevisData({
          name: '',
          email: '',
          entreprise: '',
          telephone: '',
          service: '',
          offer: '',
          billingAddress: '',
          devisNumber: '',
          departure: {
            surface: '',
            volume: '',
            rooms: '',
            floor: '',
            elevator: false,
            elevatorSize: '',
            stairsSize: '',
            address: ''
          },
          arrival: {
            floor: '',
            elevator: false,
            elevatorSize: '',
            stairsSize: '',
            address: '',
            contactName: '',
            telContact: '',
            entreprise: '',
            date: ''
          },
          date: '',
          archived: false,
          message: ''
        });
      } else {
        alert("Erreur : " + result.error);
      }
    } catch (err) {
      console.error(err);
      // alert("Erreur réseau lors de l'envoi du message.");
    }
  };


  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-end mb-8">
        <Button onClick={() => navigate(-1)} className="bg-gray-400 hover:bg-gray-500">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <section className="pb-8 lg:pb-16 px-4 sm:px-8 lg:px-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl text-[#001964]">Demande de devis</CardTitle>
            <CardDescription className="text-lg italic">
              Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-bold">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={devisData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom et prénom"
                    className="text-sm lg:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-bold">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={devisData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    className="text-sm lg:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entreprise" className="text-lg font-bold">Entreprise </Label>
                  <span className="italic text-[#636e72]">(* Si vous nous contactez pour le compte d'une entreprise)</span>
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
                  <Label htmlFor="billingAddress" className="text-lg font-bold">Adresse de facturation</Label>
                  <InputAdress
                    id="billingAddress"
                    name="billingAddress"
                    required
                    value={devisData.billingAddress}
                    onChange={(val) => setDevisData({ ...devisData, billingAddress: val })}
                    placeholder="Adresse de facturation"
                    className="text-sm lg:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-lg font-bold">Téléphone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    required
                    value={devisData.telephone}
                    onChange={handleInputChange}
                    placeholder="+33 1 23 45 67 89"
                    className="text-sm lg:text-base"
                  />
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
                      className="text-sm lg:text-base flex justify-center w-[46%]"
                    />
                  </div>
                </div>

                {devisData.service === "Demenagement" && (
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-lg font-bold">Formule souhaitée</Label>
                    <Select onValueChange={handleSelectOfferChange} value={devisData.offer}>
                      <SelectTrigger className="text-sm lg:text-base">
                        <SelectValue placeholder="Sélectionnez une offre de service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economique">Économique</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="premium+">Premium +</SelectItem>
                      </SelectContent>
                    </Select>
                    <Link className="italic text-[blue] underline" to="/offres" target="_blank" rel="noopener noreferrer">
                      Cliquez ici pour plus de détails sur nos offres !
                    </Link>
                  </div>
                )}

              </div>

              <div className="">
                {devisData.service !== "" && (
                  <Label htmlFor="departure" className="text-lg font-bold">Informations au départ </Label>
                )}
                <div className="px-4 py-2">

                  {/* Déménagement */}
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
                          placeholder="en m2"
                          className="text-sm lg:text-base"
                        />
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
                          placeholder="1"
                          className="text-sm lg:text-base"
                        />
                      </div>

                      {departData.floor && departData.floor !== "0" && (
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
                                      elevator: checked === true
                                    }));

                                    setDevisData(prev => ({
                                      ...prev,
                                      departure: departData
                                    }));
                                  }}
                                />
                                <label
                                  htmlFor="elevator"
                                  className="text-lg text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Cochez si oui !
                                </label>
                              </div>

                              {departData.elevator && (
                                <div className="space-x-2">
                                  <Select
                                    onValueChange={(value) =>
                                      setDepartData((prev) => ({ ...prev, elevatorSize: value }))
                                    }
                                    value={departData.elevatorSize}
                                  >
                                    <SelectTrigger className="text-sm lg:text-base">
                                      <SelectValue placeholder="Taille de l'ascenceur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2">2 personnes</SelectItem>
                                      <SelectItem value="3">3 personnes</SelectItem>
                                      <SelectItem value="4">4 personnes</SelectItem>
                                      <SelectItem value="5">5 pers. ou plus</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="departStairsSize" className="text-lg">Escalier</Label>
                            <Select onValueChange={handleSelectDepartStairsChange} value={departData.stairsSize}>
                              <SelectTrigger className="text-sm lg:text-base">
                                <SelectValue placeholder="Taille de l'escalier" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Petit</SelectItem>
                                <SelectItem value="average">Moyen</SelectItem>
                                <SelectItem value="wide">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      <div>

                        <Label htmlFor="address" className="text-lg">Adresse</Label>
                        <InputAdress
                          id="address"
                          name="address"
                          required
                          value={departData.address}
                          onChange={(val) => setDepartData({ ...departData, address: val })}
                          placeholder="Adresse de départ"
                          className="text-sm lg:text-base"
                        />

                      </div>
                    </div>
                  )}

                  {/* Transport */}
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
                          placeholder="en m3"
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-lg">Adresse</Label>
                        <InputAdress
                          id="address"
                          name="address"
                          required
                          value={departData.address}
                          onChange={(val) => setDepartData({ ...departData, address: val })}
                          placeholder="Adresse de départ"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {(devisData.service === "Demenagement" || devisData.service === "transport") && (
                <div className="">
                  <Label htmlFor="departure" className="text-lg font-bold">Informations à l'arrivée </Label>
                  <div className="px-4 py-2">

                    {/* Démémnagement */}
                    {devisData.service === "Demenagement" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        <div className="mb-2">
                          <Label htmlFor="floor" className="text-lg">N° d'étage</Label>
                          <Input
                            id="floor"
                            name="floor"
                            type="text"
                            value={arrivalData.floor}
                            onChange={handleArrivalInputChange}
                            placeholder="0"
                            className="text-sm lg:text-base"
                          />
                        </div>

                        {arrivalData.floor && arrivalData.floor !== "0" && (
                          <>
                            <div>
                              <Label htmlFor="elevator" className="text-lg">Ascenceur</Label>

                              <div className="h-[40px] flex items-center justify-around">
                                <div className="space-x-2 flex h-[20px] items-center">
                                  <Checkbox
                                    id="elevator"
                                    checked={arrivalData.elevator}
                                    onCheckedChange={(checked) => {
                                      setArrivalData(prev => ({
                                        ...prev,
                                        elevator: checked === true
                                      }));

                                      setDevisData(prev => ({
                                        ...prev,
                                        arrival: arrivalData
                                      }));
                                    }}
                                  />
                                  <label
                                    htmlFor="elevator"
                                    className="text-lg text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Cochez si oui !
                                  </label>
                                </div>

                                {arrivalData.elevator && (
                                  <div className="space-x-2">
                                    <Select
                                      onValueChange={(value) =>
                                        setArrivalData((prev) => ({ ...prev, elevatorSize: value }))
                                      }
                                      value={arrivalData.elevatorSize}
                                    >
                                      <SelectTrigger className="text-sm lg:text-base">
                                        <SelectValue placeholder="Taille de l'ascenceur" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="2">2 personnes</SelectItem>
                                        <SelectItem value="3">3 personnes</SelectItem>
                                        <SelectItem value="4">4 personnes</SelectItem>
                                        <SelectItem value="5">5 pers. ou plus</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="arrivalStairsSize" className="text-lg">Escalier</Label>
                              <Select onValueChange={handleSelectArrivalStairsChange} value={arrivalData.stairsSize}>
                                <SelectTrigger className="text-sm lg:text-base">
                                  <SelectValue placeholder="Taille de l'escalier" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Petit</SelectItem>
                                  <SelectItem value="average">Moyen</SelectItem>
                                  <SelectItem value="wide">Large</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}

                        <div>
                          <Label htmlFor="address" className="text-lg">Adresse</Label>
                          <InputAdress
                            id="address"
                            name="address"
                            type="text"
                            value={arrivalData.address}
                            onChange={(val) => setArrivalData({ ...arrivalData, address: val })}
                            placeholder="34 Rue de l'Arrivée 76000 Rouen"
                            className="text-sm lg:text-base"
                          />
                        </div>
                      </div>
                    )}

                    {/* Transport */}
                    {devisData.service === "transport" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        <div className="mb-2">
                          <Label htmlFor="entreprise" className="text-lg">Entreprise </Label>
                          <Input
                            id="entreprise"
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
                            required
                            value={arrivalData.contactName}
                            onChange={handleArrivalInputChange}
                            placeholder="Nom du contact à l'arrivée"
                            className="text-sm lg:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telContact" className="text-lg">Téléphone du contact</Label>
                          <Input
                            id="telContact"
                            name="telContact"
                            type="tel"
                            value={arrivalData.telContact}
                            onChange={handleInputChange}
                            placeholder="+33 1 23 45 67 89"
                            className="text-sm lg:text-base"
                          />
                        </div>

                        <div>
                          <Label htmlFor="address" className="text-lg">Adresse</Label>
                          <InputAdress
                            id="address"
                            name="address"
                            type="text"
                            value={arrivalData.address}
                            onChange={(val) => setArrivalData({ ...arrivalData, address: val })}
                            placeholder="34 Rue de l'Arrivée 76000 Rouen"
                            className="text-sm lg:text-base"
                          />
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
              <Button type="submit" className="w-full bg-[#001964] hover:bg-[#001964]/90 text-lg" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Envoyer la demande
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FormulaireDevis;
