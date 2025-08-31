'use client';

import { useEffect, useState } from 'react';
import UploadModal from '../components/UploadModal';

export default function OznilGorkemPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    // Add CSS to hide specific unwanted elements only
    const style = document.createElement('style');
    style.textContent = `
      /* Very specific targeting for unwanted elements only */
      
      /* Navbar - target specific navbar classes */
      nav[class*="navbar"],
      [class*="navbar"]:not([style*="backgroundImage"]),
      header[class*="navbar"],
      .navbar {
        display: none !important;
      }
      
      /* Footer - target specific footer classes */
      footer[class*="footer"],
      [class*="footer"]:not([style*="backgroundImage"]),
      .footer {
        display: none !important;
      }
      
      /* Cart components */
      [class*="cart"]:not([style*="backgroundImage"]),
      .cart-provider {
        display: none !important;
      }
      
      /* TrustpilotBanner (legit bar) - very specific targeting */
      div[class*="bg-gradient-to-r"][class*="fixed"][class*="top-0"],
      div[class*="fixed"][class*="top-0"][class*="bg-gradient"],
      div[class*="trustpilot"][class*="fixed"],
      div[class*="banner"][class*="fixed"],
      /* Target the specific TrustpilotBanner structure */
      div[class*="bg-gradient-to-r from-green-400"],
      div[class*="fixed top-0 left-0 w-full bg-gradient"],
      div[class*="text-white text-center py-1.5 px-2 font-medium text-sm"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        z-index: -9999 !important;
      }
      
      /* Tawk.to specific targeting */
      [id*="tawk"],
      [class*="tawk"],
      iframe[src*="tawk"],
      iframe[src*="tawk.to"],
      .tawk-min-container,
      .tawk-button,
      .tawk-chat {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        z-index: -9999 !important;
      }
      
      /* Toast and toaster components */
      [class*="toast"]:not([style*="backgroundImage"]),
      [class*="toaster"]:not([style*="backgroundImage"]),
      .toaster {
        display: none !important;
      }
      
      /* Remove padding from body and html */
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      
      /* Make main take full screen */
      main {
        padding: 0 !important;
        margin: 0 !important;
        min-height: 100vh !important;
        width: 100% !important;
      }
      
      /* Hide the pt-12 wrapper elements but keep main */
      .pt-12 {
        padding: 0 !important;
        margin: 0 !important;
      }
      
      .pt-12 > *:not(main) {
        display: none !important;
      }
      
      /* Ensure our background div is always visible and on top */
      div[style*="backgroundImage"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);

    // Also remove elements with JavaScript as backup
    const removeElements = () => {
      const unwantedSelectors = [
        // Navbar
        'nav[class*="navbar"]',
        '[class*="navbar"]',
        '.navbar',
        // Footer
        'footer[class*="footer"]',
        '[class*="footer"]',
        '.footer',
        // Cart
        '[class*="cart"]',
        '.cart-provider',
        // TrustpilotBanner (legit bar)
        'div[class*="bg-gradient-to-r"][class*="fixed"][class*="top-0"]',
        'div[class*="fixed"][class*="top-0"][class*="bg-gradient"]',
        'div[class*="trustpilot"][class*="fixed"]',
        'div[class*="banner"][class*="fixed"]',
        'div[class*="bg-gradient-to-r from-green-400"]',
        'div[class*="fixed top-0 left-0 w-full bg-gradient"]',
        // Tawk.to
        '[id*="tawk"]',
        '[class*="tawk"]',
        'iframe[src*="tawk"]',
        'iframe[src*="tawk.to"]',
        '.tawk-min-container',
        '.tawk-button',
        '.tawk-chat',
        // Toast
        '[class*="toast"]',
        '[class*="toaster"]',
        '.toaster'
      ];
      
      unwantedSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // Don't remove elements that have backgroundImage in their style
          if (!el.getAttribute('style')?.includes('backgroundImage')) {
            el.remove();
          }
        });
      });
      
      // Remove padding from body
      document.body.style.padding = '0';
      document.body.style.margin = '0';
      document.body.style.overflow = 'hidden';
      
      // Make main take full screen
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.padding = '0';
        mainElement.style.margin = '0';
        mainElement.style.minHeight = '100vh';
        mainElement.style.width = '100%';
      }
    };

    // Run cleanup
    removeElements();
    setTimeout(removeElements, 100);
    setTimeout(removeElements, 500);
    setTimeout(removeElements, 1000);
    setTimeout(removeElements, 2000); // Extra delay for any late-loading elements
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Blurred background layer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/wedding-couple.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          zIndex: 1
        }}
      />
      
      {/* Gradient overlay - transparent on top, darkish on bottom */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)',
          zIndex: 2
        }}
      />
      
              {/* Card container */}
        <div 
          style={{
            position: 'relative',
            zIndex: 3,
            width: '90vw',
            maxWidth: '500px',
            height: '80vh',
            maxHeight: '700px',
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
            backgroundImage: 'url(/wedding-couple.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '40px 25px',
            margin: '0 auto'
          }}
        >
        {/* Gradient overlay on the card */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.8) 100%)',
            zIndex: 1
          }}
        />
        
        {/* Names overlay */}
        <div 
          style={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '15px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div 
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '8px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}
          >
            Öznil <span style={{ color: 'white' }}>❤️</span> Görkem
          </div>
          <div 
            style={{
              fontSize: '18px',
              opacity: 0.95,
              marginBottom: '25px',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}
          >
            Desteğin bizim için çok kıymetli, iyi ki varsın! ❤️
          </div>
        </div>
        
        {/* Share memories button */}
        <button 
          style={{
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 25px',
            fontSize: '18px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            display: 'block',
            width: '100%'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#333';
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLElement).style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'black';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
          onClick={() => setIsUploadModalOpen(true)}
        >
          Anılarını Paylaş
        </button>
      </div>

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
