import React, { useState } from 'react';

// Simple Mail Icon SVG
const MailIcon = ({ className = "h-5 w-5" }) => ( // Added className prop
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

// Simple Check Icon SVG for success
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'submitting') return; // Prevent multiple submissions

        setStatus('submitting');
        setMessage('');

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            // Reset status after showing error for a bit
             setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        // --- Simulate API Call ---
        console.log('Submitting email:', email);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // Simulate success/error randomly for demo
        const success = Math.random() > 0.3; // 70% chance of success
        if (success) {
            setStatus('success');
            setMessage('Thank you for subscribing!');
            setEmail(''); // Clear input on success
            // Optionally reset status after a few seconds
            setTimeout(() => { setStatus('idle'); setMessage(''); }, 3000);
        } else {
            setStatus('error');
            setMessage('Subscription failed. Please try again.');
            // Optionally reset status after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        }
        // --- End Simulation ---
    };

    return (
        // Changed main container to flex layout for large screens
        <div className="w-full max-w-4xl mx-auto text-white mb-20 p-8 sm:p-10 shadow-2xl border border-yellow flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* Left Column: Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-600">Stay Updated!</h2>
                <p className="text-white/60 text-sm sm:text-base">Subscribe to our newsletter for the latest products and offers.</p>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-1/2">
                {/* Form layout stacks vertically */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3"> {/* Removed sm:flex-row and related classes */}
                    {/* Email Input with Icon */}
                    <div className="relative w-full"> {/* Removed flex-grow */}
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="newsletter-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            // Increased padding-left to accommodate icon
                            className="w-full p-4 pl-12 border border-white/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                            disabled={status === 'submitting'}
                        />
                    </div>

                    {/* Submit Button with hover effect */}
                    <button
                        type="submit"
                        // Changed width back to full
                        className={`w-full flex-shrink-0 bg-yellow text-black font-bold text-lg px-6 py-3.5 rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center ${status === 'submitting' ? 'opacity-70 cursor-not-allowed scale-100' : ''}`} // Disable scale on submitting
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-black mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* Added margin */}
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {/* Adjusted text */}
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                               {/* Adjusted text */} Subscribe
                            </>
                        )}
                    </button>
                </form>

                {/* Status Messages - Centered under the form */}
                {message && (
                    // Added flex alignment for icon + text
                    <p className={`mt-5 text-center text-sm flex items-center justify-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                       {status === 'success' && <CheckIcon />} {message}
                    </p>
                )}
            </div> {/* End Right Column */}
        </div> // End Main Container
    );
};

export default NewsletterSubscription;

