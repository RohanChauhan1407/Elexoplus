import { TrashIcon } from '../Store/Icons';

// --- CartItemCard Component (from previous steps) ---
const CartItemCard = ({ product, onRemove, onQuantityChange }) => { // Added onRemove and onQuantityChange props
    // Use prop or default data
    const item = product || {
        id: 1,
        name: 'Product Name Here - Can be Longer',
        category: 'Product Category',
        price: '2100.00',
        imageUrl: 'https://placehold.co/200x200/4B5563/FFFFFF?text=Product' // Darker placeholder
    };

    // State is managed by the parent CartPage now for quantity
    // const [quantity, setQuantity] = useState(item.quantity || 1); // Get initial quantity from props

    // Updated handlers to call props
    const increment = () => onQuantityChange(item.id, (item.quantity || 1) + 1);
    const decrement = () => onQuantityChange(item.id, Math.max(1, (item.quantity || 1) - 1)); // Ensure quantity doesn't go below 1

    return (
        // Main card container: Always horizontal row, items stretch vertically
        <div className="flex flex-row w-full p-4 bg-lightGray text-white rounded-lg gap-4 items-stretch">

            {/* Product Image - Reduced size slightly on smaller screens */}
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0 self-center sm:self-auto" // Center image vertically on smallest screens
                // Basic fallback placeholder
                 onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/4B5563/FFFFFF?text=Error'; }}
            />

            {/* Content Area: Takes remaining space, stacks info and controls vertically */}
            <div className="flex-1 flex flex-col justify-between w-full"> {/* Removed md:w-auto */}

                {/* Top section: Product Info + Delete Button */}
                <div className="flex justify-between items-start w-full">
                    {/* Product Info */}
                    <div className="flex-1 mr-2 sm:mr-4"> {/* Reduced margin slightly on small screens */}
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 break-words">{item.name}</h2>
                        <p className="text-xs sm:text-sm text-gray-400 mb-2">{item.category}</p>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={onRemove} // Use onRemove prop
                        className="text-red-500 hover:text-red-400 p-1 flex-shrink-0" // Added padding for easier tap
                        aria-label="Remove item"
                    >
                        <TrashIcon />
                    </button>
                </div>

                 {/* Bottom section: Price + Quantity Selector */}
                 {/* Stacks vertically on xs, row on sm+ */}
                 <div className="flex items-start flex-row justify-between sm:items-center mt-2 w-full gap-2 sm:gap-4">
                     {/* Price */}
                     <p className="text-base sm:text-lg md:text-xl font-bold text-yellow">₹ {item.price}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center bg-black border border-white/40 rounded-full px-1 py-1 self-start sm:self-auto"> {/* Align start on xs */}
                        <button
                            onClick={decrement}
                            className="text-white text-lg font-bold rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-700" // Adjusted size
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        {/* Display quantity from props */}
                        <span className="text-sm sm:text-base md:text-lg font-semibold min-w-[1.5rem] sm:min-w-[2rem] text-center mx-1 px-1 sm:mx-2 sm:px-2">{item.quantity || 1}</span> {/* Adjusted size/min-width */}
                        <button
                            onClick={increment}
                            className="text-white text-lg font-bold rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-700" // Adjusted size
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                 </div>

            </div>
        </div>
    );
};

export default CartItemCard;