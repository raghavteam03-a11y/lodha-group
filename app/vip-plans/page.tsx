'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { vipPlans } from '../data/vipPlans';

export default function VIPPlansPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'vip'>('vip');

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-32">
      {/* Elite Gold Header */}
      <div className="bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6914] pb-20 pt-10 rounded-b-[3rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="group flex items-center gap-3 text-white transition-all bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/20 active:scale-95">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-black uppercase tracking-widest">Back</span>
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-serif font-black text-white drop-shadow-lg tracking-tighter">LODHA GROUP</h1>
              <div className="h-0.5 w-12 bg-white/30 ml-auto mt-1 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center mt-8">
             <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-[10px] font-black tracking-[0.3em] text-white uppercase mb-4 shadow-sm">
               Investment Portal
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight leading-tight">
               VIP <span className="font-serif italic font-medium opacity-80">Privilege</span> Plans
             </h2>
             <p className="text-white/80 text-sm md:text-base max-w-sm mx-auto font-medium leading-relaxed italic border-l-2 border-white/20 pl-4">
               Accelerated wealth compounding through our most exclusive property assets.
             </p>
          </div>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="container mx-auto px-6 -mt-10 relative z-20 mb-12">
        <div className="bg-white/90 backdrop-blur-xl p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex gap-2 border border-white max-w-md mx-auto">
            <Link
              href="/"
              className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all text-center flex items-center justify-center gap-2 group"
            >
              <svg className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Properties
            </Link>
            <button
              className="flex-1 py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-[0_10px_20px_rgba(184,134,11,0.2)] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              VIP Access
            </button>
        </div>
      </div>

      {/* Plans List - Premium Cards */}
      <section className="container mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vipPlans.map((plan, idx) => (
            <div key={plan.id} className="group bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 flex flex-col items-center text-center">
               {/* Header Image */}
               <div className="relative w-full h-56 overflow-hidden">
                 <Image
                   src={plan.image}
                   alt={plan.name}
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-110"
                 />
                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                 
                 {/* Tier Label */}
                 <div className="absolute top-6 left-6">
                    <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest shadow-xl">
                      Limit: {plan.limit}
                    </div>
                 </div>
               </div>

               {/* Plan Content */}
               <div className="px-8 pb-10 -mt-8 relative z-10 w-full">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 mb-6 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i >= (idx + 1) ? 'opacity-20' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Profit Matrix */}
                  <div className="bg-[#F8F9FA] rounded-[2.5rem] p-6 mb-8 border border-gray-50 group-hover:bg-white group-hover:border-[#D4AF37]/20 transition-all duration-500">
                     <div className="grid grid-cols-2 gap-y-6">
                        <div className="text-center border-r border-gray-100">
                           <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Entry Capital</p>
                           <p className="text-gray-900 text-xl font-black">{formatPrice(plan.price)}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Daily Payout</p>
                           <p className="text-[#D4AF37] text-xl font-black">{formatPrice(plan.daily)}</p>
                        </div>
                        <div className="text-center border-r border-gray-100">
                           <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Time Frame</p>
                           <p className="text-gray-900 text-xl font-black">{plan.days} <span className="text-[10px] text-gray-400 uppercase">Days</span></p>
                        </div>
                        <div className="text-center">
                           <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">Net ROI</p>
                           <p className="text-green-600 text-xl font-black">{formatPrice(plan.total)}</p>
                        </div>
                     </div>
                  </div>

                  {/* Invest Button */}
                  <button className="w-full bg-[#1A1A1A] text-white py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-[#D4AF37]/20 transition-all active:scale-[0.98] group/btn">
                     <span className="group-hover:text-[#D4AF37] transition-colors">Apply for VIP {idx + 1}</span>
                  </button>
                  
                  <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-700 leading-relaxed italic">
                    "{plan.description}"
                  </p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <div className="container mx-auto px-6 py-16 text-center">
         <p className="text-gray-400 text-xs font-serif italic max-w-xs mx-auto mb-4 tracking-wide leading-relaxed">
           "Quality is more important than quantity. One home run is much better than two doubles."
         </p>
         <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gray-200"></div>
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">Lodha Portfolio</p>
            <div className="h-px w-8 bg-gray-200"></div>
         </div>
      </div>
    </div>
  );
}
