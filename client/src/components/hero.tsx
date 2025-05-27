import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Rocket, BookOpen } from "lucide-react";

export default function Hero() {
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
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-background via-muted to-background min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold cyber-yellow leading-tight mb-6">
              Amniga Cyber-ka <br />
              <span className="text-white">Mustaqbalka</span>
            </h1>
            <p className="text-xl cyber-text mb-8 leading-relaxed">
              Fikrado Security waa shirkad horumarsan oo ku takhasustay amniga teknolojiyada iyo koorsooyin casri ah. 
              Waxaan bixinnaa xalal amni ah oo heer sare ah si aad u ilaaliso anigaga internet hada fikrado la xidhiidh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold hover-glow"
                size="lg"
              >
                <Rocket className="mr-3" size={20} />
                Bilow Hadda
              </Button>
              <Button 
                onClick={() => scrollToSection('books')}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                <BookOpen className="mr-3" size={20} />
                Buugaagta Eeg
              </Button>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <div className="relative">
              <div className="cyber-blue-dark rounded-2xl p-8 cyber-glow">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary/20 rounded-lg h-16 flex items-center justify-center">
                    <Shield className="text-primary text-2xl" size={32} />
                  </div>
                  <div className="bg-primary/20 rounded-lg h-16 flex items-center justify-center">
                    <Lock className="text-primary text-2xl" size={32} />
                  </div>
                  <div className="bg-primary/20 rounded-lg h-16 flex items-center justify-center">
                    <Eye className="text-primary text-2xl" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold cyber-yellow mb-2">Amni Buuxa</h3>
                <p className="cyber-text">Teknoloji casri ah oo ku salaysan AI iyo Machine Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
