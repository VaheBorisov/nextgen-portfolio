import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default async function PortfolioContent() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
    </main>
  );
}
