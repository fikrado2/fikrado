import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Books from "@/components/books";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <Books />
      <Contact />
      <Footer />
    </div>
  );
}
