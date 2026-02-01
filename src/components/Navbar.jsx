import React, { useState, useEffect, useRef } from 'react';
import { SunMedium, Moon, Menu, X, ChevronRight } from 'lucide-react';
import {Link} from 'react-router-dom'

const Navbar = ({ isDarkMode, toggleMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const themeBtnRef = useRef(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  // GSAP
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);


  useEffect(() => {
    if (!gsapLoaded) return;
    const gsap = window.gsap;

    const moveBtn = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = themeBtnRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.4;
      const y = (clientY - (top + height / 2)) * 0.4;
      gsap.to(themeBtnRef.current, { x, y, duration: 0.3 });
    };

    const resetBtn = () => {
      gsap.to(themeBtnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    const btn = themeBtnRef.current;
    if (btn) {
      btn.addEventListener('mousemove', moveBtn);
      btn.addEventListener('mouseleave', resetBtn);
    }
    return () => {
      if (btn) {
        btn.removeEventListener('mousemove', moveBtn);
        btn.removeEventListener('mouseleave', resetBtn);
      }
    };
  }, [gsapLoaded]);

  // Mobile Menu Morphing Animation
  useEffect(() => {
    if (!gsapLoaded) return;
    const gsap = window.gsap;

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'expo.inOut'
      });
      gsap.fromTo(mobileLinksRef.current, 
        { y: 80, opacity: 0, rotate: 3 },
        { y: 0, opacity: 1, rotate: 0, stagger: 0.08, duration: 0.6, ease: 'power4.out', delay: 0.3 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.6,
        ease: 'expo.inOut'
      });
    }
  }, [isOpen, gsapLoaded]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-100 backdrop-blur-md ${
          isDarkMode ? 'bg-black/30 text-white' : 'bg-white/70 text-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-around">
          <div className="myvisualix px-4 py-2 text-xs font-bold uppercase tracking-widest relative group overflow-hidden">myVis</div>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest relative group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2" />
              </Link>
            ))}
          </div>

          <div className="lg:hidden" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              ref={themeBtnRef}
              onClick={toggleMode}
              className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${
                isDarkMode 
                  ? 'border-white/10 hover:bg-white hover:text-black' 
                  : 'border-black/5 hover:bg-black hover:text-white'
              }`}
            >
              {isDarkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 hover:scale-110 transition-transform"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Morphing Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 z-110 flex flex-col justify-center px-10 pointer-events-none ${
          isDarkMode ? 'bg-blue-600' : 'bg-slate-900'
        } text-white`}
        style={{ clipPath: 'circle(0% at 100% 0%)', pointerEvents: isOpen ? 'all' : 'none' }}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 p-4 hover:rotate-90 transition-transform duration-300"
        >
          <X size={40} />
        </button>

        <div className="space-y-6">
          {navItems.map((item, idx) => (
            <div 
              key={idx}
              ref={el => mobileLinksRef.current[idx] = el}
              className="group flex items-center"
            >
              <Link 
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-4xl sm:text-7xl font-black uppercase tracking-tighter hover:italic transition-all duration-300 flex items-center gap-6"
              >
                {item.name}
                <ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all" size={48} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;