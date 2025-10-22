
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Shield, Star } from 'lucide-react';

const SitesConfiance = () => {
  const sites = [
    {
      name: "Amazon",
      url: "amazon.com",
      logo: "🛒",
      category: "Marketplace",
      description: "Le plus grand marketplace mondial avec des millions de produits",
      rating: 5,
      verified: true
    },
    {
      name: "eBay",
      url: "ebay.com",
      logo: "🏪",
      category: "Enchères",
      description: "Plateforme d'enchères et de vente entre particuliers",
      rating: 4,
      verified: true
    },
    {
      name: "AliExpress",
      url: "aliexpress.com",
      logo: "🛍️",
      category: "Marketplace",
      description: "Produits directs de Chine à prix compétitifs",
      rating: 4,
      verified: true
    },
    {
      name: "Walmart",
      url: "walmart.com",
      logo: "🏬",
      category: "Retail",
      description: "Grande chaîne de distribution américaine",
      rating: 4,
      verified: true
    },
    {
      name: "Best Buy",
      url: "bestbuy.com",
      logo: "💻",
      category: "Électronique",
      description: "Spécialiste de l'électronique et de la technologie",
      rating: 4,
      verified: true
    },
    {
      name: "Target",
      url: "target.com",
      logo: "🎯",
      category: "Retail",
      description: "Chaîne de magasins généralistes américaine",
      rating: 4,
      verified: true
    }
  ];

  const categories = ["Tous", "Marketplace", "Enchères", "Retail", "Électronique"];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sites de Confiance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre sélection de sites marchands de confiance sur lesquels nous pouvons 
            effectuer vos achats en toute sécurité.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="px-4 py-2 cursor-pointer hover:bg-[#25423d] hover:text-white transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sites.map((site, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{site.logo}</div>
                    <div>
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {site.category}
                        </Badge>
                        {site.verified && (
                          <Shield className="h-4 w-4 text-[#27ae60]" />
                        )}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {site.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < site.rating ? 'text-[#e67e22] fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{site.url}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-[#25423d]/5 to-[#25423d]/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Un site ne figure pas dans notre liste ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Pas de problème ! Nous pouvons effectuer des achats sur pratiquement tous les sites marchands. 
            Contactez-nous pour vérifier la faisabilité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitesConfiance;
