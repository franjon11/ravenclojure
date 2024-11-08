import React from "react";
import ROUTES from "../constants/routes";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-lg font-bold">Logo</div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        {Object.entries(ROUTES).map(([key, { href, label }]) => (
          <a
            key={key}
            href={href}
            className="text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {label}
          </a>
        ))}
      </div>

      {/* User Avatar */}
      <div className="flex items-center">
        <img
          src="https://avatar.iran.liara.run/username?username=Raven+Clojure"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
