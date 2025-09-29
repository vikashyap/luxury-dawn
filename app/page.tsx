'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';


export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    if (!mounted) return;

    let animationId: number;
    let lastScrollY = 0;

    const updatePhase = () => {
      const scrollY = window.scrollY;
      
      // Only update if scroll position changed (performance optimization)
      if (Math.abs(scrollY - lastScrollY) < 1) {
        animationId = requestAnimationFrame(updatePhase);
        return;
      }
      
      lastScrollY = scrollY;
      const viewportHeight = window.innerHeight;
      const scrollRange = viewportHeight * 4;
      
      // Linear scroll mapping (no infinite reset)
      const normalizedScroll = Math.min(scrollY / scrollRange, 1);
      
      setPhase(normalizedScroll);
      
      // Update CSS custom property for gradient
      document.documentElement.style.setProperty('--phase', normalizedScroll.toString());
      
      animationId = requestAnimationFrame(updatePhase);
    };
    
    // Start the animation loop
    updatePhase();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted]);

  // Generate dynamic gradient based on phase
  const generateGradient = (phase: number) => {
    if (!mounted) {
      // Return static gradient for SSR
      return 'linear-gradient(180deg, #FFFFFF, #FFF9F5, #FFF5E6, #FFE4B5, #FFCC80, #FF8A65)';
    }
    
    const colors = [
      { r: 255, g: 255, b: 255 }, // Dawn
      { r: 255, g: 249, b: 245 }, // Pre-golden
      { r: 255, g: 245, b: 230 }, // Golden
      { r: 255, g: 228, b: 181 }, // Warm golden
      { r: 255, g: 204, b: 128 }, // Sunset
      { r: 255, g: 138, b: 101 }, // Deep sunset
    ];
    
    const gradientStops = colors.map((color, index) => {
      const intensity = Math.max(0.4, 1 - (phase * 0.6));
      const r = Math.round(color.r * intensity);
      const g = Math.round(color.g * intensity);
      const b = Math.round(color.b * intensity);
      return `rgb(${r}, ${g}, ${b})`;
    });
    
    return `linear-gradient(180deg, ${gradientStops.join(', ')})`;
  };

  // Dynamic text colors based on phase
  const getTextColors = () => {
    if (!mounted) {
      return {
        primary: '#B45309', // warm amber-orange
        secondary: '#C2410C', // rich orange
      };
    }

    // Define text color journey that complements the background
    const textColorStops = [
      { primary: { r: 120, g: 113, b: 108 }, secondary: { r: 146, g: 139, b: 134 } }, // Dawn: warm brown
      { primary: { r: 146, g: 124, b: 99 }, secondary: { r: 168, g: 146, b: 121 } },  // Early morning: amber brown
      { primary: { r: 180, g: 120, b: 60 }, secondary: { r: 194, g: 140, b: 80 } },   // Golden: rich amber
      { primary: { r: 200, g: 100, b: 40 }, secondary: { r: 220, g: 130, b: 70 } },   // Warm golden: deep amber
      { primary: { r: 220, g: 90, b: 30 }, secondary: { r: 240, g: 120, b: 60 } },    // Sunset: vibrant orange
      { primary: { r: 200, g: 80, b: 40 }, secondary: { r: 220, g: 110, b: 70 } },    // Deep sunset: warm orange
    ];

    const colorIndex = phase * (textColorStops.length - 1);
    const currentIndex = Math.floor(colorIndex);
    const nextIndex = Math.min(currentIndex + 1, textColorStops.length - 1);
    const t = colorIndex - currentIndex;

    const currentColors = textColorStops[currentIndex];
    const nextColors = textColorStops[nextIndex];

    // Interpolate primary color
    const primaryR = Math.round(currentColors.primary.r + (nextColors.primary.r - currentColors.primary.r) * t);
    const primaryG = Math.round(currentColors.primary.g + (nextColors.primary.g - currentColors.primary.g) * t);
    const primaryB = Math.round(currentColors.primary.b + (nextColors.primary.b - currentColors.primary.b) * t);

    // Interpolate secondary color
    const secondaryR = Math.round(currentColors.secondary.r + (nextColors.secondary.r - currentColors.secondary.r) * t);
    const secondaryG = Math.round(currentColors.secondary.g + (nextColors.secondary.g - currentColors.secondary.g) * t);
    const secondaryB = Math.round(currentColors.secondary.b + (nextColors.secondary.b - currentColors.secondary.b) * t);

    return {
      primary: `rgb(${primaryR}, ${primaryG}, ${primaryB})`,
      secondary: `rgb(${secondaryR}, ${secondaryG}, ${secondaryB})`,
    };
  };

  const textColors = getTextColors();

  // Floating/bubbling animation calculations (client-side only)
  const floatingY = mounted && !shouldReduceMotion 
    ? Math.sin(phase * Math.PI * 4) * 8 + Math.sin(phase * Math.PI * 6) * 4
    : 0;
  
  const floatingX = mounted && !shouldReduceMotion 
    ? Math.cos(phase * Math.PI * 3) * 6 + Math.sin(phase * Math.PI * 5) * 3
    : 0;
  
  const floatingRotation = mounted && !shouldReduceMotion 
    ? Math.sin(phase * Math.PI * 2.5) * 1.5
    : 0;
  
  const floatingScale = mounted && !shouldReduceMotion 
    ? 1 + Math.sin(phase * Math.PI * 8) * 0.02
    : 1;

  // Text micro-movements (client-side only)
  const textFloatY = mounted && !shouldReduceMotion 
    ? Math.sin(phase * Math.PI * 7) * 3
    : 0;
  
  const textFloatX = mounted && !shouldReduceMotion 
    ? Math.cos(phase * Math.PI * 5.5) * 2
    : 0;

  const textFloatY2 = mounted && !shouldReduceMotion 
    ? Math.sin(phase * Math.PI * 6.5) * 2
    : 0;
  
  const textFloatX2 = mounted && !shouldReduceMotion 
    ? Math.cos(phase * Math.PI * 4.5) * 1.5
    : 0;

  const textRotation = mounted && !shouldReduceMotion 
    ? Math.sin(phase * Math.PI * 3.5) * 0.8
    : 0;

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '400vh',
        background: generateGradient(phase),
        transition: mounted ? 'background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
      }}
    >
      
      {/* Main content container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center px-4"
          style={{
            x: floatingX,
            y: floatingY,
            rotate: floatingRotation,
            scale: floatingScale,
          }}
          transition={mounted ? {
            type: "spring",
            stiffness: 100,
            damping: 30,
          } : undefined}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-wide leading-none mb-4 md:mb-6"
            style={{
              fontFamily: 'var(--font-playfair-display), "Times New Roman", serif',
              fontStyle: 'italic',
              color: textColors.secondary,
              textShadow: `0 2px 8px ${textColors.secondary}20`,
              y: textFloatY,
              x: textFloatX,
              transition: 'color 0.3s ease-out, text-shadow 0.3s ease-out',
            }}
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2 
            }}
          >
            Last Days of Summer
          </motion.h1>
          
          <motion.p 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-wide leading-relaxed mt-6 md:mt-8"
            style={{
              fontFamily: 'var(--font-playfair-display), "Times New Roman", serif',
              fontStyle: 'italic',
              color: textColors.secondary,
              textShadow: `0 2px 8px ${textColors.secondary}20`,
              y: textFloatY2,
              x: textFloatX2,
              rotate: textRotation,
              transition: 'color 0.3s ease-out, text-shadow 0.3s ease-out',
            }}
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 1.0, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.6 
            }}
          >
            Coming Soon
          </motion.p>
        </motion.div>
        </div>
      
      {/* Scroll indicator */}
      {mounted && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div 
            className="w-6 h-10 border-2 rounded-full flex justify-center backdrop-blur-sm"
            style={{
              borderColor: `${textColors.secondary}60`,
              transition: 'border-color 0.3s ease-out',
            }}
          >
            <motion.div 
              className="w-1 h-3 rounded-full mt-2"
              style={{
                backgroundColor: `${textColors.secondary}80`,
                transition: 'background-color 0.3s ease-out',
              }}
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}