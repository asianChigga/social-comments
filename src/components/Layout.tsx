import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="custom-dark-blue">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
