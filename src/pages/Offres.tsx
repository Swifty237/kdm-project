
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Offres = () => {
  const [activeColumn, setActiveColumn] = useState(0);

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
      values: [false, false, false, true]
    },
    {
      label: "Ménage du lieu de départ après le déménagement",
      values: [false, false, false, true]
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
      description: "Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison."
    },
    {
      title: "Standard",
      description: "Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison."
    },
    {
      title: "Premium",
      description: "Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison."
    },
    {
      title: "Premium avec option emménagement",
      description: "Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison."
    }
  ];

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
                <TableHead className="text-left font-medium py-4 px-6 w-1/2 text-lg">
                  Détails des offres
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
                    {/* {row.info && (
                      <Info className="h-5 w-5 text-gray-400" />
                    )} */}
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
                  <TableHead>Détails</TableHead>
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

      {/* Nos services */}
      <section className="flex flex-col items-center justify-between header-section-bg-animated px-4 sm:px-8 lg:px-32 w-full mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001964] my-4">
              Transport de marchadises
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
              CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
              prohibitifs et les moyens de paiement inadaptés au marché camerounais. Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers d'avoir aidé des centaines de clients à réaliser
              leurs achats dans le monde entier, avec des économies pouvant aller jusqu'à 50%
              par rapport aux transporteurs traditionnels. Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers d'avoir aidé des centaines de clients à réaliser
              leurs achats dans le monde entier, avec des économies pouvant aller jusqu'à 50%
              par rapport aux transporteurs traditionnels.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Offres;
