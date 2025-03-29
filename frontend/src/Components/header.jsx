import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white shadow-md top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* App Title */}
        <h2 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200 transition">Blogs Web Application</Link>
        </h2>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/blogs" className="hover:text-gray-200 transition">Blogs</Link>
        </nav>

        {/* Login & Signup Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-500 transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
