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

  useEffect(() => {
    const stored = localStorage.getItem('admin');
    if (!stored) {
      router.push('/admin/login');
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      setAdmin(parsed);
      setLoading(false);
    } catch {
      router.push('/admin/login');
    }
  }, [router]);

  if (loading || !admin) return null;

  return (
    <main style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar admin={admin} />
      <AdminHero />
      <AdminCTA />
      <Footer />
    </main>
  );
}
