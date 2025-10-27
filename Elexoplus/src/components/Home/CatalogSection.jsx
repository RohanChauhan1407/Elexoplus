import React from 'react';

// Using dummy data
// Update these using backend with admin panel
const catalogItems = [
    {
        title: 'Heating Appliances',
        imageUrl: 'https://placehold.co/600x800/1A1A1A/FFFFFF?text=Heating'
    },
    {
        title: 'Summer Collection',
        imageUrl: 'https://placehold.co/600x400/1A1A1A/FFFFFF?text=Summer'
    },
    {
        title: 'Winter Collection',
        imageUrl: 'https://placehold.co/600x400/1A1A1A/FFFFFF?text=Winter'
    },
    {
        title: 'Kitchen Appliances',
        imageUrl: 'https://placehold.co/1220x400/1A1A1A/FFFFFF?text=Kitchen'
    },
];

// Reusable Card component for each catalog item
// Added layoutClass prop to handle dynamic grid spans
const CatalogCard = ({ title, imageUrl, layoutClass = "" }) => {
    return (
        <div className={`group relative rounded-lg overflow-hidden cursor-pointer shadow-lg border-2 border-yellow/30 hover:border-yellow transition-all duration-300 ease-in-out ${layoutClass}`}>
            {/* Background Image with Zoom Effect */}
            <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
            />
            
            {/* Text Overlay with "Pop Up" Animation */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent transform translate-y-1/4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <h3 className="text-white text-xl font-semibold flex items-center hover:underline ">
                    {title}
                    <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">&#8594;</span>
                </h3>
            </div>
        </div>
    );
};

// Main Section Component
function CatalogSection() {
    return (
        <section className="bg-black py-16 px-4">
            <div className="container mx-auto">
                <div className='border-b-1 border-white/40 mb-8 w-max'>
                <h2 className="text-3xl font-bold text-white/80 mb-2 inline-block pr-7 md:pr-10">Discover Our Range</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-2 md:gap-6">
                    {/* Item 1: 1 col, 2 rows */}
                    <CatalogCard 
                        title={catalogItems[0].title} 
                        imageUrl={catalogItems[0].imageUrl} 
                        layoutClass="row-span-2"
                    />
                    
                    {/* Item 2: 1 col, 1 row */}
                    <CatalogCard 
                        title={catalogItems[1].title} 
                        imageUrl={catalogItems[1].imageUrl}
                    />
                    
                    {/* Item 3: 1 col, 1 row */}
                    <CatalogCard 
                        title={catalogItems[2].title} 
                        imageUrl={catalogItems[2].imageUrl}
                    />

                    {/* Item 4: 2 cols, 1 row */}
                    <CatalogCard 
                        title={catalogItems[3].title} 
                        imageUrl={catalogItems[3].imageUrl} 
                        layoutClass="col-span-2 md:col-span-2"
                    />
                </div>
            </div>
        </section>
    );
}

export default CatalogSection;

