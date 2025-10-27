
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
import { Check, Minus, Info, Truck, BrushCleaning, PaintRoller } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

const Offres = () => {

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
      title: "Prémium",
      description: "Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison."
    },
    {
      title: "prémium avec option emménagement",
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
              Service de déménagement
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
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#001964] mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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
          <Table>
            <TableHeader>
              <TableRow className="border-b-2">
                <TableHead className="text-left font-medium py-4 px-6 w-1/2 text-lg">Détails des offres</TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#4e776f]/10">
                  <div className="text-[#273c75] font-semibold text-lg">Economique</div>
                </TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#25423d]/10">
                  <div className="text-[#001964] font-semibold text-lg">Standard</div>
                </TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#2980b9]/10">
                  <div className="text-[#2980b9] font-semibold text-lg">Premium</div>
                </TableHead>

                <TableHead className="text-center font-medium py-4 px-4 bg-[#2980b9]/10">
                  <div className="text-[#2980b9] font-semibold text-lg">Premium +</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Chargement - Transport - Livraison
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>

                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Protection du mobilier sous couvertures
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Protection de la literie sous housses
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Protection de la HI-FI et de l'électronique
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Emballage des vêtements sur cintres en penderies
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Emballage et déballage des objets fragiles
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Emballage et déballage de la vaisselle fragile
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Protection des éléments fragiles
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Démontage et remontage du mobilier non fixé au mur
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>

                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Décrochage mural (hors électricité et vissé)
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Emballage des objets non fragiles
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Emballage des vêtements non sur cintres
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Frais de stationnement
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Ménage du lieu de départ après le déménagement
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Déballage et rangement de l'ensemble des objets, du mobilier et des vêtements selon vos instructions
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-lg">
                  Enlèvement des encombrants à jeter en déchetterie
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-lg">
                  Ménage du lieu de destination après l'emménagement
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </div>
      </section>

      {/* Nos services */}
      <section className="flex flex-col items-center justify-between header-section-bg-animated px-4 sm:px-8 lg:px-32 w-full mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001964] my-4">
              Autres services
            </h1>
          </div>
        </div>
      </section>

      {/* Services de transport */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 w-full mt-8">

        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-3">
            <Truck className="h-10 w-10 text-[#001964] mx-8" />
            <span className="text-3xl font-semibold text-[#001964]">Transport de marchadises</span>
          </div>
          <div className="space-y-4 text-muted-foreground mt-8">
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


        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-3">
            <BrushCleaning className="h-10 w-10 text-[#001964] mx-8" />
            <span className="text-3xl font-semibold text-[#001964]">Nettoyage et rangement </span>
          </div>
          <div className="space-y-4 text-muted-foreground mt-8">
            <p>
              CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
              prohibitifs et les moyens de paiement inadaptés au marché camerounais. Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
            </p>
            <p>
              Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
            </p>
            <p>
              Aujourd'hui, nous sommes fiers d'avoir aidé des centaines de clients à réaliser
              leurs achats dans le monde entier, avec des économies pouvant aller jusqu'à 50%
              par rapport aux transporteurs traditionnels. CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
              prohibitifs et les moyens de paiement inadaptés au marché camerounais. Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-3">
            <PaintRoller className="h-10 w-10 text-[#001964] mx-8" />
            <span className="text-3xl font-semibold text-[#001964]">Peinture et rénovation</span>
          </div>
          <div className="space-y-4 text-muted-foreground mt-8">
            <p>
              CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
              prohibitifs et les moyens de paiement inadaptés au marché camerounais.
            </p>
            <p>
              Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
              aux achats internationaux en proposant des solutions simples, économiques et sécurisées. CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
              prohibitifs et les moyens de paiement inadaptés au marché camerounais. Aujourd'hui, nous sommes fiers d'avoir aidé des centaines de clients à réaliser.
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
