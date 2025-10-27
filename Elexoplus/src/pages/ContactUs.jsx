import React, { useState } from 'react';
import {backgroundStyles, PulsingBackground} from '../components/PulsingBackground'

/**
 * A modern, responsive "Contact Us" page with a form and an embedded map.
 * Now integrated with the pulsing yellow ball background.
 */
export default function ContactPage() {
    // State for controlled form inputs
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to a server or email service
        console.log({
            name,
            contact,
            email,
            message
        });

        // Clear form after submission
        setName('');
        setContact('');
        setEmail('');
        setMessage('');

        console.log("Form submitted successfully!");
    };

    return (
        <>
            {/* Inject the custom CSS styles for the background into the document's <head> */}
            <style>{backgroundStyles}</style>

            {/* Render the pulsing background */}
            <PulsingBackground />

            {/* Main content wrapper - ensures content is on top and has appropriate padding */}
            <div className="relative z-10 min-h-screen bg-transparent text-gray-200 p-4 md:p-8 pt-24 md:pt-32">
                <div className="container mx-auto max-w-6xl">
                    <div className="w-full max-w-5xl text-center mx-auto mb-20 md:my-20 backdrop-blur-md p-8 md:p-12 ">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                            We're Here to Help
                        </h1>
                        <p className="text-md md:text-xl text-gray-200 mb-8">
                            Your satisfaction is our priority at Elexoplus. Whether you're looking for product information, need technical assistance, or have feedback to share, we value your input. Please don't hesitate to connect with us – we're just a message or call away!
                        </p>
                        <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </button>
                        </div>
                    <div className='border-b-1 border-white/40 mb-8 w-max'>
                        <h1 className="text-3xl font-bold text-white mb-2 pr-7 md:pr-10 ">Find Us</h1>
                    </div>
                    {/* --- Main Content Grid (Map & Form) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

                        {/* --- Column 1: Map --- */}
                        <div className="w-full h-full order-2 md:order-1">
                            <div className="relative w-full h-[500px] md:h-[600px] rounded-lg shadow-xl overflow-hidden border border-yellow-400 border-opacity-30">
                                <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56193.0863335528!2d76.8152197486328!3d28.204364100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d30a501abb637%3A0x133d03d86dcfc79!2sBhiwadi%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1671234567890!5m2!1sen!2sin"
                                className="absolute top-0 left-0 w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map of Bhiwadi, Rajasthan"
                                ></iframe>
                            </div>
                        </div>


                        {/* --- Column 2: Form --- */}
                        <div className="p-0 md:p-0 order-1 md:order-2">
                            <h2 className="text-3xl font-light text-gray-100 mb-8 text-center">We're Just a Message Away</h2> {/* Changed text color for better contrast */}
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name Field */}
                                <div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        placeholder="Name"
                                    />
                                </div>

                                {/* Contact Field */}
                                <div>
                                    <input
                                        type="tel"
                                        id="contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        placeholder="Contact"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        placeholder="Email"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        placeholder="Message"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-400 text-gray-900 font-bold text-lg px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-yellow-400/50"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
