"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleYourTravlink = () => {
    if (session) {
      router.push("/your_travlink"); // agar login hai → redirect
    } else {
      router.push("/signin"); // agar login nahi hai → signin page par bhej do
    }
  };

  return (
    <nav className="w-[90%] md:w-[85vw] mx-auto flex justify-between items-center sticky top-[8px] md:top-[20px] z-50 shadow-[0px_10px_20px_4px_rgba(0,0,0,0.2)] rounded-full px-2.5 py-1 md:py-6 md:px-14 bg-white text-black">
      <div className="text-[10px] md:text-2xl font-bold"><Link href="/">TravLink</Link></div>
      <ul className="flex items-center justify-between font-semibold space-x-2.5 md:space-x-10 ">
        <li className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[8px] md:text-[16px] hover:text-indigo-600 transition"
          >
            Home
          </Link>
        </li>
        <li className="flex items-center justify-between">
          <button
            onClick={handleYourTravlink}
            className="text-[8px] md:text-[16px] hover:text-indigo-600 transition"
          >
            Your-TravLink
          </button>
        </li >
        <li>
          {!session ? (
            <button
              onClick={() => router.push("/signin")}
              className="text-[6px] flex justify-center items-center md:text-[16px] hover:text-indigo-200 hover:outline-2 hover:outline-[#ababab] bg-indigo-600 text-white md:py-1 md:px-4 py-0.5 px-1.5 rounded-full"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className=" flex justify-center items-center text-[6px] md:text-[16px] hover:text-red-200 hover:outline-2 hover:outline-[#ababab] bg-red-600 text-white md:py-1 md:px-4 py-0.5 px-1.5 rounded-full"
            >
              Sign Out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
