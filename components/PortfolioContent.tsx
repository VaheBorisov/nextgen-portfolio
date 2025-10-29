import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';

export default async function PortfolioContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
