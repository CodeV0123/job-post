import navlogo from "./assets/Vector.png";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-[#fff] p-3 ">
      <img className="h-[50px] w-[70px]" src={navlogo} alt="navbar image" />
    </nav>
  );
};

export default NavBar;
