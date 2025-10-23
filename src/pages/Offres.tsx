
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
import { Check, Minus, Info, Truck, BrushCleaning, PaintRoller } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Offres = () => {

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

      {/* New Benefits Section */}
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 mt-8 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="flex flex-col items-center lg:items-start order-2 lg:order-1">
              <img
                src="/lovable-uploads/cdlm-avatar-livraison.png"
                className="max-w-full h-auto mb-4 lg:mb-0"
                alt=""
              />
              {/* Left Side - Main Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001964] mb-6 lg:mb-8 leading-tight text-center lg:text-left">
                  Choisissez l'offre la plus adaptée à votre déménagement
                </h2>
              </div>
            </div>

            {/* Right Side - Benefits List */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              {/* Benefit 1 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-2 lg:mb-3">Économique</h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  Chaque commande fait l'objet d'une estimation. Un devis clair est établi et vous avez une idée précise du prix final. Pas de frais cachés, ni de surprise à la livraison.
                </p>
              </div>

              {/* Benefit 2 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-2 lg:mb-3">Standard</h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  Parce que chaque utilisateur nous compte pour nous. Vous obtenez une réponse en moins d'1h, avec un accueil chaleureux, humain et respectueux. Et pas d'un robot !
                </p>
              </div>

              {/* Benefit 3 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-2 lg:mb-3">Prémium</h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  CDLM paie à votre place à l'étranger, vous évitant des frais bancaire, les virements coûteux et les conversions compliquées
                </p>
              </div>

              {/* Benefit 4 */}
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#001964] mb-2 lg:mb-3">Prémium avec option emménagement</h3>
                <p className="text-gray-700 text-lg lg:text-xl">
                  Grâce aux achats répétitifs de CDLM, vous bénéficiez de prix préférentiels et de réductions que vous ne trouverez nulle part ailleurs.
                </p>
              </div>
            </div>
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
                <TableHead className="text-left font-medium py-4 px-6 w-1/2 text-xl">Détails des offres</TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#4e776f]/10">
                  <div className="text-[#4e776f] font-semibold text-xl">Economique</div>
                </TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#25423d]/10">
                  <div className="text-[#25423d] font-semibold text-xl">Standard</div>
                </TableHead>
                <TableHead className="text-center font-medium py-4 px-4 bg-[#2980b9]/10">
                  <div className="text-[#2980b9] font-semibold text-xl">Premium</div>
                </TableHead>

                <TableHead className="text-center font-medium py-4 px-4 bg-[#2980b9]/10">
                  <div className="text-[#2980b9] font-semibold text-xl">Premium +</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-xl">Devis gratuit</TableCell>
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
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-xl">
                  Service client en ligne
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
                <TableCell className="font-medium py-4 px-6 text-xl">Conseils d'achat en ligne</TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-xl">
                  Accompagnement à l'achat en ligne
                  <Info className="h-5 w-5 text-gray-400" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                </TableCell>
                <TableCell className="text-center py-4 px-4">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-gray-50">
                <TableCell className="font-medium py-4 px-6 text-xl">Suivi de la commande</TableCell>
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
                <TableCell className="font-medium py-4 px-6 text-xl">Réception de la commande en France</TableCell>
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
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-xl">
                  Stockage et conditionnement de la commande
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
                <TableCell className="font-medium py-4 px-6 flex items-center gap-2 text-xl">
                  Expédition de la commande au Cameroun
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
      <section className="py-8 lg:py-16 px-4 sm:px-8 lg:px-16 w-full">
        <div className="max-w-6xl mx-auto">
          <Collapsible className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="h-10 w-10 text-[#001964] mx-8" />
                <span className="text-3xl font-semibold text-[#001964]">Transport de marchadises</span>
              </div>
              <div className="text-gray-600 text-xl">Cliquez pour voir le détail</div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto p-8 text-xl">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Service de nettoyage et rangement */}
      <section className="pb-8 lg:pb-16 px-4 sm:px-8 lg:px-16 w-full">
        <div className="max-w-6xl mx-auto">
          <Collapsible className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrushCleaning className="h-10 w-10 text-[#001964] mx-8" />
                <span className="text-3xl font-semibold text-[#001964]">Nettoyage et rangement </span>
              </div>
              <div className="text-gray-600 text-xl">Cliquez pour voir le détail</div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto p-8 text-xl">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Service de rénovation */}
      <section className="px-4 sm:px-8 lg:px-16 w-full">
        <div className="max-w-6xl mx-auto">
          <Collapsible className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PaintRoller className="h-10 w-10 text-[#001964] mx-8" />
                <span className="text-3xl font-semibold text-[#001964]">Peinture et rénovation</span>
              </div>
              <div className="text-gray-600 text-xl">Cliquez pour voir le détail</div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto p-8 text-xl">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit recusandae, tempora sed dicta ad eligendi porro deleniti, nihil illum, adipisci quod modi laudantium ab aspernatur quasi!
                  Consequatur optio provident, ea soluta quis quasi repudiandae quas natus similique minus, veritatis fuga explicabo, et corrupti dolores mollitia.
                  Praesentium asperiores inventore assumenda nesciunt.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </div>
  );
};

export default Offres;
