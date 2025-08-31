"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function Signin() {
  return (
    <>
      <div className="flex min-h-screen  justify-center items-center md:flex-row flex-col bg-[#ffffff]">
        {/* Left Illustration */}
        <div className=" md:w-1/2 md:h-3/4">
          <Image
            src="https://img.freepik.com/free-vector/set-up-daily-schedule-abstract-concept-vector-illustration-quarantine-daily-routine-schedule-your-day-staying-home-self-organization-pandemic-set-up-study-calendar-abstract-metaphor_335657-4132.jpg?t=st=1756553827~exp=1756557427~hmac=4ba204a01b71328c6ee25d9ee3e964d07fa46fd27d8d3c1305b34567dd78d333&w=1480"
            width={690}
            height={400}
            priority
            className="object-cover"
            alt=""
          />
        </div>
        {/* <div className="md:flex md:w-1/2 bg-amber-200 md:h-full justify-center items-center p-2.5 md:p-10  absolute">
          <Image
            src="https://img.freepik.com/free-vector/set-up-daily-schedule-abstract-concept-vector-illustration-quarantine-daily-routine-schedule-your-day-staying-home-self-organization-pandemic-set-up-study-calendar-abstract-metaphor_335657-4132.jpg?t=st=1756553827~exp=1756557427~hmac=4ba204a01b71328c6ee25d9ee3e964d07fa46fd27d8d3c1305b34567dd78d333&w=1480"
            alt="Shopping Illustration"
            fill
            sizes="200px"
            priority
            className="h-[200px] w-full object-cover"
          />
        </div> */}

        {/* Right Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-2 md:p-8">
          <div className="max-w-md w-full space-y-2 md:space-y-6">
            <h1 className="text-xl md:text-3xl font-bold text-black text-center">
              Welcome Back!
            </h1>
            <p className="text-center text-[12px] md:text-[18px] text-gray-500">
              Get Sign In to your account
            </p>

            {/* Google Button */}
            <div className="flex flex-col mt-1 md:mt-6">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex items-center justify-center text-[10px] md:text-[20px] gap-1 md:gap-3 border rounded-lg py-2 font-medium hover:bg-gray-50"
              >
                <FcGoogle className="md:w-6 md:h-6 w-4 h-4" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
