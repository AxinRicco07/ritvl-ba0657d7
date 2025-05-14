
import React, { useEffect, useState } from 'react';

const SaltSparkle = () => {
  const [sparkles, setSparkles] = useState<{id: number, x: number, y: number, size: number, opacity: number}[]>([]);
  
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = {
        id: Date.now(),
        x: Math.random() * 100, // Random position within container
        y: Math.random() * 100,
        size: Math.random() * 4 + 1, // Random size between 1-5px
        opacity: Math.random() * 0.7 + 0.3, // Random opacity between 0.3-1
      };
      
      setSparkles(prev => [...prev, sparkle]);
      
      // Remove sparkle after animation duration
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, 1500);
    };
    
    // Create initial sparkles
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createSparkle(), Math.random() * 1000);
    }
    
    // Create new sparkles at intervals
    const interval = setInterval(() => {
      createSparkle();
    }, 300);
    
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
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size / 2}px rgba(255, 255, 255, 0.8)`,
            animation: 'sparkle 1.5s linear forwards'
          }}
        />
      ))}
    </div>
  );
};

export default SaltSparkle;
