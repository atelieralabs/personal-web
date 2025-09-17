// src/components/Navbar.tsx
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ["about", "Skills", "Experience", "Projects", "Education"];


  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all">
      {/* Brand */}
      <div className="font-extrabold text-2xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Personal Portfolio
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors font-medium"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="hover:text-indigo-500 text-gray-700 dark:text-gray-300"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-300"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-4 border-t">
              
              <button
                onClick={toggleTheme}
                className="hover:text-indigo-500 text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
