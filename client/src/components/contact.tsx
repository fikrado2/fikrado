import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/252634048063', '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:fikrado1@gmail.com';
  };

  const handlePhoneContact = () => {
    window.location.href = 'tel:+252634048063';
  };

  return (
    <section id="contact" className="py-20 cyber-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold cyber-yellow mb-6">Nala Xiriir</h2>
          <p className="text-xl cyber-text max-w-3xl mx-auto">
            Nala soo Xiriir hadad rabto inaan kor u qaado aminaga dhanka cybersecurity ga shirkadada ama goobtaada ganacsi
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Email Contact */}
          <Card className="cyber-blue border-primary/20 hover-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold cyber-yellow mb-4">Email</h3>
              <p className="cyber-text mb-4">Noo soo dir email</p>
              <button 
                onClick={handleEmailContact}
                className="cyber-yellow hover:text-yellow-400 transition-colors duration-300 font-semibold"
              >
                fikrado1@gmail.com
              </button>
            </CardContent>
          </Card>
          
          {/* Phone Contact */}
          <Card className="cyber-blue border-primary/20 hover-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold cyber-yellow mb-4">Telefoon</h3>
              <p className="cyber-text mb-4">Nasoo  wac ama no soo dir fariin</p>
              <button 
                onClick={handlePhoneContact}
                className="cyber-yellow hover:text-yellow-400 transition-colors duration-300 font-semibold"
              >
                +252 63 404 8063
              </button>
            </CardContent>
          </Card>
          
          {/* Location */}
          <Card className="cyber-blue border-primary/20 hover-glow transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold cyber-yellow mb-4">Goob</h3>
              <p className="cyber-text mb-4">Meesha aan ku yaallno</p>
              <p className="cyber-yellow font-semibold">
                Masala, Hargeisa<br />
                Somalia
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* WhatsApp CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleWhatsAppContact}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold hover-glow"
            size="lg"
          >
            <i className="fab fa-whatsapp mr-3 text-xl"></i>
            WhatsApp-ka Nagula Xiriir
          </Button>
        </div>
      </div>
    </section>
  );
}
