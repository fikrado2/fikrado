import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import fikradoLogo from "@assets/f.jpg";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'cyber-blue-dark' : 'cyber-blue-dark/95'
    } backdrop-blur-sm border-b border-cyber-yellow/20`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Company Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={fikradoLogo} 
              alt="Fikrado Security Logo" 
              className="h-12 w-12 rounded-lg cyber-glow object-cover"
            />
            <div>
              <h1 className="text-xl font-bold cyber-yellow">Fikrado Security</h1>
              <p className="text-xs cyber-text">Amniga Teknolojiyada</p>
            </div>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="cyber-text hover:text-primary transition-colors duration-300 flex items-center"
            >
              <i className="fas fa-home mr-2"></i>Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="cyber-text hover:text-primary transition-colors duration-300 flex items-center"
            >
              <i className="fas fa-shield-alt mr-2"></i>Adeegyada
            </button>
            <button 
              onClick={() => scrollToSection('books')}
              className="cyber-text hover:text-primary transition-colors duration-300 flex items-center"
            >
              <i className="fas fa-book mr-2"></i>Buugaagta
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover-glow"
            >
              <i className="fas fa-phone mr-2"></i>Xiriir
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyber-yellow/20 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="cyber-text hover:text-primary transition-colors duration-300 text-left"
              >
                <i className="fas fa-home mr-2"></i>Guriga
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="cyber-text hover:text-primary transition-colors duration-300 text-left"
              >
                <i className="fas fa-shield-alt mr-2"></i>Adeegyada
              </button>
              <button 
                onClick={() => scrollToSection('books')}
                className="cyber-text hover:text-primary transition-colors duration-300 text-left"
              >
                <i className="fas fa-book mr-2"></i>Buugaagta
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-fit"
              >
                <i className="fas fa-phone mr-2"></i>Xiriir
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    </header>
  );
}
