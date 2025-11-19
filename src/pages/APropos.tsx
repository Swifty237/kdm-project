
import { Card, CardContent } from '@/components/ui/card';

const APropos = () => {

  const values = [
    {
      title: "Qualité",
      description: "Une équipe professionnelle, courtoise et attentive à vos besoins."
    },
    {
      title: "Simplicité",
      description: "Une communication claire, constante et fluide avec nos équipes."
    },
    {
      title: "Sérénité",
      description: "Un service fiable, structuré et rigoureux pour une exécution sans difficulté."
    }
  ];



  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001964] mb-6">
            À propos de KDM LOGISTIQUE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Votre partenaire de confiance pour le déménagement et le transport de marchandises.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-[#001964] mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                KDM LOGISTIQUE est née d’un constat simple : déménager est un processus fatigant, stressant et chronophage.
              </p>
              <p>
                Fondée en 2025, notre entreprise s’est donnée pour mission de décharger nos clients de cette étape exigeante afin qu’ils puissent vivre un déménagement en toute sérénité
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#001964] mb-6">Notre Mission</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Transformer votre déménagement en une expérience simple, fluide et sereine.
              </p>
              <p>
                Nous nous engageons à être à l’écoute de vos besoins, à vous fournir un service de qualité et à être un partenaire fiable qui vous accompagne à chaque étape.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20 max-w-4xl flex flex-col justify-self-center">
          <h2 className="text-3xl font-bold text-[#001964] text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#001964] mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-lg">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default APropos;
