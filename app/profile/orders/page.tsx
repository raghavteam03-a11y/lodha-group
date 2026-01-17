'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyOrdersPage() {
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
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center font-serif tracking-wide">My Orders</h1>
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
            {/* Empty State Illustration Placeholder */}
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#FAD961]/20 to-transparent rounded-3xl"></div>
               <svg className="w-16 h-16 text-[#D4AF37] opacity-40 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-3">No active orders</h2>
            <p className="text-gray-500 max-w-xs mb-10 leading-relaxed font-medium">
              You haven't invested in any properties yet. Start your investment journey to build permanent wealth.
            </p>

            <Link 
              href="/vip-plans" 
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-10 py-4 rounded-2xl font-black shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </div>

      {/* Background Decorative Blobs */}
      <div className="fixed top-20 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-20 left-0 w-72 h-72 bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
