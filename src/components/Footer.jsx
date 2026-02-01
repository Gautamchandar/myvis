import React from 'react';

const Footer = ({ isDarkMode, toggleMode }) => {
  return (
    <footer className={`relative w-full  text-[#4a4a4a] font-mono py-8 border-t border-[#1a1a1a] ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase">
        <div className="flex gap-8">
          <a 
            href="/privacy" 
            className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="hover:text-white transition-colors duration-300"
          >
            Terms of Service
          </a>
        </div>
        <div className="text-right">
          <p>© 2026 GAUTAM NAUGAI | MY VIS | ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer