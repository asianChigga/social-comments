import { useState } from "react";
import { BiGhost } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="flex custom-dark-blue items-center justify-between p-3 px-9">
      <BiGhost style={{ height: "30px", width: "30px", color: "white" }} />

      <div
        className="flex relative "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaUserCircle
          style={{ height: "30px", width: "30px", color: "white" }}
        />
      </div>
      {isHovered && (
        <div className="absolute right-0 top-11 w-60 flex justify-center ">
          <div className=" bg-white w-80- p-3 rounded-md ">
            <p className="custom-gray w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
              Me
            </p>
            <p className="text-xs">name:@user2231</p>
            <p className="text-xs">email:user@gmail.com</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
