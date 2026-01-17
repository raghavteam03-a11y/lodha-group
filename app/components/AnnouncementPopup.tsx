'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the announcement has been shown this session
    const hasBeenShown = sessionStorage.getItem('lodha_announcement_shown');
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('lodha_announcement_shown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500" 
        onClick={closePopup}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in-95 fade-in duration-500 overflow-hidden border border-[#D4AF37]/20">
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10 p-2 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="pt-12 pb-8 px-8 text-center bg-white relative">
           {/* Logo / Header */}
           <div className="mb-6">
              <h2 className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-[#B8860B] via-[#D4AF37] to-[#8B6914] tracking-tight">
                LODHA GROUP
              </h2>
              <p className="text-[#B8860B] text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
                BUILDING A BETTER LIFE
              </p>
           </div>

           {/* Announcement Subtitle */}
           <div className="mb-8">
              <p className="text-gray-900 font-bold text-lg">Lodha Most-Stable App</p>
              <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full mt-2"></div>
           </div>

           {/* Details List */}
           <div className="space-y-4 mb-10 text-gray-700 font-medium text-[15px]">
              <div className="flex flex-col items-center">
                <span className="text-[#B8860B] font-black text-xs uppercase tracking-widest mb-1">Feature</span>
                <p>Daily Income and Daily Withdrawals</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[#B8860B] font-black text-xs uppercase tracking-widest mb-1">Entry</span>
                <p>Minimum Deposit: <span className="text-gray-900 font-bold">₹295</span></p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[#B8860B] font-black text-xs uppercase tracking-widest mb-1">Liquidity</span>
                <p>Minimum Withdrawal: <span className="text-gray-900 font-bold">₹190</span></p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[#B8860B] font-black text-xs uppercase tracking-widest mb-1">Timing</span>
                <p>Withdrawals time: <span className="text-gray-900 font-bold">07:00 - 17:00</span></p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 w-full">
                 <h3 className="font-black text-gray-900 mb-4 uppercase tracking-[0.2em] text-xs">Invite Commission</h3>
                 <div className="grid grid-cols-1 gap-1 text-sm font-bold">
                    <p className="text-gray-600">Level 1 - <span className="text-[#B8860B] text-lg">10%</span></p>
                    <p className="text-gray-400 font-medium">Level 2 - <span className="opacity-50">0%</span></p>
                    <p className="text-gray-400 font-medium">Level 3 - <span className="opacity-50">0%</span></p>
                 </div>
              </div>
           </div>

           {/* CTA Button */}
           <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-4.5 px-6 rounded-2xl font-black shadow-[0_10px_25px_rgba(184,134,11,0.25)] hover:shadow-[0_15px_30px_rgba(184,134,11,0.35)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.64-.35-.99.22-1.56.15-.15 2.7-2.48 2.75-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.35-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.49 1-.74 3.9-1.69 6.51-2.81 7.83-3.34 3.71-1.49 4.49-1.74 4.99-1.75.11 0 .35.03.5.16.13.1.17.25.18.35-.01.07.01.19 0 .28z" />
              </svg>
              <span>Channel</span>
           </button>
        </div>
      </div>
    </div>
  );
}
