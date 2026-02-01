import { useState, useEffect } from 'react';
import { Home, User, Zap, Layers, MessageCircle, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  // Handle Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Only toggle visibility if NOT scrolling due to a click
      if (!isClickScrolling) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // Hide on Scroll Down
        } else {
          setIsVisible(true); // Show on Scroll Up
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isClickScrolling]);

  // Handle Link Click to prevent hiding
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsClickScrolling(true);
    setIsVisible(true); // Force show
    
    // Reset after animation period (e.g., 1 second)
    setTimeout(() => {
      setIsClickScrolling(false);
    }, 1000);
  };

  const navItems = [
    { name: 'Home', href: '#', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Services', href: '#services', icon: Zap },
    { name: 'Showcase', href: '#projects', icon: Layers },
  ];

  return (
    <>
      {/* Desktop & Top Mobile Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 px-4 md:px-6 pointer-events-none transition-all duration-500 ease-in-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${scrolled ? 'py-2' : 'py-4'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
          <div className="bg-brand-dark/80 backdrop-blur-xl border border-brand-primary/20 px-6 py-3 rounded-2xl shadow-lg shadow-brand-primary/5 hover:border-brand-primary/40 transition-all group">
            <div className="text-2xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform">
              Rez<span className="text-brand-primary">Code</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-brand-dark/70 backdrop-blur-xl border border-brand-primary/10 px-2 py-2 rounded-2xl shadow-2xl">
            <div className="flex items-center">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-brand-secondary hover:text-white hover:bg-white/5 transition-all group relative overflow-hidden"
                >
                  <item.icon className="w-4 h-4 group-hover:text-brand-primary transition-colors" />
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </a>
              ))}
            </div>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <a 
              href="#contact" 
              onClick={handleLinkClick}
              className="group flex items-center gap-2 bg-brand-primary text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/25 hover:shadow-brand-secondary/40 hover:-translate-y-0.5"
            >
              <span>Contact</span>
              <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-auto">
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2 animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right">
             {[
               ...navItems,
               { name: 'Contact', href: '#contact', icon: MessageCircle, primary: true }
             ].map((item, idx) => (
                <a 
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-xl font-bold transition-all hover:scale-105 active:scale-95 ${
                    item.primary 
                      ? 'bg-brand-primary text-white border-brand-primary/50' 
                      : 'bg-brand-dark/95 text-brand-secondary border-brand-primary/20 hover:text-white hover:border-brand-primary/50'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}
                >
                  <span className="text-base">{item.name}</span>
                  <item.icon className={`w-5 h-5 ${item.primary ? 'text-white' : 'text-brand-primary'}`} />
                </a>
             ))}
          </div>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-16 h-16 rounded-full bg-brand-primary text-white shadow-2xl shadow-brand-primary/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-90 z-50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
          {isOpen ? (
            <X className="w-8 h-8 relative z-10 animate-in spin-in-90 duration-300" />
          ) : (
            <Menu className="w-8 h-8 relative z-10 animate-in zoom-in duration-300" />
          )}
        </button>
      </div>
    </>
  );
}