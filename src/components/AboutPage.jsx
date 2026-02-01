import React from 'react';

const SkillSection = ({ title, icons, isDarkMode, toggleMode  }) => {
  return (
    <div className="flex flex-col gap-8 mb-5">
      <h3 className={`text-[22px] font-bold tracking-[3px] uppercase ${isDarkMode ? ' text-white' : ' text-black'}`}>
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-12 items-center pl-1">
        {icons.map((tech, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-all group-hover:drop-shadow-[0_0_15px_rgba(145,94,255,0.6)]">
              <img 
                src={tech.logoUrl} 
                alt={tech.name} 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + tech.name }}
              />
            </div>
            
            <span className={`text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest text-center ${isDarkMode ? ' text-white' : ' text-black'}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = ({ isDarkMode, toggleMode }) => {
  const skillGroups = [
    {
      title: "Frontend Development",
      icons: [
        { name: "HTML5", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "React JS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next JS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }
      ]
    },
    {
      title: "Backend Development",
      icons: [
        { name: "Node JS", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", logoUrl: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png" },
        { name: "Java", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Spring Boot", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" }
      ]
    },
    {
      title: "Database Systems",
      icons: [
        { name: "PostgreSQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Tools & Analytics",
      icons: [
        { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Github", logoUrl: "https://i.postimg.cc/W4tCnDHg/2167e197-35e8-402b-9632-23cbf3e2bad4.png" },
        { name: "VS Code", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Power BI", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/500px-New_Power_BI_Logo.svg.png" }
      ]
    },
    {
      title: "Video Editing Tool",
      icons: [
        { name: "Primere Pro", logoUrl: "https://static.vecteezy.com/system/resources/thumbnails/046/437/285/small_2x/adobe-premiere-pro-icon-free-png.png" },
        { name: "VN App", logoUrl: "https://static.vecteezy.com/system/resources/thumbnails/052/925/019/small_2x/vn-logo-on-a-transparent-background-free-png.png" }
      ]
    },
    {
      title: "AI Tools",
      icons: [
        { name: "ChatGPT", logoUrl: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png" },
        { name: "Gemini", logoUrl: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/gemini-app-icon-hd.png" },
        { name: "Gamma", logoUrl: "https://i.postimg.cc/5yyByNBf/Gamma-App-Logo-removebg-preview.png" }
      ]
    }
  ];

  return (
    <div className=" min-h-screen font-sans selection:bg-[#915eff] overflow-x-hidden">
      {/*  Font styles */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" />
      <style>{`
        body { margin: 0; font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="max-w-7xl mx-auto px-6 sm:px-16 py-12 sm:py-24 flex flex-col gap-10">
        
        <div className="flex flex-col gap-2">
          <p className={`text-[14px] sm:text-[18px] uppercase tracking-widest font-medium ${isDarkMode ? ' text-white' : ' text-black'}`}>
            Introduction
          </p>
          <h2 className={` font-black text-[40px] sm:text-[60px] ${isDarkMode ? ' text-white' : ' text-black'}`}>
            Overview.
          </h2>
        </div>

        <p className={`mt-4 text-[17px] max-w-4xl leading-7.5 ${isDarkMode ? ' text-white' : ' text-black'}`}>
          I am a motivated and detail-oriented Web Developer with hands-on experience in Technical Project Management and frontend development. 
          
          During my tenure at the Indian Institute of Public Administration (IIPA), under the guidance of Prof. Charru Malhotra, I worked on technical project management initiatives and built an interactive dashboard using Power BI and Next.js to enable data-driven decision-making.
          
          Currently, I work as a Web Developer at IIPA, where I focus on creating responsive, scalable, and user-centric web applications. 
          
          I am an IBM SkillsBuild-certified Frontend Developer and an active open-source contributor, having worked on 5+ projects under SWOC’25.
          
          I am curious, growth-driven, and always open to collaborating with like-minded individuals on meaningful tech solutions.
        </p>

        <div className={`mt-10 flex flex-col gap-12 ${isDarkMode ? ' text-white' : ' text-black'}`}>
          {skillGroups.map((group, index) => (
            <SkillSection key={index} title={group.title} icons={group.icons} isDarkMode={isDarkMode} toggleMode={toggleMode}/>
          ))}
        </div>
        
      </section>
    </div>
  );
};

export default AboutPage;