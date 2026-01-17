'use client';

import Link from 'next/link';

export default function WithdrawalRecordsPage() {
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
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center tracking-wide">Withdraw Records</h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Empty State Icon */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-50 mb-6 group transition-all hover:scale-110">
           <svg className="w-12 h-12 text-[#D4AF37] opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
           </svg>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">No withdraw records found</h2>
        <p className="text-gray-500 text-center max-w-xs mb-8">
          You haven't made any withdrawals yet. Start investing to earn and withdraw your profits!
        </p>

        <Link 
          href="/vip-plans" 
          className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          View Investment Plans
        </Link>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-[#B8860B] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
