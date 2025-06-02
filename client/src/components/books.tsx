import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import programmingBook from "@assets/20250510_113058.png";
import computerBook from "@assets/20250510_114039.png";
import aiBook from "@assets/20250510_123812.png";
import linuxBook from "@assets/IMG_7474.png";
import chatgptBook from "@assets/photo_2025-05-26_15-34-10.jpg";
import hackingbook from "@assets/hacking.jpg";

export default function Books() {
  const books = [
    {
      image: programmingBook,
      title: "Isbar Programming Macalin La'aan",
      author: "Yahye Abdirahman"
    },
    {
      image: computerBook,
      title: "Isbar Computer Macalin La'aan",
      author: "Yahye Abdirahman"
    },
    {
      image: aiBook,
      title: "Isbar AI Macalin La'aan 2",
      author: "Yahye Abdirahman"
    },
    {
      image: linuxBook,
      title: "Isbar Linux Macalin La'aan",
      author: "Yahye Abdirahman"
    },
    {
      image: chatgptBook,
      title: "Isbar ChatGPT Macalin La'aan",
      author: "M Yasin Faratoon"
    },
    {
      image: hackingbook ,
      title: "Isbar Hacking Macalin La'aan",
      author: "Yahye Abdirahman"
    },
  ];

  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/252634048063', '_blank');
  };

  return (
    <section id="books" className="py-20 cyber-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold cyber-yellow mb-6">Buugaagta Fikrado</h2>
          <p className="text-xl cyber-text max-w-3xl mx-auto">
            Buugaag Isbar macalin la'aan waa buugag casri ah oo si maacalin la'aan aad isku bartiid si fudud
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {books.map((book, index) => (
            <Card key={index} className="cyber-blue-dark border-primary/20 book-card transition-all duration-300">
              <CardContent className="p-6 text-center">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-32 h-40 object-cover rounded-lg mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-lg font-semibold cyber-yellow mb-2">{book.title}</h3>
                <p className="cyber-text text-sm mb-4">{book.author}</p>
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 whatsapp-btn w-full"
                >
                  <i className="fab fa-whatsapp mr-2 text-lg"></i>
                  Dalbashada Hadda
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
