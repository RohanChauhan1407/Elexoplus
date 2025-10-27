import { Link } from 'react-router-dom'

// --- Product Card ---
const ProductCard = ({ product }) => (
  <Link to='/product'>   
  <div className="w-full">
    <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://placehold.co/400x400/F3F4F6/9CA3AF?text=Image+Not+Found';
        }}
      />
    </div>
    <div className="mt-2">
      <h3 className="font-medium text-white">{product.name}</h3>
      {/* Display the new category */}
      <p className="text-gray-400 text-sm">{product.category}</p>
      <p className="font-medium text-yellow mt-1">
        ₹ {product.price.toLocaleString('en-IN')}
      </p>
    </div>
  </div>
    </Link>
);
export default ProductCard;