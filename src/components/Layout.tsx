// import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {


  return (
    <div className="">
      <Navigation />
      <main className="min-h-screen flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
