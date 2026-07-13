'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserNavbar from '@/components/layout/UserNavbar';
import Footer from '@/components/layout/Footer';

// Mock warranty data keyed by serial number
const warrantyDB = {
  'BW123456789001': {
    productName: 'boAt Airdopes 141',
    model: 'Airdopes 141',
    category: 'Earbuds',
    color: 'Active Black',
    purchaseDate: '15 Jan 2024',
    warrantyStart: '15 Jan 2024',
    warrantyExpiry: '14 Jan 2025',
    daysLeft: 215,
    status: 'Active',
    warrantyType: 'Manufacturing Warranty',
    placeOfPurchase: 'Online',
    invoiceRequired: 'No',
    image: '/boat_earbuds.png',
  },
};

// Default product for any other serial number
const defaultProduct = {
  productName: 'boAt Rockerz 550',
  model: 'Rockerz 550',
  category: 'Headphones',
  color: 'Active Black',
  purchaseDate: '15 Jan 2024',
  warrantyStart: '15 Jan 2024',
  warrantyExpiry: '14 Jan 2025',
  daysLeft: 215,
  status: 'Active',
  warrantyType: 'Manufacturing Warranty',
  placeOfPurchase: 'Online',
  invoiceRequired: 'No',
  image: '/boat_headphones.png',
};

function WarrantyResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serial = searchParams.get('serial') || '';

  const product = warrantyDB[serial] || { ...defaultProduct };

  const isActive = product.status === 'Active';

  return (
    <main style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <UserNavbar />

      {/* Breadcrumb + Back */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '14px 40px',
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

      <div style={{ maxWidth: '1400px', margin: '32px auto', padding: '0 40px' }}>

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
                        onClick={() => navigator.clipboard.writeText(serial)}
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
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0118 0v6" />
                      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                    </svg>
                  ),
                  title: 'Need Help?',
                  desc: 'Contact our support team for any warranty related queries.',
                  btnLabel: 'Contact Support',
                  btnIcon: '→',
                  primary: false,
                },
              ].map((action, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {action.icon}
                  <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>{action.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>{action.desc}</p>
                  <button
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
          background: '#fff', borderRadius: '12px',
          border: '1px solid #e8e8e8', padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '0.78rem', color: '#666', marginBottom: '32px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.5" fill="#888" stroke="#888" />
          </svg>
          Warranty is valid for manufacturing defects only and does not cover physical damage or water damage.
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
