import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GitHubIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
    <path d="M511.6 76.3C264.8 76.3 64.7 276.4 64.7 523.2c0 197.5 128.1 364.8 305.7 424.1 22.3 4.1 30.5-9.7 30.5-21.5 0-10.6-.4-38.6-.6-75.7-124.3 27-150.5-59.9-150.5-59.9-20.3-51.6-49.6-65.4-49.6-65.4-40.6-27.7 3.1-27.2 3.1-27.2 44.8 3.2 68.4 46 68.4 46 39.9 68.3 104.6 48.6 130.1 37.1 4-28.9 15.6-48.6 28.4-59.8-99.2-11.3-203.5-49.6-203.5-220.9 0-48.8 17.4-88.7 46-120-4.6-11.3-20-56.7 4.4-118.4 0 0 37.5-12 123 45.9 35.6-9.9 73.8-14.9 111.8-15.1 38 .2 76.2 5.2 111.8 15.1 85.4-57.9 122.8-45.9 122.8-45.9 24.5 61.7 9.1 107.1 4.5 118.4 28.7 31.3 46 71.2 46 120 0 171.7-104.5 209.4-203.9 220.5 16 13.8 30.3 41.1 30.3 82.8 0 59.8-.5 108.1-.5 122.8 0 11.8 8.1 25.8 30.7 21.4C831.3 887.8 959.3 720.5 959.3 523.2 959.3 276.4 759.1 76.3 511.6 76.3z"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ProjectCard = ({ project, index, isDarkMode, toggleMode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group p-5 rounded-3xl w-full sm:w-90 cursor-pointer border-2 transition-colors duration-300 ${isDarkMode ? 'text-white bg-black border-white/10' : 'text-black bg-white border-gray-100 shadow-xl'
        }`}
    >
      <div
        style={{ transform: "translateZ(75px)" }}
        className="relative w-full h-57.5 overflow-hidden rounded-2xl"
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover rounded-2xl"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300/1d1836/ffffff?text=Project+Preview";
          }}
        />

        <div className="absolute top-3 right-3 flex gap-2">
          {/* GitHub Link */}
          <a
            href={project.source_code_link || "#"}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
          >
            <GitHubIcon />
          </a>
          
          <a
            href={project.live_demo_link || "#"}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-linear-to-tr from-gray-600 to-gray-800 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
          >
            <ExternalLinkIcon />
          </a>
        </div>
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="mt-6">
        <h3 className={`font-bold text-[24px] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {project.name}
        </h3>
        <p className={`mt-2 text-[14px] leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag.name} className={`text-[14px] font-medium ${tag.color}`}>
            #{tag.name}
          </span>
        ))}
      </div>
    </motion.div> 
  );
};

const Projects = ({ isDarkMode, toggleMode }) => {
  const projects = [
    {
      name: "603 Work Ved",
      description: "Our platform offers a seamless way for individuals and businesses to book exquisite spaces tailored to their unique needs and aesthetic preferences.",
      image: "https://i.postimg.cc/QCW091VV/image.png",
      tags: [
        { name: "HTML5", color: "text-orange-500" },
        { name: "CSS3", color: "text-purple-500" },
        { name: "JavaScript", color: "text-yellow-500" },
      ],
      source_code_link: "https://github.com/Gautamchandar/603WorkVed",
      live_demo_link: "https://603-work-ved.vercel.app/"
    },
    {
      name: "IIPA Dashboard PowerBI",
      description: "I designed and developed an interactive Power BI dashboard to visualize complex data, enabling insights, data-driven decision-making processes.",
      image: "https://i.postimg.cc/2jnV7GgC/image.png",
      tags: [
        { name: "Ms Excel", color: "text-green-400" },
        { name: "PowerBI", color: "text-yellow-400" },
      ],
      source_code_link: "/projects",
      live_demo_link: "https://drive.google.com/drive/folders/1axATOj08-DhBzdhUshql-HsqCjQ6-l8k?usp=sharing"
    },
    {
      name: "Hair Care UI",
      description: "Demi Hair Care offers premium, science-backed products for stronger, shinier hair, nourishing roots, repairing damage confidence naturally.",
      image: "https://i.postimg.cc/4ypDrmVQ/image.png",
      tags: [
        { name: "React Js", color: "text-blue-400" },
        { name: "MySQL", color: "text-blue-500" },
        { name: "TailwindCSS", color: "text-blue-800" },
      ],
      source_code_link: "https://github.com/Gautamchandar/demi-app",
      live_demo_link: "https://demi-app.vercel.app/"
    },
    {
      name: "Thanks to IIPA Officers",
      description: "Heartfelt thanks to IIPA officers for guiding me throughout the journey, providing constant support and motivation at every step.",
      image: "https://i.postimg.cc/3JTNWGSw/image.png",
      tags: [
        { name: "React Js", color: "text-blue-400" },
        { name: "TailwindCSS", color: "text-blue-800" },
      ],
      source_code_link: "https://github.com/Gautamchandar/thanksofficers",
      live_demo_link: "https://thanksofficers.vercel.app/"
    },
    {
      name: "R & D Dummy ProtoType",
      description: "A dummy R&D prototype designed to showcase research projects, innovation models, and scalable digital transformation concepts.",
      image: "https://i.postimg.cc/mgbYqwqx/image.png",
      tags: [
        { name: "React Js", color: "text-blue-400" },
        { name: "TailwindCSS", color: "text-blue-800" },
      ],
      source_code_link: "https://github.com/Gautamchandar/rndprototype",
      live_demo_link: "https://rndpage.vercel.app/"
    },
  ];

  return (
    <div className={`min-h-screen py-20 px-6 sm:px-16 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <header>
          <p className={`uppercase tracking-widest font-medium text-[14px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>My work</p>
          <h2 className={`font-black md:text-[60px] text-[40px] ${isDarkMode ? 'text-white' : 'text-black'}`}>Projects :)</h2>
        </header>
        <div className="mt-20 flex flex-wrap gap-10 justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} project={project} isDarkMode={isDarkMode} toggleMode={toggleMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;