'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminNavbar from '@/components/layout/AdminSidebar';
import AdminHero from '@/components/layout/DashboardHeader';
import AdminCTA from '@/components/admin/DashboardCards';
import Footer from '@/components/layout/Footer';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loadingSession = status === 'loading';
  const admin = session?.user;
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && admin?.role !== 'ADMIN')) {
      router.push('/admin/login');
      return;
    }
    
    if (status === 'authenticated' && admin?.role === 'ADMIN') {
      fetch('/api/dashboard/stats')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStats(data.data);
          }
        })
        .catch(err => console.error("Failed to fetch stats:", err))
        .finally(() => setLoadingStats(false));
    }
  }, [status, admin?.role, router]);

  if (loadingSession || loadingStats || !admin || admin?.role !== 'ADMIN') return null;

  return (
    <main style={{ minHeight: '100vh', background: '#f5f3f3', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar admin={admin} />
      <AdminHero />
      <AdminCTA stats={stats} />
      <Footer />
    </main>
  );
}
