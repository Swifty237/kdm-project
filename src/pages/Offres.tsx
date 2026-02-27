
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Info, Minus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Offres = () => {
  const [activeColumn, setActiveColumn] = useState(0);
  const { toast } = useToast();

  const offers = ["Économique", "Standard", "Premium", "Premium +"];

  const tableData = [
    {
      label: "Chargement - Transport - Livraison",
      values: [true, true, true, true]
    },
    {
      label: "Protection du mobilier sous couvertures",
      values: [true, true, true, true]
    },
    {
      label: "Protection de la literie sous housses",
      values: [true, true, true, true]
    },
    {
      label: "Protection de la HI-FI et de l'électronique",
      values: [true, true, true, true]
    },
    {
      label: "Emballage des vêtements sur cintres en penderies",
      values: [true, true, true, true]
    },
    {
      label: "Emballage et protection des objets fragiles",
      values: [false, true, true, true]
    },
    {
      label: "Emballage et protection de la vaisselle fragile",
      values: [false, true, true, true]
    },
    {
      label: "Démontage et remontage du mobilier non fixé au mur",
      values: [false, false, true, true]
    },
    {
      label: "Décrochage mural (hors électricité et vissé)",
      values: [false, false, true, true]
    },
    {
      label: "Emballage des objets non fragiles",
      values: [false, false, true, true]
    },
    {
      label: "Emballage des vêtements non sur cintres",
      values: [false, false, true, true]
    },
    {
      label: "Frais de stationnement",
      values: [false, false, true, true]
    },
    {
      label: "Ménage du lieu de départ après le déménagement",
      values: [false, false, true, true]
    },
    {
      label: "Déballage et rangement de l'ensemble des objets, du mobilier et des vêtements selon vos instructions",
      values: [false, false, false, true]
    },
    {
      label: "Enlèvement des encombrants à jeter en déchetterie",
      values: [false, false, false, true]
    },
    {
      label: "Ménage du lieu de destination après l'emménagement",
      values: [false, false, false, true]
    }
  ];


  const values = [
    {
      title: "Économique",
      description: "L’essentiel au meilleur prix : un déménagement malin sans dépasser votre budget. Nos déménageurs protègent votre gros mobilier et prennent en charge l’intégralité du transport."
    },
    {
      title: "Standard",
      description: "Un accompagnement équilibré : nous nous occupons de l’intégralité du transport ainsi que de la protection du gros mobilier et des objets fragiles, vous gérez le reste de l’emballage."
    },
    {
      title: "Premium",
      description: "Le confort sans compromis : nous prenons en charge l’ensemble du déménagement, de l’emballage au déchargement, et effectuons même le ménage du logement de départ pour un déménagement totalement serein."
    },
    {
      title: "Premium avec option emménagement",
      description: "Le service clé en main ultime : en plus d’un déménagement complet, nous installons vos meubles, remettons votre nouveau logement en ordre et réalisons le ménage du nouveau logement pour une installation sans le moindre effort."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "",
        description: (
          <div className="text-lg">
            <span className="block font-bold text-xl mb-2">🚚 Offre de lancement – Profitez-en !</span>
            Bénéficiez de <span className="font-bold">100 € de réduction</span> sur votre déménagement pour toute demande de devis envoyée avant le <span className="font-bold">31/03/2026</span>.
            <br />
            <span> 👉 La remise ne sera pas visible sur l'estimation en ligne, mais elle sera bien appliquée sur le devis final envoyé par e-mail.</span>
            <div className="flex bg-[#001964] justify-center rounded mt-2">
              <span className="italic text-white">Offre valable avec toutes nos formules.</span>
            </div>
          </div>
        ),
        duration: 10000,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Header */}
      <section className="flex flex-col items-center justify-between header-section-bg-animated px-4 sm:px-8 lg:px-32 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001964] my-4">
              Déménagement
            </h1>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001964] text-center mb-12">Choisissez l'offre la plus adaptée à votre déménagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#001964] mb-3">{value.title}</h3>
                  <p className="text-lg text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </section>

      {/* Services Comparison Table */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 w-full">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold text-[#001964] mb-8 lg:mb-16 text-center">
            Comparez nos offres
          </h2>

          {/* VERSION DESKTOP (affichée à partir de md) */}
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="text-left font-medium py-4 px-6 w-1/2 text-lg ">
                  <div className="flex items-center">
                    <span>Détails des offres</span>
                    <div className="relative group">
                      <Info className="h-5 w-5 text-gray-400 ms-2" />
                      <span
                        className=" absolute z-[555] left-[50px] -translate-x-1/2 -bottom-8
                                          whitespace-nowrap
                                          bg-black text-white text-sm px-2 py-1 rounded
                                          opacity-0 group-hover:opacity-100
                                          transition-opacity duration-200
                                        "
                      >
                        La prestation Premium + peut être réalisée sur 2 jours si nécessaire.
                      </span>
                    </div>
                  </div>
                </TableHead>

                {offers.map((offerName, idx) => (
                  <TableHead
                    key={idx}
                    className="text-center font-medium py-4 px-4 bg-blue-50"
                  >
                    <div className="text-[#001964] font-semibold text-lg">
                      {offerName}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50">

                  {/* Colonne 1 : Label */}
                  <TableCell className="font-medium py-4 px-6 text-lg flex items-center gap-2">
                    {row.label}
                  </TableCell>

                  {/* Colonnes dynamiques */}
                  {row.values.map((value, colIndex) => (
                    <TableCell key={colIndex} className="text-center py-4 px-4">
                      {value ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}

                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="md:hidden">
            <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
              <Button
                className="py-2 px-3 border rounded-full bg-[#bdc3c7] hover:bg-[#001964]"
                onClick={() => setActiveColumn(prev => Math.max(0, prev - 1))}
              >
                <ChevronLeft />
              </Button>

              <span className="font-semibold">
                {offers[activeColumn]}
              </span>

              <Button
                className="py-2 px-3 border rounded-full bg-[#bdc3c7] hover:bg-[#001964]"
                onClick={() => setActiveColumn(prev => Math.min(offers.length - 1, prev + 1))}
              >
                <ChevronRight />
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      <span>Détails</span>
                      <div className="relative group">
                        <Info className="h-5 w-5 text-gray-400 ms-2" />
                        <span
                          className=" absolute z-[555] left-[150px] -translate-x-1/2 -bottom-8
                                          whitespace-nowrap
                                          bg-black text-white text-sm px-2 py-1 rounded
                                          opacity-0 group-hover:opacity-100
                                          transition-opacity duration-200
                                        "
                        >
                          La prestation Premium + peut être réalisée sur 2 jours si nécessaire.
                        </span>
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">{offers[activeColumn]}</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.label}</TableCell>

                    <TableCell className="text-center">
                      {row.values[activeColumn]
                        ? <Check className="text-green-600 mx-auto" />
                        : <Minus className="text-gray-400 mx-auto" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </div>
      </section>

      <div className="text-lg py-8 lg:py-16">
        <span className="block font-bold text-xl mb-2">🚚 Offre de lancement – Profitez-en !</span>
        Bénéficiez de <span className="font-bold">100 € de réduction</span> sur votre déménagement pour toute demande de devis envoyée avant le <span className="font-bold">31/03/2026</span>.
        <br />
        <span> 👉 La remise ne sera pas visible sur l'estimation en ligne, mais elle sera bien appliquée sur le devis final envoyé par e-mail.</span>
        <div className="flex bg-[#001964] justify-center rounded mt-2 shadow-xl">
          <span className="italic text-white">Offre valable avec toutes nos formules.</span>
        </div>
      </div>

      {/* Nos services */}
      <section className="flex flex-col items-center justify-between header-section-bg-animated px-4 sm:px-8 lg:px-32 w-full mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001964] my-4">
              Transport de marchandises
            </h1>
          </div>
        </div>
      </section>

      {/* Services de transport */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 w-full mt-8">

        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#001964]">Offre pour le transport de marchandises</span>
          </div>
          <div className="space-y-4 text-xl text-muted-foreground mt-8">
            <p>
              Nous proposons également un service de transport de marchandises, fiable, flexible et entièrement adapté à vos besoins logistiques.
            </p>
            <p>
              Que ce soit pour un colis volumineux, du matériel professionnel ou un chargement spécifique, nous assurons une prise en charge sécurisée et une livraison dans les meilleurs délais.
            </p>
            <p>
              Utilisez le formulaire de contact ou celui de devis pour nous faire parvenir votre besoin et nous vous transmettrons une réponse dans les plus brefs délais.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Offres;
