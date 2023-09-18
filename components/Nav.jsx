"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { get, set } from "mongoose";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);

//Allows use to use Google and next auth to sign in
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response)
    }

    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button tyle="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image src="/assets/images/logo.svg"
              alt="User Profile"
              width={37}
              height={37}
              className="rounded-full"
               />
            </Link>
          </div>
        ) : null /*Sign In button here*/}
      </div>
    </nav>
  );
};

export default Nav;
