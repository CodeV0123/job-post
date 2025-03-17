import navlogo from "../components/CreateJobPost/assets/cjp_navlogo.png";
import ToggleLanguage from "./ToggleLanguage/ToggleLanguage";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#fff] p-3 ">
      <img className="h-[50px] w-[70px]" src={navlogo} alt="navbar image" />
      <h1 className="font-normal text-[#5d5c61] uppercase text-center">
        toggle
        <br /> language
        <ToggleLanguage />
      </h1>
    </nav>
  );
};

export default NavBar;
