import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export const LibreNavbar = () => {
  const [, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-5xl transition-all duration-500`}
    >
      <div
        className={`glass px-8 py-3 rounded-full flex items-center justify-between backdrop-blur-3xl bg-black/20 border-white/5`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="src/assets/libre.svg"
            alt="Libre"
            className="w-12 h-12 object-contain brightness-0 invert opacity-90"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 ml-12">
          {['Product', 'Team', 'Blog', 'Research'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[12px] font-medium text-white/50 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="./auth/login">
            <button className="text-[12px] font-medium text-white/50 hover:text-white transition-colors cursor-pointer">
              Log In
            </button>
          </Link>
          <Link to="./auth/signup">
            <button className="glass-dark px-5 py-2 rounded-full flex items-center gap-2 border-white/10 hover:bg-white/5 transition-all text-[12px] font-semibold text-white">
              Become a Member
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
