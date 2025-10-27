import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png'
import { Link, NavLink } from "react-router-dom";
// We'll use a placeholder for the logo path as the asset isn't available
// import logo from '../assets/logo.png' 

const Header = () => {
    // State to manage the mobile menu's open/closed status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // State for scroll-based visibility
    const [isVisible, setIsVisible] = useState(true);
    // const [lastScrollY, setLastScrollY] = useState(0); // No longer needed for this logic

    // Effect to handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > window.innerHeight) {
                // User is below the 100vh threshold, hide the navbar
                setIsVisible(false);
            } else {
                // User is at the top of the page (within 100vh), show the navbar
                setIsVisible(true);
            }
        };

        // Add passive: true for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty dependency array, as we no longer track lastScrollY

    return (
        <>
            <header className={`fixed ${isVisible ? 'top-4 md:top-6' : '-top-full'} left-4 right-4 md:left-10 lg:left-20 md:right-10 lg:right-20 bg-black bg-opacity-90 z-30 p-2 md:p-4 shadow-lg rounded-md border-b-2 border-gray-700 transition-all duration-300 ease-in-out`}>
                <div className="w-full flex items-center justify-between px-2 md:px-6">
                    {/* Hamburger Menu Icon (Mobile) */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Logo Section (adjusts for mobile and desktop) */}
                    <div className="flex flex-grow justify-center md:justify-start md:flex-grow-0">
                        <div className="text-center md:text-left">
                            {/* Using text logo as placeholder */}
                            <Link to='/'>
                                <img src={logo} alt="Elexo Logo" className="w-24 md:w-30" />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}.
                    <nav className="hidden lg:flex space-x-3 lg:space-x-6 text-sm lg:text-base font-medium">
                        <NavLink to="/" className="text-yellow hover:text-white transition-colors duration-300">Home</NavLink>
                        <NavLink to="/store" className="text-white hover:text-yellow transition-colors duration-300">Products</NavLink>
                        <NavLink to="/contact" className="text-white hover:text-yellow transition-colors duration-300">Contact Us</NavLink>
                        <NavLink to="/about" className="text-white hover:text-yellow transition-colors duration-300">About Us</NavLink>
                    </nav>

                    {/* Right Icons: Search, Cart, User */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex xl:w-md relative items-center bg-white/1 border border-white/50 rounded-full px-4 py-2">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-white focus:outline-none placeholder-gray-500 w-24 md:w-40 lg:w-64"
                            />
                        </div>

                        {/* Mobile Search Icon */}
                        <a href="#" className="text-yellow hover:text-white transition-colors duration-300 md:hidden">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </a>

                        {/* Cart Icon */}
                        <NavLink to='/cart' className="text-yellow hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </NavLink>

                        {/* User Icon */}
                        <a href="#" className="text-yellow hover:text-white transition-colors duration-300">
                            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>

                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu (Overlay) */}
            <div className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-95 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsMenuOpen(false)} className="text-white focus:outline-none z-50">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
                    <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="text-yellow hover:text-white">Home</NavLink>
                    <NavLink to="/store" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow">Products</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow">Contact Us</NavLink>
                    <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow">About Us</NavLink>
                </nav>
            </div>
        </>
    );
};

export default Header;

