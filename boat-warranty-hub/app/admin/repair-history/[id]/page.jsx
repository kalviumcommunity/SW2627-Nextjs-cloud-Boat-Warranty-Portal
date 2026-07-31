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

  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

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
          setEditStatus(result.data.repairStatus);
          setEditNotes(result.data.technicianNotes || '');
        } else {
          setError(result.message || 'Failed to fetch repair details');
        }
      } catch (_err) {
        setError('Error connecting to server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepair();
  }, [id, status]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/repairs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repairStatus: editStatus,
          technicianNotes: editNotes,
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setRepair(result.data);
        setIsEditing(false);
      } else {
        alert(result.message || 'Failed to update repair');
      }
    } catch (_err) {
      alert('Error updating repair.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#fcfcfc' }}>
        <AdminNavbar />
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#888' }}>
          Loading details...
        </div>
      </div>
    );
  }

  if (error || !repair) {
    return (
      <div style={{ minHeight: '100vh', background: '#fcfcfc' }}>
        <AdminNavbar />
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#e8001d' }}>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AdminNavbar />

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px', paddingBottom: '100px' }}>
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: '#666', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginBottom: '24px', padding: 0
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#e8001d'}
          onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to History
        </button>

        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111', margin: '0 0 8px 0', position: 'relative', display: 'inline-block' }}>
              Repair Details
              <span style={{ position: 'absolute', left: 0, bottom: '-6px', width: '48px', height: '4px', background: '#e8001d', borderRadius: '2px' }} />
            </h1>
            <p style={{ margin: '14px 0 0 0', color: '#666', fontSize: '1rem', fontWeight: 500 }}>
              Viewing detailed information for Repair #{repair.id}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!isEditing ? (
              <>
                <div style={{
                  background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                  padding: '8px 20px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, display: 'inline-block' }}></span>
                  {s.label}
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: '#111', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px',
                    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Edit Record
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff',
                    fontSize: '0.9rem', fontWeight: 600, color: '#111', outline: 'none'
                  }}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">Under Process</option>
                  <option value="COMPLETED">Repaired</option>
                  <option value="CANCELLED">Rejected</option>
                </select>
                <button
                  onClick={() => { setIsEditing(false); setEditStatus(repair.repairStatus); setEditNotes(repair.technicianNotes || ''); }}
                  disabled={saving}
                  style={{
                    background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', padding: '8px 16px', borderRadius: '8px',
                    fontSize: '0.9rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    background: '#e8001d', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px',
                    fontSize: '0.9rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Details Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column: Issue & Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff5f5', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', margin: 0 }}>Issue Reported</h2>
              </div>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, color: '#444', fontWeight: 500 }}>
                {repair.issue || 'No issue description provided.'}
              </p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', margin: 0 }}>Technician Remarks</h2>
              </div>
              
              {!isEditing ? (
                <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: '8px', padding: '20px' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#555', fontStyle: repair.technicianNotes ? 'normal' : 'italic', whiteSpace: 'pre-wrap' }}>
                    {repair.technicianNotes || 'No specific services or remarks have been recorded by the technician yet.'}
                  </p>
                </div>
              ) : (
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Enter technician remarks or services performed..."
                  style={{
                    width: '100%', minHeight: '120px', padding: '16px', borderRadius: '8px',
                    border: '1px solid #d1d5db', background: '#fff', fontSize: '0.95rem',
                    color: '#111', resize: 'vertical', outline: 'none', fontFamily: 'inherit'
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Column: General Information */}
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', margin: 0 }}>General Info</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Serial Number</p>
                <div style={{ display: 'inline-block', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px' }}>
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace', letterSpacing: '1px' }}>
                    {repair.product?.serialNumber || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Repair Date & Time</p>
                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>
                  {repairDateObj.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '0.85rem' }}>
                  {repairDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div style={{ height: '1px', background: '#f0f0f0', margin: '4px 0' }}></div>

              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Service Center</p>
                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>{repair.serviceCenter || 'N/A'}</p>
              </div>

              <div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Technician</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {repair.technician ? repair.technician.charAt(0).toUpperCase() : '?'}
                  </div>
                  <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#111' }}>{repair.technician || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 850px) {
            main > div:nth-of-type(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}} />
      </main>
    </div>
  );
}
