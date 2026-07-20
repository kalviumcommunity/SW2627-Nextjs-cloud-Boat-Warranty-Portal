'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/layout/AdminSidebar';
import AdminHero from '@/components/layout/DashboardHeader';
import AdminCTA from '@/components/admin/DashboardCards';
import Footer from '@/components/layout/Footer';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin');
    if (!stored) {
      router.push('/admin/login');
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      setAdmin(parsed);
      
      // Fetch Dashboard Stats
      fetch('/api/dashboard/stats')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStats(data.data);
          }
        })
        .catch(err => console.error("Failed to fetch stats:", err))
        .finally(() => setLoading(false));

    } catch {
      router.push('/admin/login');
    }
  }, [router]);

  if (loading || !admin) return null;

  return (
    <main style={{ minHeight: '100vh', background: '#000000', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar admin={admin} />
      <AdminHero />
      <AdminCTA stats={stats} />
      <Footer />
    </main>
  );
}
