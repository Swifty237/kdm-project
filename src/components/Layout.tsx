// import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {

  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        setNavHeight(nav.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footer = document.getElementById('main-footer');
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    updateFooterHeight();
    window.addEventListener('resize', updateFooterHeight);

    return () => window.removeEventListener('resize', updateFooterHeight);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main style={{
        paddingTop: `${navHeight}px`,
        paddingBottom: `${footerHeight}px`,
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
