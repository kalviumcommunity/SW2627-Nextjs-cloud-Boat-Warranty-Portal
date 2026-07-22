'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserNavbar from '@/components/layout/UserNavbar';
import Footer from '@/components/layout/Footer';
import GlobalLoading from '../loading';
import { showToast } from '@/components/common/BoatToast';

// Default templates for smart merging
const categoryTemplates = {
  earbuds: {
    category: 'Earbuds',
    image: '/boat_earbuds.png',
    coverageHighlights: [
      'Manufacturing defects covered for 12 months',
      'Battery replacement covered for 6 months',
      'Free service support at authorized centers',
    ]
  },
  headphones: {
    category: 'Headphones',
    image: '/boat_headphones.png',
    coverageHighlights: [
      'Manufacturing defects covered for 12 months',
      'Original boAt spare parts used for repairs',
      'Free service support at authorized centers',
    ]
  },
  default: {
    category: 'Accessories',
    image: '/boat_headphones.png', // fallback
    coverageHighlights: [
      'Manufacturing defects covered for 12 months',
      'Original boAt spare parts used for repairs',
      'Free service support at authorized centers',
    ]
  }
};

const defaultClaimSteps = [
  'Keep your purchase invoice and serial number ready.',
  'Visit the nearest authorized service center or contact support.',
  'Get your product inspected and repair process initiated.',
];

const defaultFaqs = [
  { q: 'How long does warranty verification take?', a: 'Instantly. Your product details are verified as soon as you submit the serial number.' },
  { q: 'Can I claim warranty without an invoice?', a: 'Invoice is preferred, but certain claims may still be supported with product proof and serial verification.' },
  { q: 'What is not covered under warranty?', a: 'Physical damage, water damage, and wear-and-tear are not covered under manufacturing warranty.' },
];

function WarrantyResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serial = searchParams.get('serial') || '';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showRepairModal, setShowRepairModal] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [submittingRepair, setSubmittingRepair] = useState(false);
  const [repairMsg, setRepairMsg] = useState({ type: '', text: '' });
  const [repairCreatedData, setRepairCreatedData] = useState(null);

  const handleOpenRepairModal = () => {
    setIssueText('');
    setRepairMsg({ type: '', text: '' });
    setRepairCreatedData(null);
    setShowRepairModal(true);
  };

  const handleRepairSubmit = async (e) => {
    e.preventDefault();
    if (!issueText || issueText.trim().length === 0) {
      const warningText = "Please write your issue / complaint before submitting.";
      setRepairMsg({ type: 'error', text: warningText });
      showToast.warning(warningText, 'DETAILS REQUIRED');
      return;
    }

    setSubmittingRepair(true);
    setRepairMsg({ type: '', text: '' });
    showToast.process('Submitting repair request to boAt support...', 'SUBMITTING');

    try {
      const res = await fetch(`/api/warranty/${encodeURIComponent(serial)}/repairs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue: issueText }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit repair request');
      }

      setRepairCreatedData(data.data);
      showToast.success(`Repair Ticket #${data.data.id} logged! Admin has been notified.`, 'REPAIR REQUESTED');
    } catch (err) {
      setRepairMsg({ type: 'error', text: err.message });
      showToast.error(err.message, 'SUBMISSION FAILED');
    } finally {
      setSubmittingRepair(false);
    }
  };


  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/warranty-result?serial=${encodeURIComponent(serial)}`);
    }
  }, [status, router, serial]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchWarranty() {
      if (!serial) {
        setError('No serial number provided.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/warranty/${serial}`);
        if (!res.ok) {
          throw new Error('Product not found or invalid serial number.');
        }
        const data = await res.json();
        
        // --- SMART MERGE LOGIC ---
        const nameLower = (data.productName || '').toLowerCase();
        let template = categoryTemplates.default;
        if (nameLower.includes('airdopes') || nameLower.includes('earbuds')) {
          template = categoryTemplates.earbuds;
        } else if (nameLower.includes('rockerz') || nameLower.includes('headphones')) {
          template = categoryTemplates.headphones;
        }

        // Calculate days left
        let daysLeft = 0;
        if (data.warrantyExpiry) {
          const expiry = new Date(data.warrantyExpiry);
          const today = new Date();
          const diffTime = expiry - today;
          daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (daysLeft < 0) daysLeft = 0;
        }

        // Format dates cleanly
        const formatDate = (dateString) => {
          if (!dateString) return 'N/A';
          const d = new Date(dateString);
          return isNaN(d) ? dateString : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        };

        const mergedProduct = {
          id: data.id,
          productName: data.productName,
          model: data.productName,
          color: 'Standard',
          warrantyType: 'Manufacturing Warranty',
          placeOfPurchase: 'Retail / Online',
          invoiceRequired: 'Preferred',
          purchaseDate: formatDate(data.purchaseDate),
          warrantyStart: formatDate(data.purchaseDate),
          warrantyExpiry: formatDate(data.warrantyExpiry),
          status: data.warrantyStatus === 'ACTIVE' ? 'Active' : 'Expired',
          daysLeft,
          ...template,
          claimSteps: defaultClaimSteps,
          faqs: defaultFaqs,
        };

        setProduct(mergedProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWarranty();
  }, [status, serial]);

  if (status === 'loading' || status === 'unauthenticated' || loading) {
    return <GlobalLoading />;
  }

  if (error || !product) {
    return (
      <main style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <UserNavbar />
        <div style={{ maxWidth: '600px', margin: '100px auto', background: '#fff', padding: '40px', borderRadius: '14px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#111', marginBottom: '16px' }}>Warranty Not Found</h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>We couldn't find a warranty record for the serial number: <strong>{serial}</strong></p>
          <button
            onClick={() => router.push('/home')}
            style={{
              background: '#e8001d', color: '#fff', border: 'none', padding: '12px 24px',
              borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const isActive = product.status === 'Active';

  const coverageHighlights = product.coverageHighlights || [];
  const claimSteps = product.claimSteps || [];
  const faqs = product.faqs || [];

  return (
    <main style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <UserNavbar />

      {/* Breadcrumb + Back */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '14px 0',
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#888' }}>
            <Link href="/home" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span>Warranty Lookup</span>
            <span>›</span>
            <span style={{ color: '#111', fontWeight: 600 }}>Product Details</span>
          </nav>
          <button
            onClick={() => router.push('/home')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              border: '1.5px solid #e8001d', color: '#e8001d',
              background: 'transparent', padding: '8px 18px',
              borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8001d'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8001d'; }}
          >
            ← Back to Search
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1600px', margin: '32px auto', padding: '0 40px' }}>

        {/* Product Card Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', marginBottom: '24px',
        }}>
          {/* Left: Product Details */}
          <div style={{
            background: '#fff', borderRadius: '14px',
            border: '1px solid #e8e8e8', padding: '28px',
            display: 'flex', gap: '28px', alignItems: 'flex-start',
          }}>
            {/* Product Image */}
            <div style={{
              width: '240px', height: '240px', flexShrink: 0,
              borderRadius: '14px', overflow: 'hidden',
              background: '#f5f5f5', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image
                src={product.image}
                alt={product.productName}
                width={240}
                height={240}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>

            {/* Product Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111', margin: 0 }}>
                  {product.productName}
                </h1>
                {isActive && (
                  <span style={{
                    background: '#e6f9f0', color: '#16a34a',
                    fontSize: '0.78rem', fontWeight: 700,
                    padding: '4px 12px', borderRadius: '20px',
                    border: '1px solid #bbf7d0',
                  }}>
                    Active Warranty
                  </span>
                )}
              </div>

              {[
                { label: 'Serial Number', value: serial, copy: true },
                { label: 'Product Category', value: product.category, bold: true },
                { label: 'Purchase Date', value: product.purchaseDate, bold: true },
                { label: 'Warranty Start Date', value: product.warrantyStart, bold: true },
                {
                  label: 'Warranty Expiry Date',
                  value: (
                    <span>
                      {product.warrantyExpiry}{' '}
                      <span style={{ color: '#e8001d', fontWeight: 600 }}>({product.daysLeft} days left)</span>
                    </span>
                  ),
                  bold: true,
                },
                {
                  label: 'Warranty Status',
                  value: (
                    <span style={{
                      color: isActive ? '#16a34a' : '#dc2626',
                      fontWeight: 600,
                    }}>
                      {product.status}
                    </span>
                  ),
                },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none',
                  gap: '24px',
                }}>
                  <span style={{ width: '180px', flexShrink: 0, fontSize: '0.88rem', color: '#888' }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: row.bold ? 700 : 400, color: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {row.value}
                    {row.copy && (
                      <button
                        title="Copy serial number"
                        onClick={() => {
                          navigator.clipboard.writeText(serial);
                          showToast.success(`Serial number ${serial} copied to clipboard!`, 'COPIED');
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 0 }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Warranty Status Card */}
          <div style={{
            background: '#fff', borderRadius: '14px',
            border: '1px solid #e8e8e8', padding: '28px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', gap: '12px',
          }}>
            {/* Shield Icon */}
            <div style={{ marginBottom: '8px' }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                  fill={isActive ? '#e6f9f0' : '#fef2f2'}
                  stroke={isActive ? '#16a34a' : '#dc2626'}
                  strokeWidth="1.5" />
                <path d="M9 12l2 2 4-4"
                  stroke={isActive ? '#16a34a' : '#dc2626'}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              YOUR WARRANTY IS
            </p>
            <p style={{
              fontSize: '2rem', fontWeight: 900, margin: 0,
              color: isActive ? '#16a34a' : '#dc2626',
            }}>
              {product.status.toUpperCase()}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
              Your product is protected<br />under warranty.
            </p>
          </div>
        </div>

        {/* Timeline Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px', marginBottom: '24px',
        }}>
          {[
            {
              label: 'Purchase Date',
              value: product.purchaseDate,
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ),
              highlight: false,
            },
            {
              label: 'Warranty Start Date',
              value: product.warrantyStart,
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M9 15l2 2 4-4" strokeLinecap="round" />
                </svg>
              ),
              highlight: false,
            },
            {
              label: 'Warranty Expiry Date',
              value: product.warrantyExpiry,
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              highlight: false,
            },
            {
              label: 'Remaining Warranty',
              value: `${product.daysLeft} Days`,
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              highlight: true,
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '12px',
              border: '1px solid #e8e8e8', padding: '20px 20px',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{item.label}</p>
                <p style={{
                  margin: '4px 0 0', fontSize: '1rem', fontWeight: 800,
                  color: item.highlight ? '#e8001d' : '#111',
                }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions + Specs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', marginBottom: '20px' }}>

          {/* Left: Actions */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8e8', padding: '28px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#111', margin: '0 0 20px' }}>
              What would you like to do?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="12" y1="13" x2="12" y2="17" strokeLinecap="round" />
                      <polyline points="9 16 12 19 15 16" />
                    </svg>
                  ),
                  title: 'Download Warranty Certificate',
                  desc: 'Download your warranty certificate in PDF format.',
                  btnLabel: 'Download PDF',
                  btnIcon: '↓',
                  primary: true,
                  onClick: () => {
                    if (product.id) {
                      showToast.process('Generating official warranty certificate PDF...', 'DOWNLOADING');
                      window.open(`/api/products/${product.id}/warranty-pdf`, '_blank');
                    } else {
                      showToast.error('Warranty ID is missing, cannot download PDF.', 'ERROR');
                    }
                  }
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  ),
                  title: 'View Repair History',
                  desc: 'Check all the repairs and services done for this product.',
                  btnLabel: 'View Repair History',
                  btnIcon: '→',
                  primary: false,
                  onClick: () => router.push(`/repair?serial=${encodeURIComponent(serial)}`),
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  ),
                  title: 'Repair Request',
                  desc: 'Submit a repair request for your product.',
                  btnLabel: 'Request Repair',
                  btnIcon: '→',
                  primary: false,
                  onClick: handleOpenRepairModal,
                },
              ].map((action, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {action.icon}
                  <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>{action.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>{action.desc}</p>
                  <button
                    onClick={action.onClick}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '10px 16px', borderRadius: '8px',
                      border: action.primary ? 'none' : '1.5px solid #e8001d',
                      background: action.primary ? '#e8001d' : 'transparent',
                      color: action.primary ? '#fff' : '#e8001d',
                      fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.2s', marginTop: 'auto',
                    }}
                    onMouseEnter={e => {
                      if (action.primary) { e.currentTarget.style.background = '#c40019'; }
                      else { e.currentTarget.style.background = '#e8001d'; e.currentTarget.style.color = '#fff'; }
                    }}
                    onMouseLeave={e => {
                      if (action.primary) { e.currentTarget.style.background = '#e8001d'; }
                      else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8001d'; }
                    }}
                  >
                    {action.btnLabel} {action.btnIcon}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Specifications */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8e8', padding: '28px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#111', margin: '0 0 16px' }}>
              Product Specifications
            </h2>
            {[
              { label: 'Product Name', value: product.productName },
              { label: 'Model', value: product.model },
              { label: 'Color', value: product.color },
              { label: 'Category', value: product.category },
              { label: 'Warranty Type', value: product.warrantyType },
              { label: 'Place of Purchase', value: product.placeOfPurchase },
              { label: 'Invoice Required', value: product.invoiceRequired },
            ].map((spec, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '9px 0',
                borderBottom: i < 6 ? '1px solid #f0f0f0' : 'none',
              }}>
                <span style={{ fontSize: '0.82rem', color: '#888' }}>{spec.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          background: '#fff5f5', borderRadius: '12px',
          border: '1px solid #fee2e2', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '0.78rem', color: '#e8001d', marginBottom: '32px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.5" fill="#e8001d" stroke="#e8001d" />
          </svg>
          <span style={{ color: '#444' }}>Warranty is valid for manufacturing defects only and does not cover physical damage or water damage.</span>
        </div>
      </div>

      {/* Trust Footer */}
      <footer style={{
        background: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '28px 48px',
        borderTop: '1px solid #222',
        gap: '0',
        flexWrap: 'wrap',
      }}>
        {[
          {
            title: '100% Genuine Products',
            desc: 'Authentic boAt products with official warranty.',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            title: 'Instant Verification',
            desc: 'Get warranty details in seconds.',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
          },
          {
            title: 'Digital Certificate',
            desc: 'Download and save your warranty certificate.',
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
                <polyline points="14,2 14,8 20,8" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="13" x2="15" y2="13" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="17" x2="12" y2="17" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            title: '24x7 Support',
            desc: "We're always here to help you.",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 18v-6a9 9 0 0118 0v6" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" />
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" stroke="#E8001D" strokeWidth="2" />
              </svg>
            ),
          },
        ].map((item, idx, arr) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            flex: 1, maxWidth: '240px', padding: '12px 24px',
            borderRight: idx < arr.length - 1 ? '1px solid #2a2a2a' : 'none',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1.5px solid rgba(232,0,29,0.4)',
              background: 'rgba(232,0,29,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px' }}>{item.title}</div>
              <div style={{ color: '#777', fontSize: '0.72rem', lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      {/* Repair Request Modal */}
      {showRepairModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '520px', width: '100%',
            padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            position: 'relative'
          }}>
            {/* Close 'X' Button */}
            <button
              onClick={() => setShowRepairModal(false)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: '#f3f4f6', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#6b7280', fontSize: '1.2rem', fontWeight: 'bold'
              }}
            >
              ×
            </button>

            {!isActive ? (
              /* Warranty Expired Message */
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', background: '#fef2f2',
                  color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px auto', border: '1px solid #fecaca'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 12px 0' }}>
                  Warranty Expired
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                  Sorry, repair requests can only be submitted for products with an <strong>active warranty</strong>.
                  Your warranty expired on <strong>{product.warrantyExpiry}</strong>.
                </p>
                <button
                  onClick={() => setShowRepairModal(false)}
                  style={{
                    width: '100%', padding: '12px 20px', borderRadius: '8px',
                    background: '#111827', color: '#fff', border: 'none',
                    fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            ) : repairCreatedData ? (
              /* Success State */
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5',
                  color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px auto', border: '1px solid #a7f3d0'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
                  Repair Request Submitted!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', margin: '0 0 20px 0' }}>
                  Your repair request has been logged successfully.<br />
                  <strong>Ticket ID: #{repairCreatedData.id}</strong>
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => router.push(`/repair?serial=${encodeURIComponent(serial)}`)}
                    style={{
                      flex: 1, padding: '12px 16px', borderRadius: '8px',
                      background: '#e8001d', color: '#fff', border: 'none',
                      fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    View Repair History →
                  </button>
                  <button
                    onClick={() => setShowRepairModal(false)}
                    style={{
                      padding: '12px 16px', borderRadius: '8px',
                      background: '#f3f4f6', color: '#374151', border: 'none',
                      fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Active Warranty Form State */
              <form onSubmit={handleRepairSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', background: '#fef2f2',
                    color: '#e8001d', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                      Request Repair
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '2px 0 0 0' }}>
                      {product.productName} • Serial: {serial}
                    </p>
                  </div>
                </div>

                {repairMsg.text && (
                  <div style={{
                    padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem',
                    background: repairMsg.type === 'error' ? '#fef2f2' : '#f0fdf4',
                    color: repairMsg.type === 'error' ? '#dc2626' : '#16a34a',
                    border: `1px solid ${repairMsg.type === 'error' ? '#fecaca' : '#bbf7d0'}`
                  }}>
                    {repairMsg.text}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="issue-textarea" style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    What's the issue?
                  </label>
                  <textarea
                    id="issue-textarea"
                    rows={4}
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="Write your complaint or issue here..."
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: '8px',
                      border: '1.5px solid #d1d5db', fontSize: '0.92rem', color: '#111827',
                      outline: 'none', resize: 'vertical', fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowRepairModal(false)}
                    disabled={submittingRepair}
                    style={{
                      padding: '10px 20px', borderRadius: '8px',
                      background: 'transparent', color: '#4b5563', border: '1.5px solid #d1d5db',
                      fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingRepair}
                    style={{
                      padding: '10px 24px', borderRadius: '8px',
                      background: '#e8001d', color: '#fff', border: 'none',
                      fontSize: '0.88rem', fontWeight: 700, cursor: submittingRepair ? 'not-allowed' : 'pointer',
                      opacity: submittingRepair ? 0.7 : 1, transition: 'all 0.2s'
                    }}
                  >
                    {submittingRepair ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      </footer>
    </main>
  );
}

export default function WarrantyResultPage() {
  return (
    <Suspense fallback={<div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#888' }}>Loading...</div>}>
      <WarrantyResultContent />
    </Suspense>
  );
}
