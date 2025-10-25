"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-purple-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/unscreen.gif" alt="Logo" className="w-12 h-12" />
          <span className="font-extrabold text-xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            DN Portal
          </span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="relative font-semibold hover:text-purple-400 transition-colors duration-200"
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full hover:w-full"></span>
              </Link>
            </li>

            {session ? (
              <li
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-md">
                  👋 Hi,{" "}
                  <b className="text-yellow-300">{session.user.name}</b>
                  <svg
                    className="w-3 h-3 ml-1 mt-[2px]"
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

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 shadow-xl overflow-hidden border border-purple-500/30"
                    >
                      <ul className="py-2 text-sm text-white">
                        <li>
                          <Link
                            href="/dashboard"
                            className="block px-5 py-2 hover:bg-purple-800/60 transition"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="block px-5 py-2 hover:bg-purple-800/60 transition"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => signOut()}
                            className="w-full text-left px-5 py-2 hover:bg-purple-800/60 transition"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => signIn()}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
