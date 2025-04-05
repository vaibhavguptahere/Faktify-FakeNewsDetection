// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { assets } from "./../assets/assets";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser(); // Check if user is signed in
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (isSignedIn) {
      navigate(path); // Allow navigation if signed in
    } else {
      navigate("/sign-in"); // Redirect to Clerk sign-in if not signed in
    }
  }

  // Add effect to control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-sm shadow-md z-40">
        <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto">
          <Link to="/">
            <div
              className="flex items-center"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div
                className={`
                  w-12 h-12 inline-block
                  transition-transform duration-500 ease-in-out
                  ${isLogoHovered ? "rotate-180" : "rotate-0"}
                `}
              >
                <img
                  src={assets.Logo}
                  alt="Logo"
                  className="object-contain w-full h-full"
                />
              </div>
              <div
                className={`
                  text-white text-2xl font-normal whitespace-nowrap
                  transition-all duration-500 ease-linear overflow-hidden
                  hidden md:block
                  ${
                    isLogoHovered
                      ? "max-w-full opacity-100 ml-2"
                      : "max-w-0 opacity-0 ml-0"
                  }
                `}
              >
                | Faktify
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-11 text-white">
          {isSignedIn ? (
        <>
          <Link
            to="/verify"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Verify
          </Link>
          <Link
            to="/news"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            News
          </Link>
          <Link
            to="/services"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Services
          </Link>
        </>
      ) : (
        <>
          <SignInButton mode="redirect" afterSignInUrl="/verify">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              Verify
            </button>
          </SignInButton>

          <SignInButton mode="redirect" afterSignInUrl="/news">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              News
            </button>
          </SignInButton>

          <SignInButton mode="redirect" afterSignInUrl="/services">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              Services
            </button>
          </SignInButton>
        </>
      )}

            <SignedOut>
  <SignInButton>
  <button
  className="
    flex items-center gap-2
    bg-gradient-to-r from-blue-600 to-purple-600
    text-white
    py-2 px-4
    rounded-full
    shadow-md
    hover:scale-105
    transition-all
    duration-300
    group
  "
>
  <span className="text-sm font-medium">Sign In</span>
  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
</button>

  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton />
</SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed inset-0
          bg-black/95
          backdrop-blur-md
          flex flex-col items-center mt-24
          transition-all duration-300 ease-in-out
          md:hidden
          z-50
          ${
            isMenuOpen
              ? "opacity-90 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white p-2"
        >
        </button>

        <div className="flex flex-col items-center space-y-8 text-white">
        {isSignedIn ? (
        <>
          <Link
            to="/verify"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Verify
          </Link>
          <Link
            to="/news"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            News
          </Link>
          <Link
            to="/services"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Services
          </Link>
        </>
      ) : (
        <>
          <SignInButton mode="redirect" afterSignInUrl="/about">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              About
            </button>
          </SignInButton>

          <SignInButton mode="redirect" afterSignInUrl="/news">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              News
            </button>
          </SignInButton>

          <SignInButton mode="redirect" afterSignInUrl="/services">
            <button className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors">
              Services
            </button>
          </SignInButton>
        </>
      )}

<SignedOut>
  <SignInButton>
  <button
  className="
    flex items-center gap-2
    bg-gradient-to-r from-blue-600 to-purple-600
    text-white
    py-2 px-4
    rounded-full
    shadow-md
    hover:scale-105
    transition-all
    duration-300
    group
  "
>
  <span className="text-sm font-medium">Sign In</span>
  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
</button>

  </SignInButton>
</SignedOut>

<SignedIn>
  <UserButton />
</SignedIn>

        </div>
      </div>
    </>
  );
};

export default Navbar;
