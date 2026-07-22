'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminNavbar from '@/components/layout/AdminSidebar';
import { showToast } from '@/components/common/BoatToast';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ['Under Process', 'Repaired', 'Pending', 'Rejected'];

const statusStyle = {
  'Under Process': { bg: '#eff6ff', color: '#2563eb', border: '#dbeafe' },
  Repaired:        { bg: '#f0fdf4', color: '#16a34a', border: '#dcfce7' },
  Pending:         { bg: '#fefce8', color: '#ca8a04', border: '#fef08a' },
  Rejected:        { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
};

const statusLabel = (status) => ({
  IN_PROGRESS: 'Under Process',
  COMPLETED: 'Repaired',
  PENDING: 'Pending',
  CANCELLED: 'Rejected',
}[status] || status);

const escapeCsvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const formatCsvDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString();
};

// Mock records removed, fetching live data

// ── Status Change Modal ───────────────────────────────────────────────────────
function StatusModal({ record, onClose, onSave }) {
  const [selected, setSelected] = useState(record.repairStatus);
  const [note, setNote] = useState('');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '32px',
        width: '460px', maxWidth: '95vw',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        border: '1px solid #e8e8e8',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#111' }}>Update Repair Status</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#888' }}>#{record.id} — {record.issue}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px', lineHeight: 1 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Current status */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Status</p>
          <span style={{
            background: statusStyle[statusLabel(record.repairStatus)]?.bg || '#f5f5f5',
            color: statusStyle[statusLabel(record.repairStatus)]?.color || '#555',
            border: `1px solid ${statusStyle[statusLabel(record.repairStatus)]?.border || '#e8e8e8'}`,
            fontSize: '0.82rem', fontWeight: 700, padding: '5px 14px', borderRadius: '20px', display: 'inline-block',
          }}>{statusLabel(record.repairStatus)}</span>
        </div>

        {/* New status selector */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select New Status</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {STATUS_OPTIONS.map(opt => {
              const s = statusStyle[opt] || {};
              const isActive = selected === (opt === 'Under Process' ? 'IN_PROGRESS' : opt === 'Repaired' ? 'COMPLETED' : opt === 'Pending' ? 'PENDING' : 'CANCELLED');
              return (
                <button
                  key={opt}
                  onClick={() => {
                    let mappedOpt = opt;
                    if (opt === 'Under Process') mappedOpt = 'IN_PROGRESS';
                    if (opt === 'Repaired') mappedOpt = 'COMPLETED';
                    if (opt === 'Pending') mappedOpt = 'PENDING';
                    if (opt === 'Rejected') mappedOpt = 'CANCELLED';
                    setSelected(mappedOpt);
                  }}
                  style={{
                    padding: '11px 16px', borderRadius: '10px', cursor: 'pointer',
                    border: isActive ? `2px solid ${s.color}` : `1.5px solid ${s.border || '#e8e8e8'}`,
                    background: isActive ? s.bg : '#fafafa',
                    color: isActive ? s.color : '#555',
                    fontSize: '0.85rem', fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.15s', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <span style={{
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: s.color || '#888',
                    display: 'inline-block', flexShrink: 0,
                  }} />
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Note (optional)</p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add technician notes about this status change…"
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              border: '1.5px solid #e8e8e8', borderRadius: '8px',
              padding: '10px 12px', fontSize: '0.85rem', fontFamily: 'inherit',
              color: '#111', resize: 'vertical', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#e8001d'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e8e8e8'; }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 20px', borderRadius: '8px', border: '1.5px solid #e8e8e8', background: '#fff', color: '#555', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(record.id, selected, note)}
            disabled={selected === record.repairStatus}
            style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none',
              background: selected === record.repairStatus ? '#ccc' : '#e8001d',
              color: '#fff', fontSize: '0.85rem', fontWeight: 700,
              cursor: selected === record.repairStatus ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (selected !== record.repairStatus) e.currentTarget.style.background = '#c40019'; }}
            onMouseLeave={e => { if (selected !== record.repairStatus) e.currentTarget.style.background = '#e8001d'; }}
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toast notification (Replaced by global showToast) ─────────────────────────

// ── Page content ──────────────────────────────────────────────────────────────
function AdminRepairHistoryContent({ admin }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serial = searchParams.get('serial') || '';

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(Boolean(serial));
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [modalRecord, setModalRecord] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (!serial) {
      return;
    }
    const fetchRepairs = async () => {
      try {
        setError(null);
        const response = await fetch(`/api/warranty/${encodeURIComponent(serial)}/repairs`);
        const result = await response.json();
        if (response.ok && result.success) {
          setRecords(result.data);
        } else {
          setError(result.message || 'Failed to fetch repairs');
        }
      } catch {
        setError('Error connecting to server.');
      } finally {
        setLoading(false);
      }
    };
    fetchRepairs();
  }, [serial]);

  const toggleRow = id => setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));

  const handleSeeMore = () => {
    setShowMore(prev => !prev);
  };

  const downloadCsv = () => {
    showToast.process('Exporting repair records CSV...', 'CSV EXPORT');
    const headers = ['Serial Number', 'Repair ID', 'Repair Date', 'Issue Reported', 'Status', 'Technician Notes', 'Estimated Completion'];
    const lines = filtered.map((row) => [
      serial,
      row.id,
      formatCsvDate(row.repairDate),
      row.issue,
      statusLabel(row.repairStatus),
      row.technicianNotes,
      formatCsvDate(row.estimatedCompletion),
    ].map(escapeCsvValue).join(','));
    const csv = `\uFEFF${headers.map(escapeCsvValue).join(',')}\r\n${lines.join('\r\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `repair-history-${serial || 'product'}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast.success('Repair history CSV downloaded successfully!', 'EXPORT COMPLETE');
  };

  const handleSaveStatus = async (id, newStatus, note) => {
    showToast.process(`Updating status for Repair Ticket #${id}...`, 'UPDATING');
    try {
      const response = await fetch(`/api/repairs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repairStatus: newStatus,
          technicianNotes: note,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setRecords(prev => prev.map(r => r.id === id ? result.data : r));
        setModalRecord(null);
        showToast.success(`Repair Ticket #${id} status updated to ${statusLabel(newStatus)}`, 'STATUS UPDATED');
      } else {
        const errorMsg = result.message || 'Failed to update record';
        showToast.error(errorMsg, 'UPDATE FAILED');
      }
    } catch {
      showToast.error('Error connecting to server while updating repair status.', 'CONNECTION ERROR');
    }
  };


  const statusCounts = ['IN_PROGRESS', 'COMPLETED', 'PENDING', 'CANCELLED'].reduce((acc, s) => {
    acc[s] = records.filter(r => r.repairStatus === s).length;
    return acc;
  }, {});

  const mapFilterToStatus = {
    'Under Process': 'IN_PROGRESS',
    'Repaired': 'COMPLETED',
    'Pending': 'PENDING',
    'Rejected': 'CANCELLED'
  };

  const filtered = filterStatus === 'All' ? records : records.filter(r => r.repairStatus === mapFilterToStatus[filterStatus]);
  const visibleRecords = showMore ? filtered : filtered.slice(0, 10);

  return (
    <main style={{ background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Global keyframe */}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <AdminNavbar admin={admin} />

      {/* Breadcrumb + Back */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '14px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#888' }}>
            <Link href="/admin" style={{ color: '#888', textDecoration: 'none' }}>Dashboard</Link>
            <span>›</span>
            <Link href={`/admin/warranty-lookup?serial=${encodeURIComponent(serial)}`} style={{ color: '#888', textDecoration: 'none' }}>Warranty Lookup</Link>
            <span>›</span>
            <span style={{ color: '#111', fontWeight: 600 }}>Repair History</span>
          </nav>
          <button
            onClick={() => router.push(`/admin/warranty-lookup?serial=${encodeURIComponent(serial)}`)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #e8001d', color: '#e8001d', background: 'transparent', padding: '8px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8001d'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8001d'; }}
          >
            ← Back to Product Details
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '32px auto', padding: '0 40px', flex: 1, width: '100%' }}>

        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', margin: '0 0 6px', position: 'relative', display: 'inline-block' }}>
              Repair History
              <span style={{ position: 'absolute', left: 0, bottom: '-6px', width: '64px', height: '4px', background: '#e8001d', borderRadius: '2px' }} />
            </h1>
            <p style={{ color: '#666', fontSize: '0.88rem', margin: '14px 0 0' }}>
              Admin view — manage and update repair statuses for serial <strong style={{ color: '#111' }}>{serial || 'N/A'}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Admin badge */}
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(232,0,29,0.06)', border: '1px solid rgba(232,0,29,0.2)', color: '#e8001d', borderRadius: '8px', padding: '8px 14px', fontSize: '0.78rem', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Mode
            </span>
            <button
              onClick={downloadCsv}
              disabled={loading || filtered.length === 0}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1.5px solid #e8001d', color: '#e8001d', background: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CSV
            </button>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Records', value: records.length, color: '#111', bg: '#fff', border: '#e8e8e8', highlight: filterStatus === 'All', filterVal: 'All' },
            { label: 'Under Process', value: statusCounts['IN_PROGRESS'] || 0, color: '#2563eb', bg: '#eff6ff', border: '#dbeafe', highlight: filterStatus === 'Under Process', filterVal: 'Under Process' },
            { label: 'Repaired', value: statusCounts['COMPLETED'] || 0, color: '#16a34a', bg: '#f0fdf4', border: '#dcfce7', highlight: filterStatus === 'Repaired', filterVal: 'Repaired' },
            { label: 'Pending / Rejected', value: (statusCounts['PENDING'] || 0) + (statusCounts['CANCELLED'] || 0), color: '#ca8a04', bg: '#fefce8', border: '#fef08a', highlight: filterStatus === 'Pending' || filterStatus === 'Rejected', filterVal: 'Pending' },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => setFilterStatus(card.filterVal)}
              style={{
                background: card.bg, borderRadius: '12px',
                border: `1.5px solid ${card.highlight ? card.color : card.border}`,
                padding: '18px 20px', cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: card.highlight ? `0 4px 16px ${card.color}22` : 'none',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</p>
              <p style={{ margin: '6px 0 0', fontSize: '1.8rem', fontWeight: 900, color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Filter strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600 }}>Filter:</span>
          {['All', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '5px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                border: filterStatus === s ? `1.5px solid ${statusStyle[s]?.color || '#111'}` : '1.5px solid #e8e8e8',
                background: filterStatus === s ? (statusStyle[s]?.bg || '#111') : '#fff',
                color: filterStatus === s ? (statusStyle[s]?.color || '#fff') : '#888',
                transition: 'all 0.15s',
              }}
            >{s}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: '#aaa' }}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Table Card */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8e8', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #eaeaea' }}>
                {['#', 'Repair Date ↓', 'Issue Reported', 'Service Center', 'Technician', 'Status', 'Remarks', 'Change Status', ''].map((h, i) => (
                  <th key={i} style={{ padding: '14px 12px', fontSize: '0.82rem', color: '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {h === 'Status' ? <span>{h}</span> : h === 'Change Status'
                      ? <span style={{ color: '#e8001d' }}>{h}</span>
                      : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#888', fontSize: '0.88rem' }}>
                    Loading records...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#e8001d', fontSize: '0.88rem' }}>
                    {error}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#aaa', fontSize: '0.88rem' }}>
                    No records found for this filter.
                  </td>
                </tr>
              ) : visibleRecords.map((row, index) => {
                const isExpanded = !!expandedRows[row.id];
                const displayStatus = statusLabel(row.repairStatus);
                const s = statusStyle[displayStatus] || { bg: '#f5f5f5', color: '#555', border: '#e8e8e8' };
                const repairDateObj = new Date(row.repairDate);
                return (
                  <Suspense key={row.id}>
                    {/* Main row */}
                    <tr
                      style={{ borderBottom: isExpanded ? 'none' : '1px solid #f0f0f0', background: isExpanded ? '#fafafa' : 'transparent', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = '#fafafa'; }}
                      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {/* # */}
                      <td style={{ padding: '18px 12px', fontSize: '0.88rem', fontWeight: 600, color: '#444', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        {index + 1}
                      </td>
                      {/* Date */}
                      <td style={{ padding: '18px 12px', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2" style={{ flexShrink: 0 }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>{repairDateObj.toLocaleDateString()}</div>
                            <div style={{ fontSize: '0.72rem', color: '#888' }}>{repairDateObj.toLocaleTimeString()}</div>
                          </div>
                        </div>
                      </td>
                      {/* Issue */}
                      <td style={{ padding: '18px 12px', fontSize: '0.88rem', fontWeight: 600, color: '#222', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        {row.issue}
                      </td>
                      {/* Center */}
                      <td style={{ padding: '18px 12px', fontSize: '0.82rem', color: '#444', lineHeight: 1.4, cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        Official Service Center
                      </td>
                      <td style={{ padding: '18px 12px', fontSize: '0.82rem', color: '#444', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        Assigned Tech
                      </td>
                      {/* Status badge */}
                      <td style={{ padding: '18px 12px', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: '0.76rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                          {displayStatus}
                        </span>
                      </td>
                      {/* Remarks */}
                      <td style={{ padding: '18px 12px', fontSize: '0.82rem', color: '#555', lineHeight: 1.4, maxWidth: '180px', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        {row.technicianNotes || 'N/A'}
                      </td>
                      {/* Change Status — ADMIN ONLY button */}
                      <td style={{ padding: '18px 12px' }}>
                        <button
                          onClick={e => { e.stopPropagation(); setModalRecord(row); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: '#e8001d', color: '#fff',
                            border: 'none', borderRadius: '8px',
                            padding: '7px 14px', fontSize: '0.78rem', fontWeight: 700,
                            cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#c40019'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#e8001d'; }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          Change Status
                        </button>
                      </td>
                      {/* Expand toggle */}
                      <td style={{ padding: '18px 12px', textAlign: 'right', cursor: 'pointer' }} onClick={() => toggleRow(row.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </td>
                    </tr>

                    {/* Expandable details drawer */}
                    {isExpanded && (
                      <tr style={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                        <td colSpan="9" style={{ padding: '0 24px 20px 56px' }}>
                          <div style={{ borderLeft: '3px solid #e8001d', paddingLeft: '16px', paddingTop: '8px', paddingBottom: '4px' }}>
                            <h4 style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Service Details &amp; Actions Taken
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#444', lineHeight: 1.6 }}>{row.technicianNotes || 'No detailed actions recorded yet.'}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Suspense>
                );
              })}
            </tbody>
          </table>

          {/* See More */}
          {filtered.length > 10 && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #f0f0f0', marginTop: '16px' }}>
            <button
              onClick={handleSeeMore}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px 16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {showMore ? 'Show Less Repairs' : 'See More Repairs'}
              </div>
              <span style={{ fontSize: '0.74rem', color: '#888' }}>{showMore ? 'hide additional rows' : `${filtered.length - 10} more repair record${filtered.length - 10 === 1 ? '' : 's'}`}</span>
            </button>
          </div>}
        </div>

        {/* Admin Info Banner */}
        <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', padding: '16px 22px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" style={{ flexShrink: 0 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div>
            <span style={{ color: '#1d4ed8', fontWeight: 700, fontSize: '0.85rem' }}>Admin Privilege: </span>
            <span style={{ color: '#3b82f6', fontSize: '0.85rem' }}>
              Use the <strong>Change Status</strong> button on any record to update the repair status. Changes are reflected immediately and will be visible to the customer.
            </span>
          </div>
        </div>

      </div>

      {/* Trust Footer */}
      <footer style={{ background: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '28px 48px', borderTop: '1px solid #222', flexWrap: 'wrap' }}>
        {[
          { title: '100% Genuine Products', desc: 'Authentic boAt products with official warranty.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /><path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /></svg> },
          { title: 'Instant Verification', desc: 'Get warranty details in seconds.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
          { title: 'Digital Certificate', desc: 'Download and save your warranty certificate.', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /><polyline points="14,2 14,8 20,8" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /><line x1="9" y1="13" x2="15" y2="13" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /><line x1="9" y1="17" x2="12" y2="17" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /></svg> },
          { title: '24x7 Support', desc: "We're always here to help you.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 18v-6a9 9 0 0118 0v6" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" stroke="#E8001D" strokeWidth="2" /></svg> },
        ].map((item, idx, arr) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, maxWidth: '240px', padding: '12px 24px', borderRight: idx < arr.length - 1 ? '1px solid #2a2a2a' : 'none' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(232,0,29,0.4)', background: 'rgba(232,0,29,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px' }}>{item.title}</div>
              <div style={{ color: '#777', fontSize: '0.72rem', lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </footer>

      {/* Status Change Modal */}
      {modalRecord && (
        <StatusModal
          record={modalRecord}
          onClose={() => setModalRecord(null)}
          onSave={handleSaveStatus}
        />
      )}
    </main>
  );
}

// ── Page wrapper with admin auth guard ────────────────────────────────────────
export default function AdminRepairHistoryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const admin = session?.user;
  useEffect(() => {
    if (status !== 'loading' && admin?.role !== 'ADMIN') {
      router.replace('/admin/login');
    }
  }, [status, admin?.role, router]);

  if (loading || admin?.role !== 'ADMIN') {
    return (
      <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '1rem' }}>
        Verifying admin access…
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#888' }}>
        Loading…
      </div>
    }>
      <AdminRepairHistoryContent admin={admin} />
    </Suspense>
  );
}
