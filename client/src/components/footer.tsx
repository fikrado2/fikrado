import fikradoLogo from "@assets/f.jpg";

export default function Footer() {
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
  };

  return (
    <footer className="cyber-blue border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <img 
                src={fikradoLogo} 
                alt="Fikrado Security Logo" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold cyber-yellow">Fikrado Security</h3>
                <p className="text-xs cyber-text">Amniga Teknolojiyada</p>
              </div>
            </div>
            <p className="cyber-text text-sm">
              Shirkad ku takhasustay amniga cyber-ka iyo koorsooyin teknoloji ah. 
              Waxaan bixinnaa xalal amni ah oo heer sare ah.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold cyber-yellow mb-4">Xidhiidhka Degdegga ah</h4>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block cyber-text hover:text-primary transition-colors duration-300 mx-auto"
              >
                Guriga
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block cyber-text hover:text-primary transition-colors duration-300 mx-auto"
              >
                Adeegyada
              </button>
              <button 
                onClick={() => scrollToSection('books')}
                className="block cyber-text hover:text-primary transition-colors duration-300 mx-auto"
              >
                Buugaagta
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block cyber-text hover:text-primary transition-colors duration-300 mx-auto"
              >
                Xiriir
              </button>
            </div>
          </div>
          
          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold cyber-yellow mb-4">Nala Xiriir</h4>
            <div className="space-y-2 text-sm">
              <p className="cyber-text">
                <i className="fas fa-envelope mr-2 cyber-yellow"></i>
                fikrado1@gmail.com
              </p>
              <p className="cyber-text">
                <i className="fas fa-phone mr-2 cyber-yellow"></i>
                +252 63 404 8063
              </p>
              <p className="cyber-text">
                <i className="fas fa-map-marker-alt mr-2 cyber-yellow"></i>
                Masala, Hargeisa, Somalia
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="cyber-text text-sm">
            © 2025 Fikrado Security. Dhammaan xuquuqda way dhowran yihiin.
          </p>
        </div>
      </div>
    </footer>
  );
}
