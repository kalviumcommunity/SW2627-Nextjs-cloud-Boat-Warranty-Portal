'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminNavbar from '@/components/layout/AdminSidebar';

function AddProductContent({ admin }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serialNumber: '',
    productName: '',
    purchaseDate: '',
    warrantyExpiry: '',
    isActive: true,
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ loading: false, error: null, success: 'Product successfully added!' });
        setFormData({
          serialNumber: '',
          productName: '',
          purchaseDate: '',
          warrantyExpiry: '',
          isActive: true,
        });
      } else {
        setStatus({ loading: false, error: result.message || 'Failed to add product.', success: null });
      }
    } catch (err) {
      setStatus({ loading: false, error: 'Error connecting to server.', success: null });
    }
  };

  return (
    <main style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar admin={admin} />

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '14px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#888' }}>
            <Link href="/admin" style={{ color: '#888', textDecoration: 'none' }}>Dashboard</Link>
            <span>›</span>
            <span style={{ color: '#111', fontWeight: 600 }}>Add Product</span>
          </nav>
          <button
            onClick={() => router.push('/admin')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #e8001d', color: '#e8001d', background: 'transparent', padding: '8px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8001d'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8001d'; }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', width: '100%', flex: 1, padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8e8', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>Add New Product</h1>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 24px' }}>Register a new product serial number into the warranty database.</p>

          {status.error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              {status.error}
            </div>
          )}
          {status.success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              {status.success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                placeholder="e.g. BW123456789001"
                style={{ padding: '12px', borderRadius: '8px', border: '1.5px solid #e8e8e8', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#e8001d'}
                onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                placeholder="e.g. boAt Airdopes 141"
                style={{ padding: '12px', borderRadius: '8px', border: '1.5px solid #e8e8e8', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#e8001d'}
                onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1.5px solid #e8e8e8', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', color: '#111', fontFamily: 'inherit' }}
                  onFocus={(e) => e.target.style.borderColor = '#e8001d'}
                  onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>Warranty Expiry Date</label>
                <input
                  type="date"
                  name="warrantyExpiry"
                  value={formData.warrantyExpiry}
                  onChange={handleChange}
                  required
                  style={{ padding: '12px', borderRadius: '8px', border: '1.5px solid #e8e8e8', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', color: '#111', fontFamily: 'inherit' }}
                  onFocus={(e) => e.target.style.borderColor = '#e8001d'}
                  onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                id="isActiveCheck"
                style={{ width: '18px', height: '18px', accentColor: '#e8001d', cursor: 'pointer' }}
              />
              <label htmlFor="isActiveCheck" style={{ fontSize: '0.9rem', color: '#333', cursor: 'pointer', fontWeight: 500 }}>
                Set as Active Warranty
              </label>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              style={{
                marginTop: '16px',
                background: status.loading ? '#ccc' : '#e8001d',
                color: '#fff',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: status.loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!status.loading) e.currentTarget.style.background = '#c40019'; }}
              onMouseLeave={e => { if (!status.loading) e.currentTarget.style.background = '#e8001d'; }}
            >
              {status.loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const admin = session?.user;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (loading || !admin) {
    return (
      <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '1rem' }}>
        Verifying admin access…
      </div>
    );
  }

  return <AddProductContent admin={admin} />;
}
