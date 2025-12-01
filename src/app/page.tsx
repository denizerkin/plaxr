import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MissionVision from '@/components/MissionVision';
import Features from '@/components/Features';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Hero />
      <MissionVision />
      <Features />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
