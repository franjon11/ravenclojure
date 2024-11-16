import React from "react";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "../constants/routes";
import logo from "../logo.svg";

const NavBar = () => {
  return (
    <nav className='bg-gray-800 p-4 flex justify-between items-center'>
      <Link href='/' passHref>
        <div className='flex items-center cursor-pointer'>
          <Image
            src={logo}
            alt='Logo'
            width={60}
            height={60}
            className='mr-2 rounded-full'
          />
        </div>
      </Link>

      <div className='flex space-x-4'>
        {Object.entries(ROUTES).map(([key, { href, label }]) => (
          <a
            key={key}
            href={href}
            className='text-white px-3 py-2 rounded-md text-sm font-medium'>
            {label}
          </a>
        ))}
      </div>

      <div className='flex items-center'>
        <img
          src='https://avatar.iran.liara.run/username?username=Raven+Clojure'
          alt='User Avatar'
          className='w-10 h-10 rounded-full'
        />
      </div>
    </nav>
  );
};

export default NavBar;
