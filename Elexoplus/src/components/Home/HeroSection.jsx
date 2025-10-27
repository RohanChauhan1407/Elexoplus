import React, { useEffect } from 'react';

// --- CSS Keyframes for Scrolling Animation ---
// Now includes horizontal animations
const animationStyles = `
  @keyframes scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scroll-down {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
  .animate-scroll-up {
    animation-name: scroll-up;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .animate-scroll-down {
    animation-name: scroll-down;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  /* NEW: Horizontal Animations */
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scroll-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-scroll-left {
    animation-name: scroll-left;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .animate-scroll-right {
    animation-name: scroll-right;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

/**
 * Vertical Scrolling Column (for Desktop)
 */
const ScrollingColumn = ({ images, animationClass, duration = "60s" }) => (
  <div 
    className={`flex-1 flex flex-col gap-4 md:gap-6 ${animationClass}`}
    style={{ animationDuration: duration }}
  >
    {/* Render images twice for the infinite loop */}
    {images.map((src, index) => (
      <img 
        key={`col-${index}`} 
        src={src} 
        alt={`scrolling product ${index + 1}`} 
        className="w-full h-auto rounded-lg shadow-xl object-cover" 
      />
    ))}
    {images.map((src, index) => (
      <img 
        key={`col-dup-${index}`} 
        src={src} 
        alt={`scrolling product ${index + 1}`} 
        className="w-full h-auto rounded-lg shadow-xl object-cover" 
      />
    ))}
  </div>
);

/**
 * NEW: Horizontal Scrolling Row (for Mobile)
 */
const ScrollingRow = ({ images, animationClass, duration = "60s" }) => (
  <div 
    className={`flex flex-row w-max gap-4 ${animationClass}`}
    style={{ animationDuration: duration }}
  >
    {/* Render images twice for the infinite loop */}
    {images.map((src, index) => (
      <img 
        key={`row-${index}`}
        src={src} 
        alt={`scrolling product ${index + 1}`} 
        className="h-24 w-auto flex-shrink-0 rounded-lg shadow-xl object-cover" // Fixed height for rows, reduced to h-24
      />
    ))}
    {images.map((src, index) => (
      <img 
        key={`row-dup-${index}`}
        src={src} 
        alt={`scrolling product ${index + 1}`} 
        className="h-24 w-auto flex-shrink-0 rounded-lg shadow-xl object-cover" // Fixed height for rows, reduced to h-24
      />
    ))}
  </div>
);


/**
 * UPDATED: ImageScroller Component
 * Renders vertical columns on desktop and horizontal rows on mobile.
 */
const ImageScroller = ({ 
  column1Images, 
  column2Images, 
  animationSpeed = "60s"
}) => {
  
  // This hook injects all keyframe animations into the document head
  useEffect(() => {
    const styleId = 'infinite-scroll-animations';
    // Check if styles are already injected
    if (document.getElementById(styleId)) {
      return;
    }
    
    const styleTag = document.createElement("style");
    styleTag.id = styleId;
    styleTag.innerHTML = animationStyles;
    document.head.appendChild(styleTag);

    // Cleanup function
    return () => {
        const style = document.getElementById(styleId);
        if (style) {
            style.remove();
        }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="w-full h-full bg-gray-900">
      {/* Vertical Scroller (Desktop: visible above md) */}
      <div className="relative hidden md:flex w-full h-full gap-4 md:gap-6 p-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <ScrollingColumn 
          images={column1Images} 
          animationClass="animate-scroll-up"
          duration={animationSpeed} 
        />
        <ScrollingColumn 
          images={column2Images} 
          animationClass="animate-scroll-down" 
          duration={animationSpeed} 
        />
      </div>

      {/* Horizontal Scroller (Mobile: hidden above md) */}
      {/* UPDATED: Now vertically centered (items-center) and contains only one row */}
      <div className="relative flex md:hidden w-full h-full items-center p-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ScrollingRow
          // UPDATED: Images are merged into one array for a single scrolling row
          images={[...column1Images, ...column2Images]}
          animationClass="animate-scroll-left"
          duration={animationSpeed}
        />
      </div>
    </div>
  );
};

// --- Image placeholder lists ---
const column1Images = [
  "https://placehold.co/400x500/333333/FDE047?text=Elexo+Fan",
  "https://placehold.co/400x400/333333/FDE047?text=Elexo+Kettle",
  "https://placehold.co/400x600/333333/FDE047?text=Elexo+Heater",
  "https://placehold.co/400x500/333333/FDE047?text=Elexo+Blender",
];

const column2Images = [
  "httpsD://placehold.co/400x600/333333/FDE047?text=Elexo+Geyser",
  "https://placehold.co/400x400/333333/FDE047?text=Elexo+Chimney",
  "https://placehold.co/400x500/333333/FDE047?text=Elexo+Mixer",
  "https://placehold.co/400x400/333333/FDE047?text=Elexo+Stove",
];

// --- Static Background Component ---
// This component renders the two static ellipses based on the image.
const StaticBackground = () => {
  return (
    <>
      {/* Ellipse 1: Upper Left (GRAY) */}
      <div 
        className="absolute w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-gray-400 rounded-full -top-20 left-[-7.5rem]" // Was -left-30
      ></div>

      {/* Ellipse 2: Lower Left (GRAY) */}
      <div 
        className="absolute w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] bg-gray-300 rounded-full top-[15rem] left-[-12.5rem]" // Was top-50 and -left-50
      ></div>
    </>
  );
};

// --- Main App Component (Displaying only the background) ---
export default function HeroSection() {
  return (
    // Main container is relative, full screen, and yellow
    <div className="relative w-screen h-screen bg-yellow overflow-hidden">
      
      {/* 1. Static Background */}
      <StaticBackground />
      
      <div className="relative z-10 flex flex-col md:flex-row h-screen w-full">
        
        {/* --- Main Content Area --- */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-16">
          {/* UPDATED: Content wrapper now handles alignment */}
          <div className="max-w-xl w-full flex flex-col items-center md:items-start">
            
            {/* NEW: Heading (Color changed to text-black) */}
            <h1 className="text-4xl md:text-5xl mt-20 font-bold text-black mb-6 text-center md:text-left">
                  Comfort <br /> Without <br /> Compromise
            </h1>
            
            {/* UPDATED: Replaced h1 with new paragraph (Color changed to text-gray-800) */}
            <p className="font-semibold text-xl md:text-xl text-gray-800 text-center md:text-left">
              Discover a collection where timeless designs meet modern craftsmanship — made to keep you cool, elegant, and effortlessly stylish all season long.
            </p>
            
            {/* NEW: Shop Now Button (Colors inverted) */}
            <button className="mt-8 bg-yellow text-black font-bold py-3 px-10 rounded-lg text-lg duration-200  ring-2 ring-black ">
              Shop Now
            </button>

            {/* UPDATED: Decorative Lines with text (Colors changed to black/gray-800) */}
            <div className="flex gap-8 md:gap-4 mt-12 items-center">
              <span className="text-black font-bold text-xs md:text-lg uppercase tracking-widest">
                5+
                <br />
                Experience
              </span>
              <div className="w-px h-16 bg-black"></div>
              <span className="text-black font-bold text-xs md:text-lg uppercase tracking-widest">
                65%
                <br />
                Energy Saving
              </span>
              <div className="w-px h-16 bg-black"></div>
              <span className="text-black font-bold text-xs md:text-lg uppercase tracking-widest">
                1996
                <br />
                Established Since
              </span>
            </div>

          </div>
        </div>

        {/* --- Scroller Container --- */}
        {/* UPDATED: Mobile height changed from h-72 to h-36 to fit the single row */}
        {/* Desktop: Fixed width on the right, full height */}
        <div className="w-full h-36 md:w-[600px] md:max-w-[600px] md:h-screen flex-shrink-0 bg-gray-900">
          <ImageScroller 
            column1Images={column1Images}
            column2Images={column2Images}
            animationSpeed="40s"
          />
        </div>

      </div>

    </div>
  );
}

