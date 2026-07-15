'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import UserNavbar from '@/components/layout/UserNavbar';

// Mock repair records
const initialRepairRecords = [
  {
    id: 1,
    date: '01 Mar 2025',
    time: '01:20 PM',
    issue: 'General Check-up',
    center: 'boAt Service Center, Mumbai',
    technician: 'Pooja Iyer',
    status: 'Under Process',
    remarks: 'Product under routine inspection.',
    details: 'Diagnostic Test: Running. All audio frequencies are being tested. Outer body cleaning and ear-tip sanitization completed. Waiting for final quality checks.'
  },
  {
    id: 2,
    date: '10 Feb 2025',
    time: '10:30 AM',
    issue: 'Left Earphone Not Working',
    center: 'boAt Service Center, Mumbai',
    technician: 'Rahul Sharma',
    status: 'Repaired',
    remarks: 'Replaced left driver unit.',
    details: 'Driver Replacement: Left earbud disassembled, faulty dynamic driver unit desoldered and replaced with a brand new original boAt spare part. Stereo balance and frequency response verified.'
  },
  {
    id: 3,
    date: '22 Aug 2024',
    time: '11:15 AM',
    issue: 'Charging Issue',
    center: 'boAt Service Center, Delhi',
    technician: 'Amit Verma',
    status: 'Repaired',
    remarks: 'Charging port cleaned and tested.',
    details: 'Port Maintenance: USB-C port inspected under microscope. Removed packed lint and debris. Cleaned terminals with isopropyl alcohol. Verified current draw at stable 5V/1A.'
  },
  {
    id: 4,
    date: '05 Dec 2024',
    time: '02:40 PM',
    issue: 'Cable Noise',
    center: 'boAt Service Center, Bengaluru',
    technician: 'Sanjay N.',
    status: 'Repaired',
    remarks: 'Internal cable replaced.',
    details: 'Cable Rewiring: Opened headphone casing, traced static noise to a frayed internal wire. Clipped damaged segment, resoldered connection with improved heat shrink insulation. Noise successfully eliminated.'
  }
];

function RepairContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serial = searchParams.get('serial') || '';

  const [expandedRows, setExpandedRows] = useState({});
  const [records, setRecords] = useState(initialRepairRecords);
  const [showMore, setShowMore] = useState(false);

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSeeMore = () => {
    if (showMore) {
      setRecords(initialRepairRecords);
      setShowMore(false);
    } else {
      // Simulate loading extra records
      const additional = [
        {
          id: 5,
          date: '14 May 2024',
          time: '04:15 PM',
          issue: 'Firmware Update Failure',
          center: 'boAt Service Center, Chennai',
          technician: 'Karthik R.',
          status: 'Repaired',
          remarks: 'Flashed default firmware.',
          details: 'Firmware Restore: Connected device to debug interface. Flashed stock firmware v2.4.1. Calibrated Bluetooth pairing and verified playback controls.'
        },
        {
          id: 6,
          date: '08 Jan 2024',
          time: '10:00 AM',
          issue: 'Bluetooth Disconnection',
          center: 'boAt Service Center, Kolkata',
          technician: 'Subhash Sen',
          status: 'Repaired',
          remarks: 'Replaced Bluetooth module chip.',
          details: 'Module Replacement: Diagnosed weak signal output. Replaced faulty BT transceiver chip on main PCB. Signal range re-verified up to 10 meters.'
        }
      ];
      setRecords([...initialRepairRecords, ...additional]);
      setShowMore(true);
    }
  };

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
            <Link href={`/warranty-result?serial=${encodeURIComponent(serial)}`} style={{ color: '#888', textDecoration: 'none' }}>Warranty Lookup</Link>
            <span>›</span>
            <span style={{ color: '#111', fontWeight: 600 }}>Repair History</span>
          </nav>
          <button
            onClick={() => router.push(`/warranty-result?serial=${encodeURIComponent(serial)}`)}
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
            ← Back to Product Details
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1600px', margin: '32px auto', padding: '0 40px' }}>
        
        {/* Title and Action Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
        }}>
          <div>
            <h1 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              color: '#111',
              margin: '0 0 6px 0',
              position: 'relative',
              display: 'inline-block'
            }}>
              Repair History
              <span style={{
                position: 'absolute',
                left: 0,
                bottom: '-6px',
                width: '64px',
                height: '4px',
                background: '#e8001d',
                borderRadius: '2px'
              }} />
            </h1>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '14px 0 0 0' }}>
              View all the repairs and services done for your product.
            </p>
          </div>

          <button
            onClick={() => alert('Downloading repair history PDF...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid #e8001d',
              color: '#e8001d',
              background: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Repair History
            <span style={{ marginLeft: '4px', fontWeight: 400 }}>&gt;</span>
          </button>
        </div>

        {/* Table Container Card */}
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          border: '1px solid #e8e8e8',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
          marginBottom: '24px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #eaeaea' }}>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '40px' }}>#</th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '160px' }}>
                  Repair Date <span style={{ color: '#e8001d', fontWeight: 'bold', marginLeft: '2px' }}>↓</span>
                </th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '220px' }}>Issue Reported</th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '240px' }}>Service Center</th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '160px' }}>Technician</th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600, width: '150px' }}>Status</th>
                <th style={{ padding: '16px 12px', fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>Remarks</th>
                <th style={{ padding: '16px 12px', width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => {
                const isExpanded = !!expandedRows[row.id];
                const isUnderProcess = row.status === 'Under Process';

                return (
                  <Suspense key={row.id}>
                    {/* Main Row */}
                    <tr 
                      onClick={() => toggleRow(row.id)}
                      style={{
                        borderBottom: isExpanded ? 'none' : '1px solid #f0f0f0',
                        cursor: 'pointer',
                        background: isExpanded ? '#fafafa' : 'transparent',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = '#fafafa'; }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <td style={{ padding: '20px 12px', fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: '20px 12px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2" style={{ flexShrink: 0 }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>{row.date}</div>
                            <div style={{ fontSize: '0.72rem', color: '#888', marginTop: '2px' }}>{row.time}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px 12px', fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>
                        {row.issue}
                      </td>
                      <td style={{ padding: '20px 12px', fontSize: '0.88rem', color: '#444', lineHeight: 1.4 }}>
                        {row.center}
                      </td>
                      <td style={{ padding: '20px 12px', fontSize: '0.88rem', color: '#444' }}>
                        {row.technician}
                      </td>
                      <td style={{ padding: '20px 12px' }}>
                        <span style={{
                          background: isUnderProcess ? '#eff6ff' : '#f0fdf4',
                          color: isUnderProcess ? '#2563eb' : '#16a34a',
                          border: isUnderProcess ? '1px solid #dbeafe' : '1px solid #dcfce7',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '20px',
                          display: 'inline-block',
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 12px', fontSize: '0.88rem', color: '#555', lineHeight: 1.4 }}>
                        {row.remarks}
                      </td>
                      <td style={{ padding: '20px 12px', textAlign: 'right' }}>
                        <svg 
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </td>
                    </tr>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                        <td colSpan="8" style={{ padding: '0 24px 20px 62px' }}>
                          <div style={{
                            borderLeft: '3px solid #e8001d',
                            paddingLeft: '16px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                          }}>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Service Details & Actions Taken
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#444', lineHeight: 1.5 }}>
                              {row.details}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Suspense>
                );
              })}
            </tbody>
          </table>

          {/* Table Footer / See More */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #f0f0f0',
            marginTop: '16px',
          }}>
            <button
              onClick={handleSeeMore}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>
                <svg 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{
                    transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {showMore ? 'Show Less Repairs' : 'See More Repairs'}
              </div>
              <span style={{ fontSize: '0.74rem', color: '#888' }}>
                {showMore ? 'hide additional rows' : '6 more repair records'}
              </span>
            </button>
          </div>

        </div>

        {/* Need Help Box */}
        <div style={{
          background: '#fff5f5',
          borderRadius: '14px',
          border: '1px solid #fee2e2',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px',
          boxShadow: '0 4px 12px rgba(232,0,29,0.01)',
          marginBottom: '40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(232,0,29,0.06)',
              border: '1.5px solid rgba(232,0,29,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeLinecap="round" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 800, color: '#111' }}>Need Help?</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
                If you face any issue with your product, contact our support team.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/contact')}
            style={{
              background: '#e8001d',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c40019'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#e8001d'; }}
          >
            Contact Support <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>→</span>
          </button>
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

export default function RepairPage() {
  return (
    <Suspense fallback={<div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#888' }}>Loading...</div>}>
      <RepairContent />
    </Suspense>
  );
}
