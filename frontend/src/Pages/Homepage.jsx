import React from 'react';
import { Link } from 'react-router-dom'; 
export const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-center p-6">
    {/* Heading */}
    <h1 className="text-5xl font-extrabold text-gray-800 animate-fadeIn">
      Welcome to <span className="text-blue-600">BlogsApp</span>
    </h1>
  
    {/* Subtext */}
    <p className="text-gray-700 text-xl max-w-2xl leading-relaxed">
      Explore a world of ideas, stories, and experiences. Start reading and sharing your thoughts today!
    </p>
  
    {/* Decorative Element */}
    <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
  
    {/* Illustration */}
    <div className="w-full max-w-md">
    
    </div>
  </div>
  
  );
};
