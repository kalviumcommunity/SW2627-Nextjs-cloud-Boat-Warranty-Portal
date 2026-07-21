export default function ProductDetailCard({ product, serial, onCopy, copied }) {
  const purchaseDate = new Date(product.purchaseDate).toLocaleDateString();
  const expiryDate = new Date(product.warrantyExpiry).toLocaleDateString();
  const isActive = product.warrantyStatus === 'ACTIVE';
  const daysLeft = Math.max(0, Math.ceil((new Date(product.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24)));

  const rows = [
    { label: 'Serial Number', value: serial, copy: true },
    { label: 'Purchase Date', value: purchaseDate, bold: true },
    {
      label: 'Warranty Expiry Date',
      value: (
        <span>
          {expiryDate}{' '}
          {isActive && <span style={{ color: '#e8001d', fontWeight: 600 }}>({daysLeft} days left)</span>}
        </span>
      ),
      bold: true,
    },
    {
      label: 'Warranty Status',
      value: (
        <span style={{ color: isActive ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
          {product.warrantyStatus}
        </span>
      ),
    },
  ];

  return (
    <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8e8', padding: '28px', display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: '200px', height: '200px', flexShrink: 0, borderRadius: '14px', overflow: 'hidden', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '48px' }}>🎧</div>
      </div>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#111', margin: 0 }}>{product.productName}</h1>
          {isActive && (
            <span style={{ background: '#e6f9f0', color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', border: '1px solid #bbf7d0', whiteSpace: 'nowrap' }}>
              Active Warranty
            </span>
          )}
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < rows.length - 1 ? '1px solid #f0f0f0' : 'none', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ width: '180px', flexShrink: 0, fontSize: '0.88rem', color: '#888' }}>{row.label}</span>
            <span style={{ fontSize: '0.95rem', fontWeight: row.bold ? 700 : 400, color: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {row.value}
              {row.copy && (
                <button title="Copy serial number" onClick={onCopy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#16a34a' : '#888', padding: 0, transition: 'color 0.2s' }}>
                  {copied
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                  }
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
