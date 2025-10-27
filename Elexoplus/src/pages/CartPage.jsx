import React, { useState } from 'react';
import CartItemCard from '../components/Cart/CartItemCard';
import { mockCartItems } from '../assets/MockData';


const OrderSummary = ({ items }) => { // Accept items as props
    // Calculate summary based on items prop
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
    const deliveryFee = subtotal > 0 ? 50.00 : 0; // Only add delivery fee if there are items
    const total = subtotal + deliveryFee;

    return (
        <div className="w-full text-gray-300 p-6 border-x border-gray-700"> {/* Added bg and border */}
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-white font-medium">₹ {deliveryFee.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span>₹ {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Coupon Section - UPDATED for responsiveness */}
            <div className="mt-8">
                {/* Flex container: stacks on small, row on sm+ */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2">
                    <input
                        type="text"
                        id="coupon"
                        placeholder="Add Coupon"
                        className="flex-1 px-5 py-2 bg-lightGray rounded-full text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow w-full sm:w-auto" // Added w-full sm:w-auto
                    />
                    <button className="bg-black text-white/40 font-semibold px-6 py-3 rounded-full border border-white/50 hover:text-white transition-colors w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
                        Apply
                    </button>
                </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-Black text-white font-bold text-lg px-8 py-4 border border-white rounded-full transition-colors duration-300 shadow-lg mt-8 flex items-center justify-center disabled:opacity-50" disabled={items.length === 0}> {/* Disable if cart is empty */}
                Go to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
    );
};

/**
 * The main cart page component.
 */
const CartPage = () => {
    const [cartItems, setCartItems] = useState(mockCartItems);

     // Function to remove an item from the cart
     const removeItem = (itemId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
        console.log(`Removed item ${itemId} from cart state`);
    };

    // Function to update quantity
    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
         console.log(`Updated quantity for item ${itemId} to ${newQuantity}`);
    };


    return (
        <div className="min-h-screen bg-black p-4 md:p-8 text-white pt-24 md:pt-32">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8">Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items List */}
                    <div className="lg:w-2/3">
                        {cartItems.length > 0 ? (
                            <div className="space-y-6">
                                {/* Corrected the map function syntax */}
                                {cartItems.map(item => (
                                    <CartItemCard
                                        key={item.id} // Key should be here
                                        product={item}
                                        onRemove={() => removeItem(item.id)}
                                        onQuantityChange={updateQuantity} // Pass update function
                                     />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-lightGray border border-white/50 rounded-lg">
                                <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
                                <p className="mt-2">Looks like you haven't added anything to your cart yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-1/3">
                        {/* Pass cartItems to OrderSummary */}
                        <OrderSummary items={cartItems} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;