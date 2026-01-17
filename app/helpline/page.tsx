'use client';

import Link from 'next/link';

export default function HelplinePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-[#B8860B] pb-8 pt-8 rounded-b-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DAA520] opacity-20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <Link href="/" className="text-white bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
               </svg>
             </Link>
             <h1 className="text-2xl font-bold text-white">Customer Support</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center text-center py-8">
             <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4 text-[#B8860B]">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 mb-2">How can we help?</h2>
             <p className="text-gray-500 text-sm mb-6">Our support team is available 24/7 to assist you correctly.</p>
             
             <button className="w-full bg-[#B8860B] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-[#8B6508] transition-all">
               Connect on WhatsApp
             </button>
             <button className="w-full mt-3 bg-white border border-[#B8860B] text-[#B8860B] py-3 rounded-xl font-bold hover:bg-[#B8860B]/5 transition-all">
               Connect on Telegram
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
