import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDown, X, Maximize2 } from 'lucide-react';

const useAtroposEffect = () => {
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    setStyle({
      transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: 'transform 0.1s ease-out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
  }, []);

  return { cardRef, style, handleMove, handleLeave };
};

const FullscreenModal = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-110"
      >
        <X size={24} />
      </button>

      <div 
        className="relative max-w-6xl w-full aspect-16/10 bg-black rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black via-black/40 to-transparent">
          <span className="inline-block px-3 py-1 rounded font-bold text-white uppercase mb-1">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const ParallaxBox = ({ item, onClick }) => {
  const { cardRef, style, handleMove, handleLeave } = useAtroposEffect();
  const depth = "30px";

  return (
    <div 
      className="relative group cursor-pointer"
      style={{ perspective: '2000px' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onClick(item)}
    >
      <div
        ref={cardRef}
        style={{
          ...style,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-16/10 transition-transform duration-100 ease-out"
      >
        <div 
          className="absolute inset-0 z-20 rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10"
          style={{ transform: 'translateZ(15px)' }}
        >
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 justify-between">
            <div className="flex items-center gap-1.5">
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-white font-bold text-[8px]">
              <Maximize2 size={10} />
              EXPAND
            </div>
          </div>

          <div className="absolute inset-0 z-30 pointer-events-none bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="absolute inset-0 z-40 flex flex-col justify-end p-6 bg-linear-to-t from-black/90 via-black/20 to-transparent">
             <div style={{ transform: 'translateZ(30px)' }}>
                <span className="inline-block px-2 py-0.5 rounded text-[9px]  text-white uppercase mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl md:text-2xl text-white leading-none  drop-shadow-lg">
                  {item.title}
                </h3>
             </div>
          </div>
        </div>

        <div 
          className="absolute top-0 bottom-0 bg-[#111] border-r border-white/5 flex items-center justify-center overflow-hidden rounded-l-sm"
          style={{ 
            width: depth,
            left: '0',
            transform: `translateX(-100%) rotateY(-90deg)`,
            transformOrigin: 'right center',
          }}
        >
           <div className="rotate-90 text-[7px] font-bold text-gray-600 whitespace-nowrap uppercase tracking-[0.3em]">
             Serial: {item.id}00X4
           </div>
        </div>

        <div 
          className="absolute left-0 right-0 bg-[#222] rounded-t-sm"
          style={{ 
            height: depth,
            top: '0',
            transform: `translateY(-100%) rotateX(90deg)`,
            transformOrigin: 'center bottom',
          }}
        />

        <div 
          className="absolute inset-x-4 -bottom-2.5 h-8 bg-black/60 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: 'translateZ(-20px)' }}
        />
      </div>
    </div>
  );
};

const Certificates = ({ isDarkMode, toggleMode }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  // Initial State
  const [items, setItems] = useState([
    { id: 1, title: "Create an intelligent document processing solution with Azure AI Document Intelligence", category: "Microsoft", image: "../src/assets/mycertificates/first.png" },
    { id: 2, title: "Build a natural language processing solution with Azure AI Language", category: "Microsoft", image: "../src/assets/mycertificates/second.png" },
    { id: 3, title: "Microsoft AI Skill Challenge", category: "Microsoft", image: "../src/assets/mycertificates/third.png" },
    { id: 4, title: "Gen AI Study Jams", category: "Google Cloud", image: "../src/assets/mycertificates/fourth.png" },
  ]);

  // The master list of items that exist in our database
  const DATABASE_ITEMS = [
    { id: 5, title: "Bharatiya Sakshya Adhiniyam", category: "MyGov", image: "../src/assets/mycertificates/fifth.png" },
    { id: 6, title: "SQL Module", category: "Newton School", image: "../src/assets/mycertificates/sixth.png" },
    { id: 7, title: "Internship Certificate", category: "IBM", image: "../src/assets/mycertificates/seventh.png" },
    { id: 8, title: "Yuva AI for All", category: "India AI", image: "../src/assets/mycertificates/eighth.png" },
    { id: 9, title: "MoSPI & MyGov", category: "MyGov", image: "../src/assets/mycertificates/nineth.png" },
    { id: 10, title: "Frontend Developer", category: "SWOC'25", image: "../src/assets/mycertificates/tenth.png" },
    { id: 11, title: "Master class of Figma", category: "Physics Wallah", image: "../src/assets/mycertificates/eleventh.png" },
    { id: 12, title: "Frontend Developer(React)", category: "HackerRank", image: "../src/assets/mycertificates/twelevth.png" },
    { id: 13, title: "Hackathon", category: "MAIT, Rohini", image: "../src/assets/mycertificates/thirteenth.png" },
    { id: 14, title: "AINCAT 2025", category: "Naukri Campus", image: "../src/assets/mycertificates/fourteenth.png" },
    { id: 15, title: "Frontend Battle 2.0", category: "IIT Bhubaneswar", image: "../src/assets/mycertificates/fifteenth.png" },
  ];

  const loadMore = () => {
    if (allLoaded) return;
    setLoading(true);

    setTimeout(() => {
      const itemsToAdd = DATABASE_ITEMS.filter(
        dbItem => !items.some(existingItem => existingItem.id === dbItem.id)
      ).slice(0, 2); 
      
      if (itemsToAdd.length > 0) {
        const updatedItems = [...items, ...itemsToAdd];
        setItems(updatedItems);
        
        if (updatedItems.length >= (4 + DATABASE_ITEMS.length)) {
          setAllLoaded(true);
        }
      } else {
        setAllLoaded(true);
      }
      
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen  font-sans overflow-x-hidden selection:bg-blue-500">
      <div className={`fixed inset-0 pointer-events-none ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 mb-4">
              <span className="text-xs font-black uppercase tracking-[0.4em]">A part of my life</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              𝓘𝓷𝓽𝓮𝓻𝓪𝓬𝓽𝓲𝓿𝓮 <span className="text-gray-600">𝓒𝓮𝓻𝓽𝓲𝓯𝓲𝓬𝓪𝓽𝓮 </span>
            </h1>
            <p className={`text-lg md:text-xl font-light ${isDarkMode ? 'text-white' : 'text-black'}`}>
              A visual representation of my academic, technical, and professional achievements over time. Each certificate reflects a milestone in my learning and professional journey.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="h-20 w-px bg-white/10 hidden md:block mx-4" />
             <div className="text-right">
                <p className={`text-[10px]  uppercase tracking-widest mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Current Total Certificate</p>
                <p className={`text-4xl font-black  ${isDarkMode ? 'text-white' : 'text-black'}`}>{items.length}</p>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {items.map((item) => (
            <ParallaxBox key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>

        {!allLoaded && (
          <div className="mt-32 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative px-16 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  Expand Collection
                  <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </div>
              )}
              <div className="absolute inset-0 bg-blue-500 -z-10 translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-200" />
            </button>
          </div>
        )}
        
        {allLoaded && (
          <div className="mt-32 text-center animate-in fade-in duration-1000">
            <p className={`text-[10px] font-black uppercase tracking-[1em] ${
          isDarkMode ? ' text-white' : ' text-black'
        }`}>End of my achievements</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <FullscreenModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

    </div>
  );
};

export default Certificates;