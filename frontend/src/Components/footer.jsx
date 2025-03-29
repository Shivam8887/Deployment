import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left Section - Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">BlogsApp</h2>
          <p className="text-sm text-gray-400">Your daily dose of blogs & stories.</p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-xl hover:text-blue-400 transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl hover:text-blue-300 transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-pink-400 transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-xl hover:text-blue-500 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-4 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BlogsApp. All rights reserved.
      </div>
    </footer>
  );
}
