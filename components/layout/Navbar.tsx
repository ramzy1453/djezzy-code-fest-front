"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Menu, X, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inHomePage = usePathname() === "/";

  // Mock user state (in a real app, this would come from authentication)
  const [user] = useState({
    name: "Yahia Sinouar",
    email: "yahia-sinouar@hamas.ps",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "YS",
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock logout function
  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, you would call your auth service logout method here
    // For example: auth.signOut().then(() => router.push('/'));
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Regular", href: "/dashboard/regular" },
    { name: "Organization", href: "/dashboard/organization" },
    { name: "Restaurant", href: "/dashboard/restaurant" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Glass effect navbar */}
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-white/70 dark:bg-gray-950/70 shadow-lg"
            : "backdrop-blur-sm bg-white/30 dark:bg-gray-950/30"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            <span className="font-bold text-xl text-green-800 dark:text-green-300">
              Matarmihach
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {inHomePage ? (
              <Link href={"/dashboard/regular"}>
                <Button className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">
                  Get Involved
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isMobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md bg-white/90 dark:bg-gray-950/90 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="px-3 py-2 flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </div>
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 dark:text-gray-200 dark:hover:text-green-400 dark:hover:bg-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </div>
                </Link>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </div>
                </button>
              </>
            ) : (
              <div className="pt-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">
                  Get Involved
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </header>
  );
}
