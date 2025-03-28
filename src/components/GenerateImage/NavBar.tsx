import navlogo from "./assets/Vector.png";
import { useNavigate } from "react-router-dom";

import { ReactNode } from "react";

const NavBar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center bg-[#fff] p-3 ">
      <img
        onClick={() => navigate("/")}
        className="h-[50px] w-[70px] cursor-pointer"
        src={navlogo}
        alt="navbar image"
      />
      {children}
    </nav>
  );
};

export default NavBar;
