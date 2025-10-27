import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MainCard from "./MainCard";

function ProductCarousel({ title }) {
    const scrollContainerRef = useRef(null);

    // Use useEffect to add and remove the wheel event listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        
        if (container) {
            const onWheel = (e) => {
                e.preventDefault();
                gsap.to(container, {
                    scrollLeft: `+=${e.deltaY * 1.2}`, // Multiplier for scroll speed
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            };
            
            container.addEventListener('wheel', onWheel, { passive: false });
            
            // Cleanup function
            return () => {
                if (container) {
                    container.removeEventListener('wheel', onWheel);
                }
            };
        }
    }, []); // Empty dependency array ensures this runs once on mount

    const scroll = (scrollOffset) => {
        const container = scrollContainerRef.current;
        if (container) {
            gsap.to(container, {
                scrollLeft: `+=${scrollOffset}`,
                duration: 0.8,
                ease: 'power3.inOut'
            });
        }
    };

    return (
        <section className="bg-black pt-20 px-4">
                        <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className='border-b-1 border-white/40 mb-8 w-max'>
                        <h2 className="text-3xl font-bold text-white mb-2 pr-7 md:pr-10">{title}</h2>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => scroll(-300)}
                            className="bg-lightGray text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                            aria-label="Scroll left"
                        >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-5 h-5" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                            fillRule="evenodd" 
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                            />
                        </svg>
                        </button>
                        <button 
                            onClick={() => scroll(300)} 
                            className="bg-lightGray text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                            aria-label="Scroll right"
                        >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-5 h-5" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                            fillRule="evenodd" 
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                            clipRule="evenodd" 
                            />
                        </svg>
                        </button>
                    </div>
                </div>
                <div 
                    ref={scrollContainerRef} 
                    className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide cursor-pointer"
                >
                    {/* Pass a product array in the parameters and then map that array to the Maincard */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MainCard key={index} id={index + 1} />
                    ))}
                </div>
            </div>
            {/* Custom CSS to hide the scrollbar for a cleaner look */}
            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                `}
            </style>
        </section>
    );
}

export default ProductCarousel;