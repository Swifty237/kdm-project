// import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {

  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const updateHeight = () => setNavHeight(nav.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(nav);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    const updateHeight = () => setFooterHeight(footer.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(footer);

    return () => observer.disconnect();
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
