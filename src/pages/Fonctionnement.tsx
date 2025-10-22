
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, FileText, Cog, CheckCircle, ArrowRight } from 'lucide-react';

const Fonctionnement = () => {
  const steps = [
    {
      number: "01",
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: "Premier Contact",
      description: "Prise de contact et analyse de vos besoins lors d'un entretien personnalisé.",
      details: [
        "Écoute attentive de vos besoins",
        "Analyse de votre situation actuelle",
        "Identification des objectifs",
        "Évaluation des contraintes"
      ]
    },
    {
      number: "02",
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Proposition Détaillée",
      description: "Élaboration d'une proposition sur mesure avec planning et tarification transparente.",
      details: [
        "Proposition technique détaillée",
        "Planning de réalisation",
        "Tarification transparente",
        "Modalités de collaboration"
      ]
    },
    {
      number: "03",
      icon: <Cog className="h-8 w-8 text-primary" />,
      title: "Mise en Œuvre",
      description: "Exécution du projet avec suivi régulier et communication constante.",
      details: [
        "Démarrage du projet",
        "Suivi régulier des avancées",
        "Communication transparente",
        "Adaptations si nécessaire"
      ]
    },
    {
      number: "04",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Livraison & Suivi",
      description: "Livraison finale avec formation et accompagnement pour assurer votre réussite.",
      details: [
        "Livraison conforme aux attentes",
        "Formation des équipes",
        "Documentation complète",
        "Support post-livraison"
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre processus éprouvé en 4 étapes pour mener votre projet vers le succès, 
            de l'idée initiale à la réalisation complète.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-start gap-8">
              {/* Step Number and Icon */}
              <div className="flex-shrink-0 flex items-center gap-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block w-px h-24 bg-border mx-8"></div>
              )}
            </div>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="bg-muted rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Notre Engagement Qualité
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nous nous engageons à respecter nos délais, notre budget et vos exigences qualité. 
              Votre satisfaction est notre priorité absolue.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24h</div>
                <div className="text-sm text-muted-foreground">Temps de réponse</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Projets livrés à temps</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour commencer la première étape de notre processus 
            et transformer vos idées en réalité.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Commencer maintenant <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fonctionnement;
