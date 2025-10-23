
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const APropos = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-[#25423d]" />, value: "500+", label: "Clients satisfaits" },
    { icon: <Globe className="h-8 w-8 text-[#2980b9]" />, value: "50+", label: "Pays couverts" },
    { icon: <Target className="h-8 w-8 text-[#e67e22]" />, value: "2000+", label: "Colis livrés" },
    { icon: <Award className="h-8 w-8 text-[#27ae60]" />, value: "99%", label: "Taux de satisfaction" }
  ];

  const values = [
    {
      title: "Transparence",
      description: "Prix clairs, délais respectés, communication constante"
    },
    {
      title: "Fiabilité",
      description: "Service sécurisé avec assurance incluse sur tous vos achats"
    },
    {
      title: "Proximité",
      description: "Équipe locale qui comprend vos besoins spécifiques"
    },
    {
      title: "Innovation",
      description: "Solutions de paiement adaptées au marché camerounais"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001964] mb-6">
            À Propos de KDM
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Commandez Dans Le Monde - Votre partenaire de confiance pour tous vos achats internationaux
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#001964] mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                CDLM est née d'un constat simple : les frais d'expédition internationale sont souvent
                prohibitifs et les moyens de paiement inadaptés au marché camerounais.
              </p>
              <p>
                Fondée en 2020, notre entreprise s'est donnée pour mission de démocratiser l'accès
                aux achats internationaux en proposant des solutions simples, économiques et sécurisées.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'avoir aidé des centaines de clients à réaliser
                leurs achats dans le monde entier, avec des économies pouvant aller jusqu'à 50%
                par rapport aux transporteurs traditionnels.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#001964] mb-6">Notre Mission</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Rendre accessible à tous les Camerounais la richesse du commerce international,
                sans les contraintes habituelles de distance et de paiement.
              </p>
              <p>
                Nous nous engageons à fournir un service de qualité, transparent et économique,
                en utilisant les technologies les plus récentes pour optimiser la logistique
                et réduire les coûts.
              </p>
              <p>
                Notre vision : être le leader de l'achat international au Cameroun, reconnu
                pour son excellence opérationnelle et sa proximité client.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#001964] text-center mb-12">Nos Valeurs</h2>
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

        {/* Team Section */}
        <div className="bg-gradient-to-r from-[#25423d]/5 to-[#25423d]/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-[#001964] mb-4">
            Une équipe dédiée à votre service
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Notre équipe multiculturelle combine expertise logistique internationale et
            connaissance approfondie du marché camerounais pour vous offrir le meilleur service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APropos;
