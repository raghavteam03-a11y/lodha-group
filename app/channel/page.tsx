'use client';

import Link from 'next/link';

export default function ChannelPage() {
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
             <h1 className="text-2xl font-bold text-white">Join Channel</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center text-center py-8">
             <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4 text-[#B8860B]">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
             </div>
             <h2 className="text-xl font-bold text-gray-800 mb-2">Official Channel</h2>
             <p className="text-gray-500 text-sm mb-6">Join our official channel for latest updates and announcements.</p>
             
             <button className="w-full bg-[#229ED9] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-[#1E88BC] transition-all flex items-center justify-center gap-2">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.48-.94-2.4-1.54-1.06-.7-.37-1.09.23-1.72.15-.16 2.8-2.56 2.85-2.78.01-.03.01-.13-.06-.18-.07-.05-.17-.03-.24-.02-.11.01-1.77 1.14-5 3.32-.46.32-.89.47-1.28.46-.42-.01-1.23-.24-1.83-.44-.73-.24-1.31-.36-1.26-.76.02-.19.29-.39.8-.59 3.14-1.36 5.24-2.27 6.3-2.73 3.01-1.33 3.63-1.6 4.03-1.6.09 0 .28.02.41.11.11.08.14.19.15.26v.04z"/></svg>
               Join Telegram Channel
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
