import React, { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import { LINKS } from "@data/headerLinkes";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-secondary sticky top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
      <Logo />

      {/* Toggle Button for Mobile */}
      <Button
        type="button"
        variant="outline"
        className="p-2 focus:outline-none lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </Button>

      {/* Navigation */}
      <nav
        className={`${
          isMenuOpen ? "flex shadow-md" : "hidden shadow-none"
        } bg-secondary absolute top-full right-0 left-0 flex-col gap-4 p-4 transition-all duration-300 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:bg-transparent lg:p-0`}
      >
        <ul className="flex flex-col gap-4 lg:flex-row lg:gap-9">
          {LINKS.map((link, i) => (
            <li key={i}>
              <a
                target={link.target}
                className="hover:text-grayColor text-sm font-medium transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => {
            window.open(
              "https://github.com/Ahmed-Soliman33/WYSIWYG_Editor_Component",
              "_blank",
            );
          }}
          className="w-full rounded-3xl lg:w-auto"
          size="md"
          variant="secondary"
        >
          Github
        </Button>
      </nav>
    </header>
  );
};

export default Header;
