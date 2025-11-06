
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const FormulaireDevis = () => {

  const [departElevator, setDepartElevator] = useState(false);

  const [arrivalElevator, setArrivalElevator] = useState(false);

  const [departData, setDepartData] = useState({
    surface: '',
    volume: '',
    rooms: '',
    floor: '',
    elevator: departElevator,
    elevatorSize: '',
    stairsSize: '',
    address: ''
  })

  const [arrivalData, setArrivalData] = useState({
    floor: '',
    elevator: arrivalElevator,
    elevatorSize: '',
    stairsSize: '',
    address: '',
    name: '',
    entreprise: '',
    date: ''
  })

  const [devisData, setDevisData] = useState({
    name: '',
    email: '',
    entreprise: '',
    telephone: '',
    service: '',
    departure: {
      surface: departData.surface,
      volume: departData.volume,
      rooms: departData.rooms,
      floor: departData.floor,
      elevator: departData.elevator,
      elevatorSize: departData.elevatorSize,
      stairsSize: departData.stairsSize,
      address: departData.address
    },
    arrival: {
      floor: arrivalData.floor,
      elevator: arrivalData.elevator,
      elevatorSize: arrivalData.elevatorSize,
      stairsSize: arrivalData.stairsSize,
      address: arrivalData.address,
      name: arrivalData.name,
      entreprise: arrivalData.entreprise,
      date: arrivalData.date
    },
    date: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDevisData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDepartData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrivalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArrivalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSelectDepartStairsChange = (value: string) => {
    setDepartData(prev => ({
      ...prev,
      stairsSize: value
    }));
  };


  const handleSelectArrivalStairsChange = (value: string) => {
    setDevisData(prev => ({
      ...prev,
      stairsSize: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_KDM_SERVER_URI; // pour Vite

    console.log('Données du formulaire:', devisData);


    try {
      const response = await fetch(`${API_URL}/api/devis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(devisData),
      });


      const result = await response.json();

      // toast({
      //   title: "Message envoyé !",
      //   description: "Nous vous recontacterons dans les plus brefs délais.",
      // });

      if (response.ok) {
        // alert("Message envoyé avec succès !");
        setDepartElevator(false);
        setArrivalElevator(false);

        setDepartData({
          surface: '',
          volume: '',
          rooms: '',
          floor: '',
          elevator: departElevator,
          elevatorSize: '',
          stairsSize: '',
          address: ''
        })

        setArrivalData({
          floor: '',
          elevator: arrivalElevator,
          elevatorSize: '',
          stairsSize: '',
          address: '',
          name: '',
          entreprise: '',
          date: ''
        })

        setDevisData({
          name: '',
          email: '',
          entreprise: '',
          telephone: '',
          service: '',
          departure: {
            surface: '',
            volume: '',
            rooms: '',
            floor: '',
            elevator: departData.elevator,
            elevatorSize: '',
            stairsSize: '',
            address: ''
          },
          arrival: {
            floor: '',
            elevator: arrivalData.elevator,
            elevatorSize: '',
            stairsSize: '',
            address: '',
            name: '',
            entreprise: '',
            date: ''
          },
          date: '',
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
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl text-[#001964]">Demande de devis</CardTitle>
            <CardDescription className="text-sm lg:text-base">
              Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm lg:text-base font-bold">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={devisData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    className="text-sm lg:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm lg:text-base font-bold">Email *</Label>
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
                  <Label htmlFor="entreprise" className="text-sm lg:text-base font-bold">Entreprise </Label>
                  <span className="text-sm italic text-[#636e72]">(* Si vous nous contactez pour le compte d'une entreprise)</span>
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
                  <Label htmlFor="telephone" className="text-sm lg:text-base font-bold">Téléphone</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={devisData.telephone}
                    onChange={handleInputChange}
                    placeholder="+33 1 23 45 67 89"
                    className="text-sm lg:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm lg:text-base font-bold">Service souhaité</Label>
                  <Select onValueChange={handleSelectChange} value={devisData.service}>
                    <SelectTrigger className="text-sm lg:text-base">
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Demenagement">Service de déménagement</SelectItem>
                      <SelectItem value="transport">Service de transport marchandises</SelectItem>
                      <SelectItem value="nettoyage">Service de nettoyage et rangement</SelectItem>
                      <SelectItem value="renovation">Service de peinture et rénovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm lg:text-base font-bold">Date souhaitée</Label>
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
              </div>

              <div className="">
                {devisData.service !== "" && (
                  <Label htmlFor="departure" className="text-sm lg:text-base font-bold">Informations au départ </Label>
                )}
                <div className="px-4 py-2">

                  {/* Déménagement */}
                  {devisData.service === "Demenagement" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div className="mb-2">
                        <Label htmlFor="surface" className="text-sm">Surface</Label>
                        <Input
                          id="surface"
                          name="surface"
                          type="text"
                          value={departData.surface}
                          onChange={handleDepartInputChange}
                          placeholder="80 m2"
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="floor" className="text-sm">N° d'étage</Label>
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
                        <Label htmlFor="rooms" className="text-sm">Nombre de pièces</Label>
                        <Input
                          id="rooms"
                          name="rooms"
                          type="text"
                          value={departData.rooms}
                          onChange={handleDepartInputChange}
                          placeholder="4"
                          className="text-sm lg:text-base"
                        />
                      </div>

                      {departData.floor && departData.floor !== "0" && (
                        <div>
                          <Label htmlFor="elevator" className="text-sm">Ascenceur</Label>
                          <div className="h-[40px] flex items-center justify-around">
                            <div className="space-x-2">
                              <Checkbox
                                id="elevator"
                                checked={departElevator}
                                onCheckedChange={(checked) => setDepartElevator(checked === true)}
                              />
                              <label
                                htmlFor="elevator"
                                className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Oui
                              </label>
                            </div>

                            {departElevator && (
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
                      )}


                      <div>
                        <Label htmlFor="departStairsSize" className="text-sm">Escalier</Label>
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
                      <div>
                        <Label htmlFor="address" className="text-sm">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={departData.address}
                          onChange={handleDepartInputChange}
                          placeholder="123 Rue de Départ 75010 Paris"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>
                  )}

                  {/* Transport */}
                  {devisData.service === "transport" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div className="mb-2">
                        <Label htmlFor="volume" className="text-sm">Volume</Label>
                        <Input
                          id="volume"
                          name="volume"
                          type="text"
                          value={devisData.departure.volume}
                          onChange={handleDepartInputChange}
                          placeholder="20 m3"
                          className="text-sm lg:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address" className="text-sm">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={devisData.departure.address}
                          onChange={handleDepartInputChange}
                          placeholder="123 Rue de Départ 75010 Paris"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>
                  )}

                  {/* Nettoyage et rénovation */}
                  {(devisData.service === "nettoyage" || devisData.service === "renovation") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                      <div>
                        <Label htmlFor="address" className="text-sm">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={devisData.departure.address}
                          onChange={handleInputChange}
                          placeholder="123 Rue de Départ 75010 Paris"
                          className="text-sm lg:text-base"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(devisData.service === "Demenagement" || devisData.service === "transport") && (
                <div className="">
                  <Label htmlFor="departure" className="text-sm lg:text-base font-bold">Informations à l'arrivée </Label>
                  <div className="px-4 py-2">

                    {/* Démémnagement */}
                    {devisData.service === "Demenagement" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        <div className="mb-2">
                          <Label htmlFor="floor" className="text-sm">N° d'étage</Label>
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
                          <div>
                            <Label htmlFor="elevator" className="text-sm">Ascenceur</Label>

                            <div className="h-[40px] flex items-center justify-around">
                              <div className="space-x-2">
                                <Checkbox
                                  id="elevator"
                                  checked={arrivalElevator}
                                  onCheckedChange={(checked) => setArrivalElevator(checked === true)}
                                />
                                <label
                                  htmlFor="elevator"
                                  className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Oui
                                </label>
                              </div>

                              {arrivalElevator && (
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
                        )}


                        <div>
                          <Label htmlFor="arrivalStairsSize" className="text-sm">Escalier</Label>
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
                        <div>
                          <Label htmlFor="address" className="text-sm">Adresse</Label>
                          <Input
                            id="address"
                            name="address"
                            type="text"
                            value={arrivalData.address}
                            onChange={handleArrivalInputChange}
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
                          <Label htmlFor="entreprise" className="text-sm lg:text-base font-bold">Entreprise </Label>
                          <Input
                            id="entreprise"
                            name="entreprise"
                            type="text"
                            value={devisData.arrival.entreprise}
                            onChange={handleArrivalInputChange}
                            placeholder="Nom de l'entreprise à l'arrivée"
                            className="text-sm lg:text-base"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nom" className="text-sm lg:text-base font-bold">Nom du contact</Label>
                          <Input
                            id="nom"
                            name="nom"
                            type="text"
                            required
                            value={devisData.arrival.name}
                            onChange={handleArrivalInputChange}
                            placeholder="Nom du contact à l'arrivée"
                            className="text-sm lg:text-base"
                          />
                        </div>

                        <div>
                          <Label htmlFor="address" className="text-sm">Adresse</Label>
                          <Input
                            id="address"
                            name="address"
                            type="text"
                            value={devisData.arrival.address}
                            onChange={handleArrivalInputChange}
                            placeholder="34 Rue de l'Arrivée 76000 Rouen"
                            className="text-sm lg:text-base"
                          />
                        </div>

                        <div>
                          <Label htmlFor="date" className="text-sm lg:text-base font-bold">Date d'arrivée souhaitée</Label>
                          <div className="w-full flex justify-center">
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              value={devisData.arrival.date}
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
              <Button type="submit" className="w-full bg-[#001964] hover:bg-[#001964]/90 text-sm lg:text-base" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FormulaireDevis;
