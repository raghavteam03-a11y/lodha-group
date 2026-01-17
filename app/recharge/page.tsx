'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RechargePage() {
  const [activeTab, setActiveTab] = useState<'recharge' | 'withdrawal'>('recharge');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'A' | 'B'>('A');
  const [balance, setBalance] = useState(0);

  const quickAmounts = [2000, 875, 295, 625, 1000, 1200, 1500, 2200, 3300];

  useEffect(() => {
    // Fetch user and balance
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setBalance(data.user.balance || 0);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleRecharge = () => {
    const amount = parseInt(customAmount);
    if (isNaN(amount) || amount < 295) {
      alert('Minimum recharge amount is ₹295');
      return;
    }
    // Simulation for now
    alert('Redirecting to payment gateway...');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-28">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center font-serif tracking-wide">Recharge</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-100 shadow-sm overflow-hidden rounded-b-2xl mb-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-2">
            <button
              onClick={() => setActiveTab('recharge')}
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all text-center ${
                activeTab === 'recharge'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              Recharge
            </button>
            <Link
              href="/withdrawal"
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all text-center ${
                activeTab === 'withdrawal'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md'
                  : 'bg-gray-50 text-gray-400'
              }`}
            >
              Withdrawal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        
        {/* Balance Display Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center justify-between border border-gray-100">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center text-[#B8860B]">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div>
               <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Available Balance</p>
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">{formatPrice(balance)}</h2>
             </div>
           </div>
        </div>

        {/* Quick Amount Section */}
        <div className="mb-8">
          <label className="block text-gray-900 font-bold mb-4 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full"></div>
            Quick Select
          </label>
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount(amount.toString());
                }}
                className={`py-4 px-2 rounded-2xl font-bold transition-all text-center border-2 ${
                  selectedAmount === amount
                    ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] border-transparent text-white shadow-lg scale-[1.05] z-10'
                    : 'bg-white border-gray-100 text-[#B8860B] hover:border-[#D4AF37]'
                }`}
              >
                {formatPrice(amount)}
              </button>
            ))}
          </div>
        </div>

        {/* Enter Amount Section */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100">
          <label className="block text-gray-900 font-bold mb-4">Recharge Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              placeholder="0"
              className="w-full py-5 pl-10 pr-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-3xl font-black focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Online Channel Section */}
        <div className="mb-8">
          <label className="block text-gray-900 font-bold mb-4 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full"></div>
            Payment Method
          </label>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setSelectedChannel('A')}
              className={`p-1 rounded-3xl transition-all ${
                selectedChannel === 'A' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-lg' : 'bg-gray-100'
              }`}
            >
              <div className="bg-white rounded-[1.4rem] p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                     selectedChannel === 'A' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-gray-50 text-gray-400'
                   }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                   </div>
                   <div className="text-left">
                     <p className={`font-black uppercase tracking-widest text-[10px] ${selectedChannel === 'A' ? 'text-[#B8860B]' : 'text-gray-400'}`}>Recommended</p>
                     <p className="font-bold text-gray-900">Direct Pay Channel A</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedChannel === 'A' ? 'border-[#B8860B] bg-[#B8860B]' : 'border-gray-200'
                }`}>
                   {selectedChannel === 'A' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedChannel('B')}
              className={`p-1 rounded-3xl transition-all ${
                selectedChannel === 'B' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] shadow-lg' : 'bg-gray-100'
              }`}
            >
              <div className="bg-white rounded-[1.4rem] p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                     selectedChannel === 'B' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-gray-50 text-gray-400'
                   }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                   </div>
                   <div className="text-left">
                     <p className={`font-black uppercase tracking-widest text-[10px] ${selectedChannel === 'B' ? 'text-[#B8860B]' : 'text-gray-400'}`}>Fast Transfer</p>
                     <p className="font-bold text-gray-900">Swift Pay Channel B</p>
                   </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedChannel === 'B' ? 'border-[#B8860B] bg-[#B8860B]' : 'border-gray-200'
                }`}>
                   {selectedChannel === 'B' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recharge Button */}
        <button 
          onClick={handleRecharge}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-5 px-6 rounded-3xl font-black text-xl shadow-[0_10px_30px_rgb(184,134,11,0.3)] hover:shadow-[0_15px_40px_rgb(184,134,11,0.4)] transition-all active:scale-[0.98] mb-10"
        >
          Add Funds
        </button>

        {/* Recharge Introduction */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-12">
          <h3 className="text-lg font-black text-[#B8860B] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recharge Policy
          </h3>
          <div className="space-y-4">
             {[
               "Minimum top-up amount is ₹295.",
               "Please pay and submit UTR within the given time.",
               "Each payment request is single-use. Do not reuse details."
             ].map((text, idx) => (
               <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] font-bold text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{text}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="fixed top-1/3 -right-24 w-64 h-64 bg-[#D4AF37] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/3 -left-24 w-64 h-64 bg-[#B8860B] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
