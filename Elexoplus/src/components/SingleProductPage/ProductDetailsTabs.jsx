import React, { useState } from 'react';

/**
 * A component to display star ratings (clickable or static).
 */
const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating && setRating(star)}
                    className={`text-2xl ${setRating ? 'cursor-pointer' : ''} ${
                        star <= rating ? 'text-yellow' : 'text-gray-600'
                    }`}
                    disabled={!setRating}
                    aria-label={`Set rating to ${star}`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

const ProductDetailsTabs = () => {
    const [activeTab, setActiveTab] = useState('details');

    // --- Specifications and Key Aspects Data ---
    const specifications = [
        { label: 'Product Code', value: 'EPSAV-150' },
        { label: 'Sweep (mm)', value: '150' },
        { label: 'Speed (RPM)', value: '1350' },
        { label: 'Power (W)', value: '35' },
        { label: 'Air Delivery (CMH)', value: '300' },
    ];
    const keyAspects = [
        'Copper coated high speed motor',
        'Suitable for window and wall mounted installation',
        'Compact Design',
        'Automatic back louvers',
        'Thermal fuse for extra safety',
    ];

    // --- Reviews State ---
    // Start with a dummy review
    const [reviews, setReviews] = useState([
        { 
            id: 1, 
            name: 'Rohit Sharma', 
            rating: 5, 
            comment: 'Excellent fan, very high speed and surprisingly quiet. The build quality is solid. Definitely recommend it.' 
        }
    ]);
    
    // State for the new review form
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [newReviewerName, setNewReviewerName] = useState('');

    // Handle review submission
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (newRating > 0 && newComment.trim() !== '' && newReviewerName.trim() !== '') {
            const newReview = {
                id: reviews.length + 2, // simple id
                name: newReviewerName,
                rating: newRating,
                comment: newComment,
            };
            setReviews([newReview, ...reviews]); // Add new review to the top
            
            // Reset form
            setNewRating(0);
            setNewComment('');
            setNewReviewerName('');
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-10 bg-lightGray text-white rounded-lg">
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`w-1/2 text-center py-3 text-lg font-semibold transition-all duration-300 ${
                        activeTab === 'details' 
                        ? 'border-b-2 border-yellow text-yellow' 
                        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                    }`}
                >
                    Product Details
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-1/2 text-center py-3 text-lg font-semibold transition-all duration-300 ${
                        activeTab === 'reviews' 
                        ? 'border-b-2 border-yellow text-yellow' 
                        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                    }`}
                >
                    Rating & Reviews
                </button>
            </div>

            {/* Tab Content */}
            <div className="py-8">
                {/* Product Details Content */}
                {activeTab === 'details' && (
                    <div className="animate-fadeIn">
                        <h2 className="text-3xl font-bold mb-6 text-white uppercase tracking-wider">Specifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
                            {specifications.map(spec => (
                                <div key={spec.label}>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-1">{spec.label}</h3>
                                    <p className="text-lg text-white font-medium">{spec.value}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-bold mb-6 text-white uppercase tracking-wider">Key Aspects</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-lg text-gray-300">
                            {keyAspects.map((aspect, index) => (
                                <li key={index}>{aspect}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Rating & Reviews Content */}
                {activeTab === 'reviews' && (
                    <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-12">
                        
                        {/* Write a Review Section */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white">Write a Review</h2>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={newReviewerName}
                                        onChange={(e) => setNewReviewerName(e.target.value)}
                                        className="w-full p-3 bg-white/10 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        rows="4"
                                        className="w-full p-3 bg-white/10 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow"
                                        placeholder="Share your thoughts about the product..."
                                    ></textarea>
                                </div>
                                                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
                                    <StarRating rating={newRating} setRating={setNewRating} />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow text-gray-900 font-bold text-lg px-8 py-3 rounded-lg hover:bg-yellow transition-colors duration-300 shadow-lg hover:shadow-yellow/50"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>

                        {/* Existing Reviews Section */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white">Customer Reviews ({reviews.length})</h2>
                            {reviews.length === 0 ? (
                                <div className="text-center text-gray-400 py-10">
                                    <p className="text-lg">No reviews yet.</p>
                                    <p>Be the first to review this product!</p>
                                </div>
                            ) : (
                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                                    {reviews.map(review => (
                                        <div key={review.id} className="bg-white/10 p-5 rounded-lg border border-gray-700">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                                                <StarRating rating={review.rating} />
                                            </div>
                                            <p className="text-gray-300">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Simple fade-in animation */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ProductDetailsTabs;

