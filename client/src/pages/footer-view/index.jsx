// File: src/components/Footer.jsx
// import { FaInstagra, FaTiktok, FaFacebookF, FaTimes } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-gray-200 px-6 md:px-16 py-10 text-sm">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sign Up Section */}
        <div>
          <h3 className="text-base font-semibold mb-2">SIGN UP FOR BUSINESS</h3>
          <p className="mb-4">Subscribe to get special offers & once-in-a-lifetime deals.</p>
          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              type="email"
              placeholder="Enter your e-mail address here"
              className="px-4 py-2 rounded-md text-black w-full sm:w-auto flex-1"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-md font-semibold"
            >
              &rarr;
            </button>
          </form>
        </div>
  
        {/* About Us */}
        <div>
          <h4 className="font-semibold mb-2">ABOUT US</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-gray-300">Our Story</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Made with Care</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Blog</a></li>
          </ul>
        </div>
  
        {/* Assistance */}
        <div>
          <h4 className="font-semibold mb-2">ASSISTANCE</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-gray-300">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Accessibility</a></li>
          </ul>
        </div>
  
        {/* Boutiques */}
        <div>
          <h4 className="font-semibold mb-2">BOUTIQUES</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-gray-300">Find a store</a></li>
            <li><a href="#" className="hover:underline text-gray-300">Buy products</a></li>
          </ul>
        </div>
      </div>
  
      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-600 pt-6 text-xs flex flex-col md:flex-row justify-between items-center">
        {/* Social Media */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          {/* <FaInstagram />
          <FaTiktok />
          <FaFacebookF />
          <FaTimes /> */}
        </div>
  
        <p>&copy; 2025, Hubbit. All rights reserved.</p>
  
        {/* Language/Currency/Payments (placeholder icons/text) */}
        <div className="flex items-center gap-4 mt-4 md:mt-0 flex-col sm:flex-row">
          <span>Ethiopia (Brr)</span>
          <span>🌐 English</span>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-white rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;