import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo.png'

const Footer = () => {
    // useRef to get a reference to the main container of the items to be animated
    const footerContainerRef = useRef(null);

    // useEffect is the React hook equivalent of "on component mount" or "DOMContentLoaded"
    // The empty dependency array [] ensures this code runs only once after the component renders
    useEffect(() => {
        // To resolve the issue where the 'gsap' module might not be found during the build process,
        // we dynamically load the GSAP library from a CDN. This makes the component self-contained.
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;

        // Once the script is loaded, we can run our animation.
        script.onload = () => {
            // GSAP is now available on the global 'window' object
            const items = footerContainerRef.current.querySelectorAll('.footer-item');
            
            // Set the initial state of the items
            window.gsap.set(items, { y: 40, opacity: 0 });
            
            // Animate to the final state
            window.gsap.to(items, {
                y: 0, // Animate to y position 0
                opacity: 1, // Animate to full opacity
                duration: 1.5, // Duration of the animation for each item
                stagger: 0.2, // Stagger the start time of each item's animation by 0.2s
                ease: "power3.out", // The easing function for a smooth effect
            });
        };

        document.body.appendChild(script);

        // It's good practice to clean up by removing the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <footer className="bg-black p-10 text-white font-sans border-t border-white mt-auto">
            <div ref={footerContainerRef} className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Column 1: Logo and Address */}
                <div className="footer-item">
                    <img src={logo} alt="Elexo Logo" className="w-44 mb-3" />
                    <p className="text-gray-400 leading-relaxed">
                        <strong>Address:</strong> 10-481, Bhagat Singh Marg, near RTO ROAD,
                        Sector 9, RIICO INDUSTRIAL AREA, U.I.T, Bhiwadi,
                        Rajasthan 301019
                    </p>
                </div>

                {/* Column 2: Contact Information */}
                <div className="footer-item justify-self-center self-center">
                    <h3 className="font-bold text-lg mb-4 justify-self-center">Contact Information</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li className='justify-self-center'>Mail : <a href="mailto:SALES@ELEXOPLUS.IN" className="hover:text-white">SALES@ELEXOPLUS.IN</a></li>
                        <li className='justify-self-center'>TOLL FREE NO : <a href="tel:01493-451354" className="hover:text-white">01493-451354</a></li>
                    </ul>
                </div>

                {/* Column 3: Important Links */}
                <div className="footer-item justify-self-center">
                    <h3 className="font-bold text-lg mb-4">Important Links</h3>
                    <ul className="space-y-2 text-gray-400 justify-self-center">
                        <li className='justify-self-center'><a href="#" className="hover:text-white">Home</a></li>
                        <li className='justify-self-center'><a href="#" className="hover:text-white">Products</a></li>
                        <li className='justify-self-center'><a href="#" className="hover:text-white">Policies</a></li>
                        <li className='justify-self-center'><a href="#" className="hover:text-white">About Us</a></li>
                        <li className='justify-self-center'><a href="#" className="hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;