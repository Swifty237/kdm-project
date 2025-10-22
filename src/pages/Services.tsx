
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Settings, Users, Lightbulb, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Conseil Stratégique",
      description: "Accompagnement personnalisé pour définir et mettre en œuvre votre stratégie d'entreprise.",
      features: ["Analyse de marché", "Plan stratégique", "Accompagnement", "Suivi des résultats"]
    },
    {
      icon: <Settings className="h-8 w-8 text-primary" />,
      title: "Solutions Techniques",
      description: "Développement et implémentation de solutions techniques adaptées à vos besoins.",
      features: ["Développement sur mesure", "Intégration système", "Maintenance", "Support technique"]
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Formation Équipes",
      description: "Formation et montée en compétences de vos équipes pour optimiser leur performance.",
      features: ["Formation personnalisée", "Coaching", "Suivi individuel", "Certification"]
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "Accompagnement dans l'innovation et la transformation digitale de votre entreprise.",
      features: ["Audit innovation", "Roadmap digitale", "Prototypage", "Déploiement"]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre gamme complète de services conçus pour accompagner votre entreprise 
            vers le succès et l'excellence opérationnelle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Chaque entreprise est unique. Contactez-nous pour discuter de vos besoins spécifiques 
            et créer une solution sur mesure.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
