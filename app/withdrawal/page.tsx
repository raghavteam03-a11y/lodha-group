'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WithdrawalPage() {
  const [activeTab, setActiveTab] = useState<'recharge' | 'withdrawal'>('withdrawal');
  const [amount, setAmount] = useState('200');
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [bankDetails, setBankDetails] = useState<{
    holderName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
  } | null>(null);

  // Popup State
  const [popup, setPopup] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    // Fetch user and balance
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setBalance(data.user.balance || 0);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();

    // Load bank details from localStorage
    const savedBankDetails = localStorage.getItem('bankDetails');
    if (savedBankDetails) {
      setBankDetails(JSON.parse(savedBankDetails));
    }
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const calculateReceive = (amt: number) => {
    // 10% platform fee
    return Math.round(amt * 0.9);
  };

  const isWithdrawalTimeValid = () => {
    const now = new Date();
    // Convert current time to IST
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hours = istTime.getHours();
    
    // 07:00 AM to 05:00 PM (17:00)
    return hours >= 7 && hours < 17;
  };

  const handleWithdraw = async () => {
    const withdrawAmt = parseInt(amount);

    if (!isWithdrawalTimeValid()) {
      setPopup({
        show: true,
        message: 'Withdrawals are only allowed between 07:00 AM and 05:00 PM IST.',
        type: 'error'
      });
      return;
    }

    if (!bankDetails) {
      setPopup({
        show: true,
        message: 'Please add your bank account details first.',
        type: 'error'
      });
      return;
    }

    if (isNaN(withdrawAmt) || withdrawAmt < 190) {
      setPopup({
        show: true,
        message: 'Minimum withdrawal amount is ₹190.',
        type: 'error'
      });
      return;
    }

    if (withdrawAmt > balance) {
      setPopup({
        show: true,
        message: `Insufficient balance. You can only withdraw up to ${formatPrice(balance)}.`,
        type: 'error'
      });
      return;
    }

    // Simulate withdrawal request
    try {
      setPopup({
        show: true,
        message: 'The withdraw amount will be sent in 1-2 hours to your bank account.',
        type: 'success'
      });
      
      // Reset amount
      setAmount('');
      
    } catch (error) {
      setPopup({
        show: true,
        message: 'Something went wrong. Please try again later.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-24 relative">
      {/* Custom Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
             onClick={() => setPopup({ ...popup, show: false })}
           ></div>
           
           {/* Modal Body */}
           <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
              <div className={`h-2 w-full ${
                popup.type === 'success' ? 'bg-green-500' : 
                popup.type === 'error' ? 'bg-red-500' : 'bg-[#D4AF37]'
              }`}></div>
              
              <div className="p-8 text-center">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                   popup.type === 'success' ? 'bg-green-50 text-green-500' : 
                   popup.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-[#D4AF37]'
                 }`}>
                    {popup.type === 'success' && (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {popup.type === 'error' && (
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    )}
                    {popup.type === 'info' && (
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                    )}
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-900 mb-2">
                   {popup.type === 'success' ? 'Successful' : popup.type === 'error' ? 'Notice' : 'Information'}
                 </h3>
                 <p className="text-gray-600 text-sm leading-relaxed mb-8">
                   {popup.message}
                 </p>
                 
                 <button 
                   onClick={() => setPopup({ ...popup, show: false })}
                   className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] ${
                     popup.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200' :
                     popup.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200' :
                     'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-[#D4AF37]/30'
                   }`}
                 >
                   OK
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white mb-4">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center font-serif">Withdrawal</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm overflow-hidden rounded-b-2xl mb-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-2">
            <Link
              href="/recharge"
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all text-center ${
                activeTab === 'recharge'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              Recharge
            </Link>
            <button
              onClick={() => setActiveTab('withdrawal')}
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all text-center ${
                activeTab === 'withdrawal'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              Withdrawal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Available Balance</p>
            <span className="text-3xl font-black text-gray-900 tracking-tight">{formatPrice(balance)}</span>
          </div>
          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center text-[#B8860B]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
          </div>
        </div>

        {/* Enter Amount */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <label className="block text-gray-900 font-bold mb-4 flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full"></div>
            Enter Amount
          </label>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full py-4 pl-10 pr-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-2xl font-black focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div className="flex items-center justify-between bg-[#FAD961]/10 p-4 rounded-2xl border border-[#FAD961]/20">
              <span className="text-sm font-bold text-gray-500 italic">You will receive:</span>
              <span className="text-xl font-black text-[#B8860B] drop-shadow-sm">{formatPrice(calculateReceive(parseInt(amount) || 0))}</span>
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        {bankDetails ? (
          <div className="mb-6">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-[#D4AF37]/30">
              {/* Decorative Card Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center border border-[#D4AF37]/30">
                       <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                       </svg>
                    </div>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Withdrawal Account</span>
                  </div>
                  <div className="bg-[#D4AF37] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {bankDetails.accountType}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1">Account Holder</label>
                    <p className="text-xl font-bold tracking-wide">{bankDetails.holderName}</p>
                  </div>
                  <div>
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block mb-1">Account Number</label>
                    <p className="text-2xl font-mono font-bold tracking-[0.1em] text-[#D4AF37]">{bankDetails.accountNumber}</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-8 pt-4 border-t border-white/10">
                  <Link href="/my-bank" className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Info
                  </Link>
                  <Link href="/my-bank" className="text-xs font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Modify
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-3xl p-8 text-white text-center shadow-xl">
              <p className="font-bold mb-6 text-lg">No bank account linked</p>
              <Link href="/my-bank" className="bg-white text-[#D4AF37] px-8 py-3.5 rounded-2xl font-black shadow-lg inline-block hover:scale-105 transition-all">
                Link Bank Account
              </Link>
            </div>
          </div>
        )}

        {/* Withdraw Button */}
        <button 
          onClick={handleWithdraw}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-5 px-6 rounded-3xl font-black text-xl shadow-[0_10px_30px_rgb(184,134,11,0.3)] hover:shadow-[0_15px_40px_rgb(184,134,11,0.4)] transition-all active:scale-[0.98] mb-8"
        >
          Withdraw Now
        </button>

        {/* Withdrawal Information */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-10">
          <h3 className="text-lg font-black text-[#B8860B] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Withdrawal Guidelines
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
               <div className="w-5 h-5 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
               </div>
               <span className="text-gray-600 text-sm font-medium leading-relaxed">
                 Minimum withdrawal limit is <span className="text-gray-900 font-bold">₹190</span>
               </span>
            </li>
            <li className="flex items-start gap-3">
               <div className="w-5 h-5 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
               </div>
               <span className="text-gray-600 text-sm font-medium leading-relaxed">
                 Operations window: <span className="text-gray-900 font-bold">07:00 AM - 05:00 PM IST</span>
               </span>
            </li>
            <li className="flex items-start gap-3">
               <div className="w-5 h-5 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
               </div>
               <span className="text-gray-600 text-sm font-medium leading-relaxed">
                 Platform maintenance fee: <span className="text-gray-900 font-bold">10% Tax</span>
               </span>
            </li>
            <li className="flex items-start gap-3">
               <div className="w-5 h-5 bg-[#D4AF37]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
               </div>
               <span className="text-gray-600 text-sm font-medium leading-relaxed">
                 Standard processing time: <span className="text-gray-900 font-bold">0 - 5 minutes</span>
               </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
