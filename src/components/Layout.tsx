// import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {

  const [navHeight, setNavHeight] = useState(0);

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

  return (
    <div className="min-h-screen">
      <Navigation />
      <main style={{ paddingTop: `${navHeight}px` }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
