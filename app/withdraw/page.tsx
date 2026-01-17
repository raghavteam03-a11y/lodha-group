'use client';

import Link from 'next/link';

export default function WithdrawPage() {
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
             <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center text-center py-8">
             <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4 text-[#B8860B]">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 mb-2">Request Withdrawal</h2>
             <p className="text-gray-500 text-sm mb-6">Enter the amount you wish to withdraw from your wallet.</p>
             
             <div className="w-full mb-4">
               <label className="block text-left text-sm font-medium text-gray-700 mb-1">Amount</label>
               <input type="number" placeholder="Enter amount" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B8860B] focus:border-[#B8860B] outline-none" />
             </div>

             <button className="w-full bg-[#B8860B] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-[#8B6508] transition-all">
               Submit Request
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
