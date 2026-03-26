
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Offres from "./pages/Offres";
import APropos from "./pages/APropos";
import FormulaireDevis from "./pages/FormulaireDevis";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import VirtualTour from "./pages/VirtualTour";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/offres" element={<Offres />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/devis" element={<FormulaireDevis />} />
              <Route path="/virtual-tour/:token" element={<VirtualTour />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
