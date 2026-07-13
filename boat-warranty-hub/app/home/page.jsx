import UserNavbar from '@/components/layout/UserNavbar';
import Hero from '@/components/home/Hero';
import CTA from '@/components/home/CTA';
import Features from '@/components/home/Features';
import Footer from '@/components/layout/Footer';

export default function UserHome() {
  return (
    <main>
      <UserNavbar />
      <Hero />
      <CTA badgeType="sn" />
      <Features />
      <Footer />
    </main>
  );
}
