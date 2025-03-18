import navlogo from "./assets/cjp_navlogo.png";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#fff] p-3 ">
      <img className="h-[50px] w-[70px]" src={navlogo} alt="navbar image" />
      <ToggleLanguage colorScheme="pink" textColor="text-gray-700" />
    </nav>
  );
};

export default NavBar;
