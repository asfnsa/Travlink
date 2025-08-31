"use client";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleYourTravlink = () => {
    if (session) {
      router.push("/your_travlink"); // agar login hai → redirect
    } else {
      router.push("/signin"); // agar login nahi hai → signin page open
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-[#6f6fff] to-[#e0e7ff] py-10 md:py-16">
        <div className="container mx-auto px-2 md:px-4 flex flex-row md:flex-row items-center gap-2 md:gap-12">
          {/* Left: Hero Text & Form */}
          <div className="flex-1 animate-fadeUp">
            <h1 className="text-[14px] md:text-6xl font-extrabold text-gray-900 mb-1.5 md:mb-6">
              Everything you are. <br className="hidden md:block" />
              <span className="text-indigo-600">
                In one, simple link in bio.
              </span>
            </h1>
            <p className="text-[8px] md:text-xl text-gray-700 mb-4 md:mb-8">
              People using Travlink for their link in bio. One link to help you
              share everything you create, curate and sell from your Instagram,
              TikTok, Twitter, YouTube and other social media profiles.
            </p>
            <div>
              <Link href="/your_travlink">
                <button
                  onClick={handleYourTravlink}
                  className="px-2 md:px-6 py-1 md:py-2 rounded-[5px] md:rounded-lg bg-indigo-600 text-white text-[10px] md:text-[18px] font-semibold hover:bg-indigo-700 transition"
                >
                  try travlink
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Persona Example */}
          <div className="flex-1 flex justify-center animate-fadeUp">
            <div className="relative w-[120px] h-[200px] md:w-[390px] md:h-[480px] bg-white rounded-xl md:rounded-3xl shadow-xl overflow-hidden flex flex-col items-center p-1.5 md:p-6">
              {/* Background Images */}
              <Image
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6691a78938ec5512f11e20ff_6690ad3b0f5a04cb6cc2b7f1_bg%202.webp"
                alt="Persona bg placeholder"
                fill
                sizes="200px"
                className="absolute inset-0 object-cover opacity-60"
                style={{ zIndex: 1 }}
              />
              <Image
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66917b1fff58a30cb42e6f0d_bg.webp"
                alt="Persona bg"
                fill
                sizes="200px"
                className="absolute inset-0 object-cover opacity-80"
                style={{ zIndex: 2 }}
              />

              {/* Persona Item */}
              <div className="absolute left-2 md:left-8 top-16 md:top-24 z-10">
                <Image
                  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66917b378e8ba98d79979aca_item-1.webp"
                  alt="Persona item"
                  width={40}
                  height={40}
                  className="w-6 h-6 md:w-12 md:h-12"
                />
              </div>

              {/* Avatar */}
              <div className="relative z-20 mt-8 mb-4">
                <Image
                  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66918ab0cb2cafecf967e408_avatar.webp"
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="md:w-24 md:h-24 w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              {/* Links */}
              <div className="relative z-20 flex flex-col gap-3 w-full mt-4">
                <a
                  href="#"
                  className="text-[8px] md:text-[16px] block w-full text-center py-0.5 md:py-2 rounded-[4px] md:rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
                >
                  Youtube
                </a>
                <a
                  href="#"
                  className="text-[8px] md:text-[16px] block w-full text-center py-0.5 md:py-2 rounded-[4px] md:rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
                >
                  Website
                </a>
                <a
                  href="#"
                  className="text-[8px] md:text-[16px] block w-full text-center py-0.5 md:py-2 rounded-[4px] md:rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
                >
                  Spotify
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <div className="flex flex-row md:m-10">
        <div className="md:w-1/2 w-1/2 flex justify-center items-center p-1.5 md:p-4 relative">
          <Image
            src="https://img.freepik.com/premium-vector/analyzing-data-isolated-cartoon-vector-illustrations_107173-21472.jpg?w=1060"
            alt="Illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col items-start md:items-start gap-3 md:gap-16 w-1/2 mx-auto py-4 md:px-6 md:pt-32">
          {/* Left Content */}
          <div className="flex flex-col gap-2 md:gap-4 text-left">
            <h2 className="text-[10px] w-full md:w-3/4 md:text-4xl font-bold text-indigo-400 leading-snug">
              Share your Linktree from your Instagram, TikTok, Twitter and other
              bios
            </h2>
            <p className="text-gray-400 text-[7px] md:w-3/4 md:text-lg leading-relaxed">
              Add your unique Linktree URL to all the platforms and places you
              find your audience. Then use your QR code to drive your offline
              traffic online.
            </p>
          </div>
          <div>
            <button
              onClick={handleYourTravlink}
              className="bg-indigo-400 hover:bg-indigo-500 text-white text-[6px] md:text-lg font-semibold px-3 md:px-10 py-1.5 md:py-4 rounded-[4px] md:rounded-xl shadow-lg transition duration-300 ease-in-out"
            >
              Get started for free
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
