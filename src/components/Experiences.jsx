import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    title: "Web Developer | Technical Project Management",
    company_name: "Indian Institute of Public Administration",
    icon: "https://www.iipa.org.in/cms/public/img/logo-footer.png",
    iconBg: "#1a2a22",
    date: "July, 2025 - Present",
    accent: "#4169E1",
    points: [
      "Handled complete UI/UX development for the Namami Gange module in the IIPA Dashboard website.",
      "Designed and edited all Namami Gange project videos using Adobe Premiere Pro",
      "Developed and maintained project dashboards using Power BI for data visualization and insights",
      "Integrated Power BI dashboards into the web platform for real-time project monitoring"
    ],
  },
  {
    title: "Open Source Contributor",
    company_name: "SWOC^25",
    icon: "https://www.socialwinterofcode.com/SWOC_W_Black.png",
    iconBg: "#222222",
    date: "Jan 2025 - Mar 2025",
    accent: "#00BFFF",
    points: [
      "Contributed to 5+ projects using HTML, CSS, JavaScript, React.js, and GSAP to build interactive user interfaces",
      "Implemented smooth animations and transitions using GSAP to enhance user experience.",
      "Participated in planning, development, testing, and UI refinement across multiple projects.",
      "Collaborated with like-minded developers and designers on team-based projects",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "IBM",
    icon: "https://www.freepnglogos.com/uploads/ibm-logo-png/ibm-logo-png-transparent-svg-vector-bie-supply-3.png",
    iconBg: "#222222",
    date: "July 2024 - Aug 2024",
    accent: "#1261E0",
    points: [
      "During this internship, developed a Virtual Assistant using HTML, CSS, and Vanilla JavaScript.",
      "Designed an interactive and user-friendly UI for seamless user interaction.",
      "Focused on clean structure, responsiveness, and performance optimization.",
      "Gained hands-on experience in frontend problem-solving and real-world application development.",
    ],
  },
  {
    title: "Genrative AI",
    company_name: "Google Cloud",
    icon: "https://image.similarpng.com/file/similarpng/original-picture/2020/06/Logo-google-cloud-icon-vector-PNG.png",
    iconBg: "#222222",
    date: "May 2024 - Jun 2024",
    accent: "#FBBC05",
    points: [
      "Successfully completed 10-12 hands-on labs on Google Cloud, covering Python, Generative AI, and Cloud Services using real-world scenarios.",
      "Gained practical experience with Generative AI using Vertex AI, including Prompt Design, model interaction, and understanding how prompts affect AI responses.",
      "Tested and managed APIs using Google Cloud Console.",
      " Followed Google-provided task-based lab instructions, executing each task independently such as environment setup, API configuration, model invocation, and result verification.",
    ],
  },
];

const ExperienceCard = ({ experience, index, isDarkMode, toggleMode }) => {
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const [inViewRef, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * 10, y: -y * 10 });
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div ref={inViewRef} className={`relative flex items-center justify-between w-full mb-32 md:mb-48 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <span className={`absolute top-0 font-black text-[12rem] opacity-[0.03] select-none pointer-events-none text-white hidden md:block ${isLeft ? 'right-0' : 'left-0'}`}>
        0{index + 1}
      </span>

      {/* Date Label */}
      <motion.div 
        variants={{ hidden: { opacity: 0, x: isLeft ? -20 : 20 }, visible: { opacity: 1, x: 0 }}}
        initial="hidden"
        animate={controls}
        
        className={`hidden md:flex w-[42%] ${isLeft ? 'justify-start' : 'justify-end'}`}
      >
        <div className="group cursor-default">
          <p className={`text-sm font-black tracking-[0.5em] uppercase mb-2 group-hover:text-white/60 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>Timeline Segment</p>
          <h4 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{experience.date}</h4>
        </div>
      </motion.div>

      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-30">
        <motion.div 
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className={`w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center relative z-10 shadow-2xl ${isDarkMode ? ' bg-black' : ' bg-white'}`}>
            <img src={experience.icon} alt={experience.company_name} className="w-1/2 h-1/2 object-contain" />
          </div>
          <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ backgroundColor: experience.accent }} />
        </motion.div>
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        variants={{
          hidden: { opacity: 0, y: 50, rotateX: 20 },
          visible: { opacity: 1, y: 0, rotateX: 0 }
        }}
        initial="hidden"
        animate={controls}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        className="relative ml-16 md:ml-0 w-[85%] md:w-[42%] group"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-3xl -m-px p-px pointer-events-none">
            <div className={`absolute inset-0 rounded-3xl ${isDarkMode ? 'text-white' : 'text-black'}`} />
        </div>
        
        <div className={`relative  backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl overflow-hidden `}>
          <div 
            className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40 `}
            style={{ backgroundColor: experience.accent }} 
          />
          
          <div className="relative z-10">
            <h3 className={`text-3xl font-black mb-1 group-hover:translate-x-1 transition-transform ${isDarkMode ? 'text-white' : 'text-black'}`}>{experience.title}</h3>
            <p className={`font-bold text-lg mb-6 `} style={{ color: experience.accent }}>{experience.company_name}</p>
            
            <ul className="space-y-4">
              {experience.points.map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className={`text-sm leading-relaxed flex gap-4 ${isDarkMode ? 'text-white' : 'text-black'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isDarkMode ? 'text-white' : 'text-black'}`} style={{ backgroundColor: experience.accent }} />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>

          <div 
            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-transparent to-transparent transition-all duration-700 group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent w-full" 
          />
        </div>
      </motion.div>
    </div>
  );
};

const Experiences = ({ isDarkMode, toggleMode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);

  return (
    <div ref={containerRef} className="min-h-screen py-32 px-6 sm:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ opacity }} className="mb-32 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className={`uppercase tracking-[0.3em] text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Career History</span>
          </motion.div>
          <h2 className={`font-black text-6xl md:text-9xl tracking-tighter leading-[0.85] ${isDarkMode ? 'text-white' : 'text-black'}`}>
            WORK <br />
            <span className={`bg-clip-text bg-linear-to-b  ${isDarkMode ? 'text-white' : 'text-black'}`}>EXPERIENCE.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-px h-full bg-white/5" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-px h-full bg-linear-to-b from-blue-500 via-purple-500 to-transparent z-10"
          />

          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} index={i} isDarkMode={isDarkMode} toggleMode={toggleMode} />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default Experiences;