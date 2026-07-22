'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import UserNavbar from '@/components/layout/UserNavbar';
import Footer from '@/components/layout/Footer';

const FAQ_ITEMS = [
  {
    question: 'How do I verify my boAt product warranty status?',
    answer: 'Simply copy the serial number printed on your boAt product label or barcode label on the retail box. Enter it into the warranty search field on our home page. Click "Verify Warranty" to view coverage duration, status, and download certificates.',
    category: 'Verification'
  },
  {
    question: 'What is covered under the boAt warranty policy?',
    answer: 'Our standard warranty covers manufacturing defects, internal component failures, and wiring issues under normal usage conditions. It does not cover physical damages, water ingress (unless specified by IPX rating limits), unauthorized repairs, or cosmetic wear and tear.',
    category: 'Policy'
  },
  {
    question: 'What documents do I need to register a warranty claim?',
    answer: 'You will need a copy of your purchase invoice from an authorized reseller (Amazon, Flipkart, boAt official website, etc.) showing the purchase date, serial number, and product model name. Standard PDF or JPEG format is supported.',
    category: 'Claims'
  },
  {
    question: 'How long does a repair or replacement ticket usually take?',
    answer: 'Once your product is registered and delivered to our nearest authorized repair center, standard diagnostic evaluation and repairs take between 3 to 7 business days. You can track this progress in real-time on your dashboard.',
    category: 'Support'
  },
  {
    question: 'What should I do if my serial number is not recognized?',
    answer: 'Double-check if you have entered all alphanumeric characters correctly (e.g., checking O vs. 0 and I vs. 1). If it still fails, please register a claim via the "Register Claims" page or contact our support team directly for manual verification.',
    category: 'Verification'
  },
  {
    question: 'How can I download my official warranty certificate?',
    answer: 'Once you perform a lookup search with a valid serial number and matching user account, you can access your warranty details card. Click the "Download Certificate" button to retrieve a secure, signed digital PDF certificate.',
    category: 'Claims'
  }
];

export default function FAQPage() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: '#080808', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main Container */}
      <main style={{
        flex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        padding: '60px 24px 80px',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            color: 'var(--red)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px'
          }}>
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            How can we help you today?
          </h1>
          
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#141414',
            border: '1.5px solid #222',
            borderRadius: '10px',
            padding: '14px 20px',
            maxWidth: '550px',
            margin: '0 auto',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search by keyword, question, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                width: '100%',
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1.5px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: 'rgba(232,0,29,0.1)',
                        color: 'var(--red)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.5px'
                      }}>
                        {faq.category}
                      </span>
                      <span style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff' }}>
                        {faq.question}
                      </span>
                    </div>
                    <svg 
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s',
                        flexShrink: 0
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  <div style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.25s ease-out, padding 0.25s ease-out',
                    borderTop: isOpen ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <p style={{
                      padding: '20px 24px 24px',
                      color: '#999',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              border: '1.5px dashed #222',
              borderRadius: '12px',
              color: '#666',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#999', marginBottom: '4px' }}>No matches found</div>
              <div style={{ fontSize: '0.8rem' }}>Try searching using different keywords or view categories.</div>
            </div>
          )}
        </div>

        {/* Contact Help Panel */}
        <div style={{
          background: 'radial-gradient(ellipse at right, rgba(232,0,29,0.06) 0%, rgba(20,20,20,0) 80%)',
          border: '1.5px solid rgba(232,0,29,0.15)',
          borderRadius: '16px',
          padding: '30px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>Still have questions?</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.5 }}>
              If your question isn't answered here, reach out to our dedicated boAt support representatives.
            </p>
          </div>
          <Link 
            href="/contact"
            style={{
              background: 'var(--red)',
              color: '#fff',
              fontSize: '0.88rem',
              fontWeight: 700,
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Contact Support
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
