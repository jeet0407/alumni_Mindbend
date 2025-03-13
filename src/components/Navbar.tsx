"use client"

import React, { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation" // This hook is a Client Component hook [^2]

// Custom NavLink component
interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const NavLink = React.memo(({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`px-3 py-1 transition-all duration-200 relative overflow-hidden group ${
        isActive ? "font-medium" : ""
      } ${className || ""}`}
      onClick={onClick}
      prefetch={true}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-white ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        } transition-all duration-200 ease-in-out`}
      ></span>
    </Link>
  )
})

NavLink.displayName = "NavLink"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Optimize scroll handler with throttling
  useEffect(() => {
    const lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Memoize toggle function to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Memoize close function
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Optimize mobile menu click outside handler
  useEffect(() => {
    if (!isMenuOpen) return

    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#mobile-menu") && !target.closest("#menu-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", closeMenu)
    return () => document.removeEventListener("click", closeMenu)
  }, [isMenuOpen])

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || isMenuOpen ? "bg-black shadow-lg" : "bg-black"
      } text-white`}
    >
      <Link
  href="/"
  prefetch={true}
  className="flex items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer z-20"
>
  <div className="w-[70px] h-[50px] relative">
    <Image
      src="/images/logo.png"
      alt="Logo"
      fill
      className="rounded-full object-cover"
      priority
    />
  </div>
</Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-12 mr-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/alumni">Alumni</NavLink>
        <NavLink href="/register">Alumni Register</NavLink>
        <NavLink href="/faculty">Faculty</NavLink>
        {/* <NavLink href="/gallery">Gallery</NavLink> */}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-20">
        <button
          id="menu-button"
          className="p-2 hover:bg-gray-800 rounded-md transition-colors duration-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu - Simplified animation */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black z-10 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } transition-opacity duration-200 ease-in-out md:hidden pt-24`}
        style={{ transform: "none" }} // Remove transform for better performance
      >
        <div className="flex flex-col items-center space-y-8 mt-8">
          <NavLink href="/" className="text-xl" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink href="/alumni" className="text-xl" onClick={closeMenu}>
            Alumni
          </NavLink>
          <NavLink href="/register" className="text-xl" onClick={closeMenu}>
            Alumni Register
          </NavLink>
          <NavLink href="/faculty" className="text-xl" onClick={closeMenu}>
            Faculty
          </NavLink>
          <NavLink href="/gallery" className="text-xl" onClick={closeMenu}>
            Gallery
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Navbar)

