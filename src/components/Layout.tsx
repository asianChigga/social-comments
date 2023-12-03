import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="custom-dark-pink">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
