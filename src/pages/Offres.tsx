
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, Star, Clock, Shield, ArrowRight, ShieldCheck, Check, Minus, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Offres = () => {
  const offres = [
    {
      icon: <Package className="h-8 w-8 text-[#25423d]" />,
      title: "Flex Auto (FA)",
      price: "À partir de 15 000 FCFA",
      advantage: "Offre de base, convient bien quand on est autonome sur le web",
      description: "Achetez vos produits en ligne, nous assurons la réception et l'acheminement. Depuis le Cameroun et partout dans le monde, vous pouvez payer directement sur le site marchand et nous faire parvenir votre commande et nous l'expédirons où vous le souhaitez au Cameroun ou à l’étranger, payer avec des moyens locaux (Mobile Money, Paypal, carte bancaire).",
      features: ["Jusqu'à 2kg", "Suivi basique", "Livraison standard", "Support email"]
    },
    {
      icon: <Star className="h-8 w-8 text-[#25423d]" />,
      title: "Confort Essentiel (CE)",
      price: "À partir de 25 000 FCFA",
      advantage: "Notre offre la plus populaire, parfait pour vos premiers achats internationaux",
      description: "Depuis le Cameroun, vous pouvez : Commander en ligne, Payer avec des moyens locaux (Mobile Money, carte bancaire), Choisir une livraison au Cameroun ou à l’étranger. Depuis l’étranger, vous pouvez : Commander en ligne, Régler votre commande via Wero, PayPal ou virement bancaire, Faire livrer uniquement au Cameroun, à domicile ou à une adresse de votre choix. Une offre 100 % clé en main : vous choisissez, vous payez, nous livrons.",
      features: ["Jusqu'à 5kg", "Suivi en temps réel", "Livraison rapide", "Support prioritaire"],
      popular: true
    },
    {
      icon: <Shield className="h-8 w-8 text-[#2980b9]" />,
      title: "Confort Premium (CP)",
      price: "À partir de 40 000 FCFA",
      advantage: "Offre idéal pour les achats réguliers, pour les professionnels et gros volumes",
      description: "Commander en ligne, Payer avec des moyens locaux (Mobile Money, carte bancaire), Choisir une livraison au Cameroun ou à l’étranger. Depuis l’étranger, vous pouvez : Commander en ligne, Régler votre commande via Wero, PayPal ou virement bancaire, Faire livrer uniquement au Cameroun, à domicile ou à une adresse de votre choix. Une offre 100 % clé en main : vous choisissez, vous payez, nous livrons.",
      features: ["Poids illimité", "Assurance premium", "Livraison express", "Gestionnaire dédié"]
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center">

      {/* Header */}
      <section className="flex flex-col items-center justify-between header-section-bg-animated px-4 sm:px-8 lg:px-32 w-full">
        <div className="max-w-6xl mx-auto pt-16 pb-5 sm:pt-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6 header-section-text-gradient-animated">
              Découvrez toutes les offres CDLM concues pour répondre à chacun de vos besoins où que vous soyez.
            </h1>
          </div>
        </div>

        <div className="text-center rounded py-6 w-[20vw] bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Nos Offres
          </h1>
        </div>
      </section>

      {/* Offres Grid */}
      <section className="pt-16 lg:pt-32 px-4 sm:px-8 lg:px-16 w-full">
        <div className="max-w-[50%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {offres.map((offre, index) => (
              <Card key={index} className={`relative shadow-md ${offre.popular ? 'border-[#e67e22] border-[4px]' : ''}`}>
                {offre.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#e67e22] border-[#ecf0f1] border-[2px] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                <CardHeader className={`text-center rounded-lg 
                  ${offre.title === 'Flex Auto (FA)' ?
                    'bg-[#4e776f]' :
                    offre.title === 'Confort Essentiel (CE)' ?
                      'bg-[#e67e22]' : 'bg-[#25423d]'
                  }`}>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                    {offre.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-2">{offre.title}</CardTitle>
                  <div className="text-2xl text-white">{offre.price}</div>
                  <CardDescription className="text-base text-white pt-6">
                    {offre.advantage}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xl">
                  <p className="py-6">
                    {offre.description}
                  </p>
                  <Button
                    className={`w-full my-6 text-xl ${offre.popular ? 'bg-[#e67e22] hover:bg-[#e67e22]/90' : 'bg-[#25423d] hover:bg-[#25423d]/90'}`}
                  >
                    Choisir cette offre
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Comparison Table */}
      <section className="pt-8 pb-16 lg:pt-10 lg:pb-16 px-4 sm:px-8 lg:px-16 bg-gray-50 w-full">
        <div className="max-w-[50%] mx-auto">
          <Collapsible className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CollapsibleTrigger className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-[#25423d]" />
                <span className="text-xl font-semibold text-foreground">Détails et comparaison des offres</span>
              </div>
              <div className="text-gray-600 text-xl">Cliquez pour voir le détail</div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2">
                      <TableHead className="text-left font-medium py-4 px-6 w-1/2 text-xl">Offres</TableHead>
                      <TableHead className="text-center font-medium py-4 px-4 bg-[#4e776f]/10">
                        <div className="text-[#4e776f] font-semibold text-xl">Flex Auto (FA)</div>
                      </TableHead>
                      <TableHead className="text-center font-medium py-4 px-4 bg-[#25423d]/10">
                        <div className="text-[#25423d] font-semibold text-xl">Confort Essentiel (CE)</div>
                      </TableHead>
                      <TableHead className="text-center font-medium py-4 px-4 bg-[#2980b9]/10">
                        <div className="text-[#2980b9] font-semibold text-xl">Confort Premium (CP)</div>
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
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Services proposés */}
      <section className="pt-16 pb-20 lg:pt-20 lg:pb-20 px-4 sm:px-8 lg:px-16 bg-white w-full">
        <div className="max-w-[50%] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#25423d] text-center mb-12">
            Services proposés
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Conseil d'Achat en ligne */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src="/lovable-uploads/7e8fd6c7-0efb-4aee-89f0-c138624b8b7a.png"
                  alt="Conseil d'achat en ligne"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#25423d] mb-2">
                  Conseil d'Achat en ligne
                </h3>
                <p className="text-xl text-gray-600">
                  Accompagnement à l'achat d'article en ligne
                </p>
              </div>
            </div>

            {/* Réception & Stockage en France */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src="/lovable-uploads/6332748d-d40d-444d-b420-af6bcec90499.png"
                  alt="Réception et stockage en France"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#25423d] mb-2">
                  Réception & Stockage en France
                </h3>
                <p className="text-xl text-gray-600">
                  Réception de commande, stockage et conditionnement de commande
                </p>
              </div>
            </div>

            {/* Expédition au Cameroun */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src="/lovable-uploads/b707af49-d799-4fa6-aa2b-b809220233a3.png"
                  alt="Expédition au Cameroun"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#25423d] mb-2">
                  Expédition au Cameroun
                </h3>
                <p className="text-xl text-gray-600">
                  Expédition de commandes au Cameroun par voie aérienne
                </p>
              </div>
            </div>

            {/* Livraison à domicile au Cameroun */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src="/lovable-uploads/90726d99-4800-4e48-a556-330c5dbb102c.png"
                  alt="Livraison à domicile au Cameroun"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#25423d] mb-2">
                  Livraison à domicile au Cameroun
                </h3>
                <p className="text-xl text-gray-600">
                  Livraison au lieu de livraison communiqué par le destinataire
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-8 lg:px-16 bg-white w-full flex justify-center">
        <div className="flex justify-between bg-gradient-to-r from-[#25423d]/5 to-[#25423d]/10 rounded-lg p-8 text-center w-[28%]">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Livraison Standard
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-2xl">
              - de 10 jours ouvrés
            </p>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-2xl">
              11 900 XAF/Kg
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#25423d] to-[#25423d]/90 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-white">
              Livraison Express
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-white text-2xl">
              - de 7 jours ouvrés
            </p>

            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-white text-2xl">
              14 000 XAF/Kg
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offres;
