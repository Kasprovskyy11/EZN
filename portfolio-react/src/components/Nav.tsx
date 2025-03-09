import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const arrowRef = useRef(null);
  const elements = [{ title: "Weather App", href: "#weather" }];
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setOpen(true);
    arrowRef.current.style.transform = "rotate(180deg)";
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setOpen(false);
      arrowRef.current.style.transform = "rotate(0)";
    }, 200);
  };

  // Dodajemy tło nagłówka przy przewijaniu
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Nasłuchiwanie na scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`mx-auto sticky top-0 z-10 duration-300 ${
        scrolled ? "bg-[#d4d4dc]" : ""
      }`}
    >
      <div className="hidden sm:flex justify-between content-center pt-6 px-4 sm:px-6 text-center">
        <div>
          <a
            href="#"
            className={`${scrolled ? "text-[#101820]" : "text-[#feda6a]"}`}
          >
            <FontAwesomeIcon
              icon={faAddressBook}
              className="text-4xl sm:text-6xl"
            />
          </a>
          <h1 className={`${scrolled ? "text-[#101820]" : "text-[#d4d4dc]"}`}>
            Kasprovskyy Portfolio
          </h1>
        </div>
        <nav
          className={`flex items-center gap-6 sm:gap-8 w-full sm:w-auto text-lg uppercase font-bold ${
            scrolled ? "text-[#101820]" : "text-[#d4d4dc]"
          }`}
        >
          <a href="#">Home</a>
          <a href="#aboutme">About Me</a>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              className={`flex items-center gap-1 ${
                scrolled ? "text-[#17b054]" : "text-[#feda6a]"
              }`}
              href="#"
            >
              Portfolio{" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                ref={arrowRef}
                className="duration-300"
              />
            </a>

            {open && (
              <div className="absolute left-0 top-full mt-2 bg-gray-800 p-2 rounded shadow-lg">
                {elements.map((el, index) => (
                  <a
                    key={index}
                    className="block text-[#d4d4dc] px-4 py-2"
                    href={el.href}
                  >
                    {el.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
