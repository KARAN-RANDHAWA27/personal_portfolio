import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-50 transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-2xl font-bold text-white">K.</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav className="space-y-6">
            <Link href="/" className="block text-orange-500 text-xl">
              Homepage
            </Link>
            <Link href="/about" className="block text-white text-xl">
              About Me
            </Link>
            <Link href="/career" className="block text-white text-xl">
              Career
            </Link>
            <Link href="/education" className="block text-white text-xl">
              Education
            </Link>
            <Link href="/projects" className="block text-white text-xl">
              Projects
            </Link>
            <Link href="/testimonials" className="block text-white text-xl">
              Testimonials
            </Link>
          </nav>
        </div>
      </div>

      {/* Fixed Header */}
      <header className="fixed w-full top-0 z-40 bg-transparent lg:px-6">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">K.</span>
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Image
                src="/menu_icon.svg"
                alt=""
                className="h-20 w-20"
                width={10}
                height={10}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
