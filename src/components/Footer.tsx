import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-gray-800 dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-300">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-current" />
          <span>by Ateliera</span>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          © 2024 All rights reserved. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;