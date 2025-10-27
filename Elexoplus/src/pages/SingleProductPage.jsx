import React, { useState } from 'react';
import ProductDetailsTabs from '../components/SingleProductPage/ProductDetailsTabs';
import ProductCarousel from '../components/Home/ProductCarousel';


// Mock data for the product
const product = {
    name: 'SMART AIR OXYFLO HIGH SPEED',
    category: 'Summer Appliance',
    mrp: 3000,
    price: 2100,
    discount: 30,
    powerOptions: ['35 W', '40 W', '45 W'],
    images: [
        'https://placehold.co/600x600/F0F0F0/B0B0B0?text=Main+Fan+Image',
        'https://placehold.co/100x100/F0F0F0/B0B0B0?text=Thumb+1',
        'https://placehold.co/100x100/F0F0F0/B0B0B0?text=Thumb+2',
        'https://placehold.co/100x100/F0F0F0/B0B0B0?text=Thumb+3',
        'https://placehold.co/100x100/F0F0F0/B0B0B0?text=Thumb+3',
        'https://placehold.co/100x100/F0F0F0/B0B0B0?text=Thumb+3',
    ]
};


export default function SingleProductPage() {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedPower, setSelectedPower] = useState(product.powerOptions[0]);
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="min-h-screen bg-black text-gray-200">
            {/* Custom styles to hide scrollbar */}
            <style>{`
                .thumbnail-scroll::-webkit-scrollbar {
                    display: none; /* Hide scrollbar for Webkit */
                }
                .thumbnail-scroll {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
            
            {/* Page content needs padding to avoid being hidden by the fixed header */}
            <div className="container mx-auto pt-24 md:pt-32 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                         {/* Thumbnails - Horizontal scroll on mobile, vertical scroll on desktop */}
                        <div className="flex flex-row overflow-x-auto gap-2 md:gap-3 md:flex-col md:w-32 md:overflow-y-auto md:max-h-[500px] thumbnail-scroll md:pr-2">
                            {product.images.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg cursor-pointer overflow-hidden border-2 transition-all
                                        ${selectedImage === img ? 'border-yellow' : 'border-transparent hover:border-gray-300'}
                                    `}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image - Reduced height on mobile (h-[300px]) */}
                        <div className="w-full h-[300px] md:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                                src={selectedImage} 
                                alt="Main product" 
                                className="w-full h-full object-contain transition-transform duration-300 ease-in-out" 
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center py-4 md:py-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">{product.name}</h1>
                        <p className="text-lg text-gray-500 mb-4">{product.category}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl font-bold text-gray-300">₹ {product.price.toLocaleString()}</span>
                            <span className="text-xl text-gray-400 line-through">₹ {product.mrp.toLocaleString()}</span>
                            <span className="text-sm font-semibold bg-yellow text-gray-900 px-3 py-1 rounded-full">
                                -{product.discount}%
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Inclusive of all taxes</p>

                        {/* Power Options */}
                        <div className="mb-6">
                            <h3 className="text-md font-semibold text-gray-400 mb-3">Choose Power</h3>
                            <div className="flex gap-3">
                                {product.powerOptions.map((power) => (
                                    <button
                                        key={power}
                                        onClick={() => setSelectedPower(power)}
                                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 border-2
                                            ${selectedPower === power 
                                                ? 'bg-yellow border-yellow text-gray-900' 
                                                : 'bg-gray-200 border-gray-200 text-gray-600 hover:bg-gray-300'}
                                        `}
                                    >
                                        {power}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <div className="flex items-center bg-white/1 border border-white/40 text-white rounded-full w-48 justify-between">
                                <button 
                                    onClick={decrementQuantity}
                                    className="px-5 py-3 text-2xl font-bold rounded-l-lg "
                                    aria-label="Decrement quantity"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold border-x px-10" aria-live="polite">{quantity}</span>
                                <button 
                                    onClick={incrementQuantity}
                                    className="px-5 py-3 text-2xl font-bold rounded-r-lg "
                                    aria-label="Increment quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="w-full md:w-auto bg-yellow text-gray-900 font-bold text-lg px-20 py-4 rounded-full hover:bg-yellow-400 transition-colors duration-300">
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>

            {/* Product Details & Reviews Section */}
            <div className="bg-black mt-12 md:mt-16 py-8">
                <ProductDetailsTabs />
                <ProductCarousel title={'Similar Items'}/>
            </div>
        </div>
    );
}