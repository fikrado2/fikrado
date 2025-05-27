import { Card, CardContent } from "@/components/ui/card";
import { Shield, GraduationCap, Search, Code, Cloud, Headphones } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Shield,
      title: "Amni Shabakada",
      description: "Ilaalinta shabakadaada ka weerarka cyber-ka iyo malware-ka. Xalal casri ah oo ku salaysan AI."
    },
    {
      icon: GraduationCap,
      title: "Tababaro Teknoloji",
      description: "Koorsooyin qoto dheer oo ku saabsan Programming, Linux, AI iyo cybersecurity."
    },
    {
      icon: Search,
      title: "Baadhitaan Amni",
      description: "Imtixaan qoto dheer oo lagu baadho halista amniga ee nidaamkaaga teknolojiyada."
    },
    {
      icon: Code,
      title: "Horumarinta Software",
      description: "Dhisme applications iyo websites oo ku salaysan teknolojiyada ugu dambeeyay."
    },
    {
      icon: Cloud,
      title: "Adeegga Cloud",
      description: "Maaraynta iyo ilaalinta xogta cloud-ka si ammaan ah oo heer sare ah."
    },
    {
      icon: Headphones,
      title: "Taageero 24/7",
      description: "Taageero joogto ah 24 saacadood 7 maalmood todobaadkii si aad u hesho caawimaad deg deg ah."
    }
  ];

  return (
    <section id="services" className="py-20 cyber-blue-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold cyber-yellow mb-6">Adeegyadayada</h2>
          <p className="text-xl cyber-text max-w-3xl mx-auto">
            Waxaan bixinnaa adeegyo kala duwan oo ku saabsan amniga cyber-ka iyo tababarada teknolojiyada
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="cyber-blue border-primary/20 hover-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold cyber-yellow mb-4">{service.title}</h3>
                <p className="cyber-text leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
