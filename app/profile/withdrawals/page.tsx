'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WithdrawalRecordsPage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await fetch('/api/withdrawal');
        if (res.ok) {
          const data = await res.json();
          setWithdrawals(data.withdrawals);
        }
      } catch (error) {
        console.error('Error fetching withdrawals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">APPROVED</span>;
      case 'DECLINED':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">DECLINED</span>;
      default:
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full">PENDING</span>;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return "payment successfully received in attached account";
      case 'DECLINED':
        return "payment failed";
      default:
        return "withdrawal amount request is sent and it need to approved by admin";
    }
  };

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
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : withdrawals.length > 0 ? (
          <div className="space-y-4">
            {withdrawals.map((w) => (
              <div key={w.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-2xl font-black text-gray-900">₹{w.amount.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {new Date(w.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {getStatusBadge(w.status)}
                </div>
                
                <div className={`mt-3 p-3 rounded-xl text-xs font-medium ${
                  w.status === 'APPROVED' ? 'bg-green-50 text-green-700 border border-green-100' :
                  w.status === 'DECLINED' ? 'bg-red-50 text-red-700 border border-red-100' :
                  'bg-orange-50 text-orange-700 border border-orange-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {getStatusMessage(w.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
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
        )}
      </div>

      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-[#D4AF37] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-[#B8860B] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
