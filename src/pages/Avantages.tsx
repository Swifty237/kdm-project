
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock, Award, Users, Zap, HeartHandshake, Target, TrendingUp, ArrowRight } from 'lucide-react';

const Avantages = () => {
  const mainAdvantages = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Fiabilité Garantie",
      description: "Une expertise reconnue et des résultats garantis pour tous vos projets.",
      benefits: [
        "Certification qualité ISO",
        "Assurance responsabilité civile",
        "Garantie de résultats",
        "Support technique inclus"
      ]
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Gain de Temps",
      description: "Optimisez votre productivité grâce à nos solutions rapides et efficaces.",
      benefits: [
        "Mise en œuvre accélérée",
        "Processus automatisés",
        "Formation express",
        "Support réactif 24/7"
      ]
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Excellence Reconnue",
      description: "Une qualité de service primée et reconnue par nos clients depuis 10 ans.",
      benefits: [
        "Plus de 500 clients satisfaits",
        "Note moyenne 4.9/5",
        "Récompenses sectorielles",
        "Références de qualité"
      ]
    }
  ];

  const additionalBenefits = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Équipe Dédiée",
      description: "Une équipe d'experts entièrement dédiée à votre projet"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Innovation Continue",
      description: "Accès aux dernières technologies et méthodologies"
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-primary" />,
      title: "Relation de Confiance",
      description: "Un partenariat durable basé sur la transparence"
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Objectifs Atteints",
      description: "Focus sur vos résultats et votre retour sur investissement"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Croissance Assurée",
      description: "Solutions évolutives qui grandissent avec votre entreprise"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Avantages
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez pourquoi plus de 500 entreprises nous font confiance pour leurs projets les plus importants. 
            Des avantages concrets qui font la différence.
          </p>
        </div>

        {/* Main Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainAdvantages.map((advantage, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  {advantage.icon}
                </div>
                <CardTitle className="text-2xl mb-4">{advantage.title}</CardTitle>
                <CardDescription className="text-base">
                  {advantage.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {advantage.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Des Résultats Qui Parlent
            </h2>
            <p className="text-muted-foreground">
              Nos chiffres témoignent de notre engagement envers l'excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Années d'Expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Taux de Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-muted-foreground">Temps de Réponse</div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Avantages Supplémentaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-muted rounded-lg p-8 mb-16">
          <div className="text-center">
            <blockquote className="text-xl italic text-foreground mb-6">
              "MonEntreprise a transformé notre façon de travailler. Leur expertise et leur accompagnement 
              nous ont permis d'atteindre nos objectifs plus rapidement que prévu."
            </blockquote>
            <div className="text-muted-foreground">
              <strong>Marie Dubois</strong>, Directrice Générale chez TechCorp
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prêt à bénéficier de tous ces avantages ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d'entreprises qui nous font déjà confiance. 
            Contactez-nous pour découvrir comment nous pouvons vous aider.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Avantages;
