'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export default function Navbar() {


  const [scrolling, setScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const NavLink = ({ href, children, icon: Icon }: NavLinkProps) => (
    <Link href={href} className="group flex items-center space-x-2">
      {Icon && <Icon className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />}
      <span className="font-light text-gray-700 group-hover:text-black transition-colors duration-300 relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? 'backdrop-blur-lg bg-white/50 shadow-md' : 'bg-white'
        }`}
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-8">
          {/* Logo */}
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <Image className="h-10 w-auto" src="/imageslogo.png" alt="Helper Buddy" width={40} height={40} />
            <span className="hidden md:block text-2xl font-extrabold text-black tracking-wide">MINDBEND</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink href="/alumni" >Alumni</NavLink>
            <NavLink href="/faculty">Faculty</NavLink>
            <NavLink href="/register">Alumni Registration</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
          </div>


          {/* Right Section */}
          <div className="flex items-center space-x-6">

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden rounded-lg p-2 hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white"
          >
            <div className="max-w-7xl mx-auto p-4 space-y-4">

              <div className="grid gap-3">
                <Link href="/alumni" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all">
                  
                  <span className="text-gray-600 hover:text-black">Alumni</span>
                </Link>
                <Link href="/faculty" className="p-3 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-black">
                  Faculty
                </Link>
                <Link href="/register" className="p-3 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-black">
                  Alumni Registration
                </Link>
                <Link href="/gallery" className="p-3 rounded-lg hover:bg-gray-50 transition-all text-gray-600 hover:text-black">
                  Gallery
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}