
import React, { useEffect, useState } from 'react';

const SaltSparkle = () => {
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number, size: number, opacity: number}[]>([]);
  
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = {
        id: Date.now(),
        x: Math.random() * 100, // Random position within container
        y: Math.random() * 100,
        size: Math.random() * 5 + 2, // Larger size between 2-7px
        opacity: Math.random() * 0.8 + 0.4, // Higher opacity between 0.4-1
      };
      
      setSparkles(prev => [...prev, sparkle]);
      
      // Remove sparkle after animation duration
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, 2000);
    };
    
    // Create initial sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createSparkle(), Math.random() * 1000);
    }
    
    // Create new sparkles at intervals
    const interval = setInterval(() => {
      createSparkle();
    }, 200); // More frequent sparkles
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white animate-sparkle"
          style={{
            top: `${sparkle.y}%`,
            left: `${sparkle.x}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size}px rgba(255, 255, 255, 0.9)`,
            animation: 'sparkle 2s linear forwards'
          }}
        />
      ))}
    </div>
  );
};

export default SaltSparkle;
