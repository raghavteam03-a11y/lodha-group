'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function IncomeRecordsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/profile" className="mr-4 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center font-serif tracking-wide">Income Records</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Empty State Icon */}
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl mb-8 relative group border-4 border-gray-50">
               <div className="absolute inset-0 bg-gradient-to-br from-[#FAD961]/10 to-transparent rounded-full"></div>
               <svg className="w-16 h-16 text-[#D4AF37] opacity-40 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-3">No income records</h2>
            <p className="text-gray-500 max-w-xs mb-10 leading-relaxed font-medium">
              Your earnings will appear here once your investments start generating returns.
            </p>

            <div className="flex flex-col w-full gap-4 max-w-sm">
              <Link 
                href="/vip-plans" 
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
              >
                Start Earning Now
              </Link>
              <Link 
                href="/recharge" 
                className="bg-white text-[#B8860B] border-2 border-[#D4AF37]/20 px-8 py-4 rounded-2xl font-black hover:border-[#D4AF37]/40 transition-all uppercase tracking-widest text-sm"
              >
                Recharge Wallet
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Blobs */}
      <div className="fixed top-1/4 -left-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
