import navlogo from "./assets/cjp_navlogo.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center bg-[#fff] p-3 ">
      <img
        onClick={() => navigate("/")}
        className="h-[50px] w-[70px] cursor-pointer"
        src={navlogo}
        alt="navbar image"
      />
      <ToggleLanguage colorScheme="pink" textColor="text-gray-700" />
    </nav>
  );
};

export default NavBar;
