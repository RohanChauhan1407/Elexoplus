import React from 'react';
// --- Custom CSS for the Background Animation (Same as ContactPage) ---
export const backgroundStyles = `
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
    box-shadow: 0 0 8px #FACC15, 0 0 16px #FACC15; /* yellow-400 glow */
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
    box-shadow: 0 0 12px #FDE047, 0 0 24px #FDE047; /* yellow-300 glow */
  }
}

.ball {
  position: absolute;
  border-radius: 9999px;
  background-color: #FACC15; /* Tailwind yellow-400 */
  animation: pulse ease-in-out infinite;
}

/* New: Fade-in animation for content blocks */
@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInSlideUp {
  animation: fadeInSlideUp 0.8s ease-out forwards;
}

/* Delayed animations for sequential appearance */
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-400 { animation-delay: 0.4s; }
.animate-delay-600 { animation-delay: 0.6s; }
.animate-delay-800 { animation-delay: 0.8s; }

/* --- NEW STYLES FOR HEADING --- */

/* New: Text shadow for main heading */
.text-glow-yellow {
  text-shadow: 0 0 10px #facc15a0, 0 0 20px #facc15a0; /* yellow-400 with opacity */
}

/* New: Decorative underline for the "ABOUT US" subtitle */
.fancy-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 12px; /* Space for the underline */
}

.fancy-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px; /* Width of the underline */
  height: 3px; /* Thickness of the underline */
  background-color: #FACC15; /* yellow-400 */
  border-radius: 2px;
  box-shadow: 0 0 10px #FACC15; /* Glow effect */
  
  /* Added a small pulse animation to the line */
  animation: pulse-line 2.5s ease-in-out infinite;
}

@keyframes pulse-line {
  0%, 100% {
    opacity: 0.7;
    width: 60px;
  }
  50% {
    opacity: 1;
    width: 80px;
  }
}
`;

// --- Helper Function for Background Balls (Same as ContactPage) ---
const createBalls = (numBalls) => {
  return Array.from({ length: numBalls }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.floor(Math.random() * 8) + 3}px`,
    animationDelay: `${Math.random() * -5}s`,
    animationDuration: `${Math.random() * 4 + 3}s`,
  }));
};

// --- Pulsing Background Component (Same as ContactPage) ---
export const PulsingBackground = () => {
  // Using React.useState to initialize balls only once
  const [balls] = React.useState(() => createBalls(40)); 

  return (
    <div
      className="fixed inset-0 bg-black z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {balls.map((ball, index) => (
        <div
          key={index}
          className="ball"
          style={{
            top: ball.top,
            left: ball.left,
            width: ball.size,
            height: ball.size,
            animationDelay: ball.animationDelay,
            animationDuration: ball.animationDuration,
          }}
        />
      ))}
    </div>
  );
};