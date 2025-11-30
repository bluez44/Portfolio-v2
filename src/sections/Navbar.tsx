import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { TfiClose } from "react-icons/tfi";
import { navLinks } from "../constants";

const NavItems = () => {
  return (
    <ul className="flex sm:flex-row flex-col text-xl">
      {navLinks.map(({ id, name, href }) => (
        <li
          key={id}
          className="px-8 py-6 text-neutral-400 hover:bg-white/5 sm:hover:bg-inherit hover:text-white hover:cursor-pointer transition-colors duration-300"
        >
          <a href={href} className="">
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors duration-300"
          >
            Quang Vinh
          </a>
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <TfiClose className="text-white w-6 h-6" />
            ) : (
              <LuMenu className="text-white w-6 h-6" />
            )}
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "max-h-screen" : "max-h-0"
        } overflow-hidden transition-all duration-300 sm:hidden bg-white/20`}
      >
        <nav>
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
