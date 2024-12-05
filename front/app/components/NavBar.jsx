"use client";

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { UserContext } from "../providers/UserContextProvider";
import { Button } from "@mui/material";

const NavBar = () => {
  const { userAccount, connect } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            className="mr-2 rounded-full"
          />
        </div>
      </Link>

      <div className="flex space-x-4">
        {Object.entries(ROUTES).map(([key, { href, label }]) => (
          <Link
            key={key}
            href={href}
            passHref
            className="text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {!userAccount ? (
          <Button onClick={connect} variant="contained" color="primary">
            Conectar con Metamask
          </Button>
        ) : (
          <>
            <span className="text-white text-md mr-4">
              {userAccount.slice(0, 6) + "..." + userAccount.slice(-4)}
            </span>
            <img
              src={
                "https://avatar.iran.liara.run/public/boy?username=" +
                userAccount
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
