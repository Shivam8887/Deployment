import { Allpost } from "../Components/allpost";
import { Mypost} from "../Components/post";
import { useState,useEffect } from "react";
export const BlogsPage = () => {
  const [isemypost, setIsemypost] = useState(true); 
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
    <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">Blogs</h1>

    {/* Toggle Buttons */}
    <div className="flex justify-center space-x-6 bg-white bg-opacity-30 backdrop-blur-lg shadow-md rounded-2xl p-3 mt-6">
      <button
        className={`px-6 py-3 font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform ${
          isemypost
            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105"
            : "bg-white bg-opacity-50 text-gray-700 hover:bg-amber-400 hover:text-white"
        } hover:scale-110 active:scale-95`}
        onClick={() => setIsemypost(true)}
      >
        My Posts
      </button>
      <button
        className={`px-6 py-3 font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform ${
          !isemypost
            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105"
            : "bg-white bg-opacity-50 text-gray-700 hover:bg-amber-400 hover:text-white"
        } hover:scale-110 active:scale-95`}
        onClick={() => setIsemypost(false)}
      >
        All Posts
      </button>
    </div>

    {/* Content Section */}
    <div className="w-3/4 md:w-1/2 mt-8 p-6 bg-white bg-opacity-40 backdrop-blur-lg shadow-lg rounded-2xl">
      {isemypost ? <Mypost /> : <Allpost />}
    </div>
  </div>

  );    
};