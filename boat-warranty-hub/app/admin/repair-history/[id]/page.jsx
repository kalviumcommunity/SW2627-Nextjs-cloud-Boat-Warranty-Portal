'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminNavbar from '@/components/layout/AdminSidebar';

const statusStyle = {
  IN_PROGRESS: { bg: '#eff6ff', color: '#2563eb', border: '#dbeafe', label: 'Under Process' },
  COMPLETED: { bg: '#f0fdf4', color: '#16a34a', border: '#dcfce7', label: 'Repaired' },
  PENDING: { bg: '#fefce8', color: '#ca8a04', border: '#fef08a', label: 'Pending' },
  CANCELLED: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', label: 'Rejected' },
};

export default function AdminRepairDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { status } = useSession();

  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated' || !id) return;
    
    const fetchRepair = async () => {
      try {
        const response = await fetch(`/api/repairs/${id}`);
        const result = await response.json();
        if (response.ok && result.success) {
          setRepair(result.data);
        } else {
          setError(result.message || 'Failed to fetch repair details');
        }
      } catch (err) {
        setError('Error connecting to server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepair();
  }, [id, status]);

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#fcfcfc' }}>
        <AdminNavbar />
        <div style={{ flex: 1, padding: '80px 40px', textAlign: 'center', color: '#888' }}>
          Loading details...
        </div>
      </div>
    );
  }

  if (error || !repair) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#fcfcfc' }}>
        <AdminNavbar />
        <div style={{ flex: 1, padding: '80px 40px', textAlign: 'center', color: '#e8001d' }}>
          {error || 'Repair record not found.'}
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => router.back()} 
              style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const s = statusStyle[repair.repairStatus] || { bg: '#f5f5f5', color: '#555', border: '#e8e8e8', label: repair.repairStatus };
  const repairDateObj = new Date(repair.repairDate);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fcfcfc', fontFamily: 'var(--font-inter, sans-serif)' }}>
      <AdminNavbar />

      <main style={{ flex: 1, maxWidth: '900px', margin: '40px auto', padding: '0 24px', paddingBottom: '100px' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px',
            color: '#666', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginBottom: '24px', padding: 0
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to History
        </button>

        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              Repair Details
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
              Viewing detailed information for Repair #{repair.id}
            </p>
          </div>
          <span style={{
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            padding: '8px 16px', borderRadius: '24px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase'
          }}>
            {s.label}
          </span>
        </div>

        {/* Main Details Card */}
        <div style={{
          background: '#fff', borderRadius: '16px', border: '1px solid #eaeaea',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)', overflow: 'hidden'
        }}>
          {/* Section 1: Core Info */}
          <div style={{ padding: '32px', borderBottom: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              General Information
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Serial Number</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{repair.serialNumber}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Repair Date & Time</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{repairDateObj.toLocaleString()}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Center</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{repair.serviceCenter || 'N/A'}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Technician</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{repair.technician || 'Unassigned'}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Issue Description */}
          <div style={{ padding: '32px', borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Issue Reported
            </h2>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: '#333' }}>
              {repair.issue || 'No issue description provided.'}
            </p>
          </div>

          {/* Section 3: Technician Notes */}
          <div style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
              </svg>
              Technician Remarks & Services
            </h2>
            <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '10px', padding: '20px' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#444' }}>
                {repair.technicianNotes || 'No specific services or remarks have been recorded by the technician yet.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
