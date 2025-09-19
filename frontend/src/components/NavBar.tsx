import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [openDropdown, setOpenDropdown] = useState<
    "financial" | "stochastic" | "probability" | null
  >(null);
  const financialRef = useRef<HTMLLIElement>(null);
  const stochasticRef = useRef<HTMLLIElement>(null);
  const probabilityRef = useRef<HTMLLIElement>(null);

  const toggleDropdown = (menu: "financial" | "stochastic" | "probability") => {
    setOpenDropdown((prev) => (prev === menu ? null : menu)); // 👉 only one open
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (financialRef.current &&
        financialRef.current.contains(event.target as Node)) ||
      (stochasticRef.current &&
        stochasticRef.current.contains(event.target as Node)) ||
      (probabilityRef.current &&
        probabilityRef.current.contains(event.target as Node))
    ) {
      return; // click inside, do nothing
    }
    setOpenDropdown(null); // close if clicked outside
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="w-full flex flex-wrap items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/img/logo.png"
            className="h-8 ml-11"
            alt="Logo"
            style={{ transform: "scale(2)" }}
          />
        </Link>

        {/* Mobile toggle button */}
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Links */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-[#5FBA9B] rounded-sm md:bg-transparent md:text-[#5FBA9B] md:p-0 md:dark:text-[#5FBA9B] dark:bg-[#5FBA9B] md:dark:bg-transparent"
              >
                Home
              </Link>
            </li>

            {/* Financial Dropdown */}
            <li className="relative" ref={financialRef}>
              <button
                onClick={() => toggleDropdown("financial")}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FBA9B] md:p-0 md:w-auto dark:text-white md:dark:hover:text-[#5FBA9B] dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Financial
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "financial" && (
                <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/compoundinterest"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Compound Interest
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/mortgage"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mortgage Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/financial/npv"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        NPV Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/financial/irr"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        IRR Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/financial/savings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Savings Calculator
                      </Link>
                    </li>
                    <li>
                      <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    </li>
                    <li>
                      <Link
                        to="/financial"
                        className="block px-4 py-2 font-medium text-[#5FBA9B] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        See All
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Stochastic Dropdown */}
            <li className="relative" ref={stochasticRef}>
              <button
                onClick={() => toggleDropdown("stochastic")}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FBA9B] md:p-0 md:w-auto dark:text-white md:dark:hover:text-[#5FBA9B] dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Stochastic
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "stochastic" && (
                <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/stochastic/blackscholes"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Black-Scholes Model
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/stochastic/brownian"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Brownian Motion
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/stochastic/itointegral"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Itô Integral
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/stochastic/sde"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Differential Equations
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/stochastic/martingale"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Martingale Test
                      </Link>
                    </li>
                    <li>
                      <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    </li>
                    <li>
                      <Link
                        to="/stochastic"
                        className="block px-4 py-2 font-medium text-[#5FBA9B] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        See All
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Probability & Stats */}
            {/* Stochastic Dropdown */}
            <li className="relative" ref={probabilityRef}>
              <button
                onClick={() => toggleDropdown("probability")}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#5FBA9B] md:p-0 md:w-auto dark:text-white md:dark:hover:text-[#5FBA9B] dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Probability and Stats
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "probability" && (
                <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/probabilityandstats/binomialdistribution"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Binomial Distribution
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/probabilityandstats/normaldistribution"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Normal Distribution
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/probabilityandstats/bayes"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Bayes Theorem
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/probabilityandstats/clt"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Central Limit Theorem
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/probabilityandstats/uniformdistribution"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Uniform Distribution
                      </Link>
                    </li>
                    <li>
                      <hr className="my-2 border-gray-200 dark:border-gray-600" />
                    </li>
                    <li>
                      <Link
                        to="/probabilityandstats"
                        className="block px-4 py-2 font-medium text-[#5FBA9B] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        See All
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
