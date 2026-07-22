'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserNavbar from '@/components/layout/UserNavbar';
import Hero from '@/components/home/Hero';
import CTA from '@/components/home/CTA';
import Features from '@/components/home/Features';
import Footer from '@/components/layout/Footer';
import GlobalLoading from '../loading';

export default function UserHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/home');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return <GlobalLoading />;
  }

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
