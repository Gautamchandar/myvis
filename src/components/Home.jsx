import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Globe,  Trophy, CircleCheckBig, } from 'lucide-react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'

const App = ({ isDarkMode, toggleMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const stats = [
    {
      icon: <Trophy className={`w-6 h-6 ${isDarkMode ? 'text-white ' : 'text-black'}`}/>,
      title: "Experience",
      subtitle: "1.5+ Years"
    },
    {
      icon: <CircleCheckBig className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`}/>,
      title: "Completed",
      subtitle: "10+ Projects"
    },
  ];
  const roles = [
    "Frontend Developer",
    "Technical Project Management",
    "Backend Developer",
    "Video Editor",
    "Full Stack Developer"
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const typingSpeed = isDeleting ? 50 : 100;
    const currentFullText = roles[roleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing animation
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const profileVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
    }
  };

  return (
    <>
    <div className="min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden relative flex flex-col items-center">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="flex-1 flex flex-col items-center pt-20 px-6 z-10 w-full max-w-7xl"
      >
        {/* Header Text */}
        <motion.div variants={itemVariants} className="text-center mb-8 h-40 flex flex-col items-center justify-center">
          <p className={`text-black text-sm mb-2 tracking-wide ${isDarkMode ? ' text-white' : ' text-black'}`}>Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Gautam Naugai</h1>
          
          {/* Typing Animation */}
          <div className="relative h-8 flex items-center justify-center min-w-75">
              <p className={`text-black text-lg md:text-xl font-medium tracking-wide whitespace-nowrap ${isDarkMode ? ' text-white' : ' text-black'}`}>
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-5 bg-[#a29bfe] ml-1 align-middle"
                />
              </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 mb-16">
          <button className="px-8 py-3 rounded-xl border border-gray-600 hover:border-purple-400 transition-colors text-sm font-semibold tracking-wide bg-white/5 backdrop-blur-sm">
          <a href='https://my-vis-resume.tiiny.site/'>Download CV</a>
          </button>
          <Link to="/about">
            <button className="px-8 py-3 rounded-xl bg-[#a29bfe] text-[#0a0c16] hover:bg-[#8e86f8] transition-all hover:shadow-[0_0_20px_rgba(162,155,254,0.3)] text-sm font-semibold tracking-wide">
            About me
          </button>
          </Link>
        </motion.div>

        <motion.div 
          variants={profileVariants}
          className="relative w-full max-w-112.5 aspect-4/5 flex justify-center"
        >
          <div className="relative w-full h-full overflow-hidden rounded-t-[200px] bg-linear-to-b from-purple-500/20 to-transparent p-0.5">
            <div className="w-full h-full rounded-t-[200px] bg-[#0a0c16] overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-t from-[#2d2159] via-[#4a3a8c] to-[#2d2159] opacity-80" />
              <img 
                src="https://i.postimg.cc/cCLCtsFJ/me-v2.jpg" 
                alt="gautamnaugaiofficialpic"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[110%] object-cover object-top filter contrast-[1.1]"
              />
            </div>
          </div>
        </motion.div>
      </motion.main>

      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed left-6 bottom-12 hidden lg:flex flex-col items-center gap-6 ">
        <a href="https://www.linkedin.com/in/gautam-naugai-1a72a5275/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5 group ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'}`}
      ">
          <Linkedin size={20} className={`group-hover:scale-110 transition-transform ${isDarkMode ? '' : ''}`} />
        </a>
        <a href="https://github.com/Gautamchandar" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5 group">
          <Github size={20} className={`group-hover:scale-110 transition-transform ${isDarkMode ? '' : ''}`}
      />
        </a>
        <a href="https://x.com/NaugaiGautam" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5 group">
          <Globe size={20} className={`group-hover:scale-110 transition-transform ${isDarkMode ? ' ' : ' '}`}/>
        </a>
        <div className="w-px h-12 bg-linear-to-b from-gray-700 to-transparent mt-2" />
      </motion.div>

      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed right-6 bottom-12 hidden lg:flex flex-col items-center gap-12"
      >
        <div className="flex flex-col items-center gap-4">
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1"
            >
                <div className="w-1 h-2 bg-[#a29bfe] rounded-full" />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 [writing-mode:vertical-lr] font-bold">
                Scroll Down
            </p>
        </div>
      </motion.div>

      {/* Mobile Footer */}
      <div className="lg:hidden flex gap-8 my-12 text-gray-400">
         <a href="https://www.linkedin.com/in/gautam-naugai-1a72a5275/" target="_blank" rel="noopener noreferrer">
           <Linkedin size={20} className="hover:text-[#a29bfe] cursor-pointer" />
         </a>
         <a href="https://github.com/Gautamchandar" target="_blank" rel="noopener noreferrer">
           <Github size={20} className="hover:text-white cursor-pointer" />
         </a>
         <a href="https://x.com/NaugaiGautam" target="_blank" rel="noopener noreferrer">
           <Globe size={20} className="hover:text-white cursor-pointer" />
         </a>
      </div>
    </div>

    {/* About Page Section  */}

     <section className="py-20 px-4 min-h-screen flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white ' : 'text-black'}`}>About Me</h2>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-28 items-center">
        
        {/* Left Side*/}
        <div className="flex justify-center md:justify-end">
          <div className="w-80 h-96 overflow-hidden rounded-3xl bg-gray-800">
            <img 
              src="https://i.postimg.cc/VkxJZPkH/a63b7eaa-432c-478e-a648-bbc144c29bd8.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <div 
                key={index} 
                className="border-2 p-6 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-1"
              >
                {item.icon}
                <h3 className="font-semibold mt-3 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className={`leading-relaxed max-w-md p-4 ${
          isDarkMode ? ' text-white' : 'text-black'
        }`}>
            I am a motivated and detail-oriented professional with 6 month experience in Technical Project Management. I worked at the Indian Institute of Public Administration (IIPA) under the guidance of Prof. Charru Malhotra, where I contributed as a Technical Project Management and developed an interactive dashboard using Power BI and Next.js to support data-driven decision-making. Currently, I am working as a Web Developer at the Indian Institute of Public Administration (IIPA), focusing on building responsive, scalable, and user-centric web applications.
          </p>

        </div>
      </div>
    </section>
    </>
  );
};


export default App;