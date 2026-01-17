'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center tracking-wide">About Lodha Group </h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-[#1A1A1A] py-16 px-6 overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B8860B] opacity-10 rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3"></div>
         
         <div className="relative container mx-auto text-center z-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FAD961] to-[#D4AF37] mb-4 drop-shadow-sm">
             Building a Better Life
           </h2>
           <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
             For over four decades, Lodha Group has been crafting world's finest developments, delivering excellence and trust to thousands of families.
           </p>
         </div>
      </div>

      {/* Key Stats - Trust Indicators */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
           <div className="p-2">
             <div className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-1">44+</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Years of Legacy</div>
           </div>
           <div className="p-2 border-l border-gray-100">
             <div className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-1">65k+</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Homes Delivered</div>
           </div>
           <div className="p-2 border-l border-gray-100 lg:border-l-0">
             <div className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-1">100M+</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Sq. Ft. Delivered</div>
           </div>
           <div className="p-2 border-l border-gray-100">
             <div className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-1">40+</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Ongoing Projects</div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-12">
      
        {/* Why Invest Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#D4AF37] rounded-full"></div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Why Invest With Us?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37] hover:shadow-lg transition-shadow">
               <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Listed Company Trust</h4>
               <p className="text-gray-600 text-sm">
                 Officially listed as <strong>Macrotech Developers Limited</strong>. We adhere to the highest standards of corporate governance and transparency.
               </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37] hover:shadow-lg transition-shadow">
               <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">High Return Potential</h4>
               <p className="text-gray-600 text-sm">
                 Our daily income plans are backed by real estate assets, offering you stable and consistent returns on your investment.
               </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37] hover:shadow-lg transition-shadow">
               <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Sustainable Growth</h4>
               <p className="text-gray-600 text-sm">
                 We are committed to <strong>Net Zero Carbon by 2050</strong>. Investing with us means investing in a sustainable future.
               </p>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#D4AF37] hover:shadow-lg transition-shadow">
               <h4 className="font-bold text-lg mb-2 text-[#1A1A1A]">Global Standards</h4>
               <p className="text-gray-600 text-sm">
                 We bring world-class design and quality to India, partnering with global legends like Armani/Casa and Trump.
               </p>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="bg-[#FFF8E1] -mx-6 px-6 py-10">
          <div className="container mx-auto">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Awards & Recognition</h3>
               <p className="text-gray-600 text-sm">Excellence recognised globally</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
               <div className="bg-white px-6 py-4 rounded-full shadow-sm border border-[#D4AF37]/20 flex items-center gap-3">
                 <div className="text-2xl">🏆</div>
                 <div className="text-sm font-bold text-gray-800">Top Developer of the Year</div>
               </div>
               <div className="bg-white px-6 py-4 rounded-full shadow-sm border border-[#D4AF37]/20 flex items-center gap-3">
                 <div className="text-2xl">🌿</div>
                 <div className="text-sm font-bold text-gray-800">Green Champion Award</div>
               </div>
               <div className="bg-white px-6 py-4 rounded-full shadow-sm border border-[#D4AF37]/20 flex items-center gap-3">
                 <div className="text-2xl">🥇</div>
                 <div className="text-sm font-bold text-gray-800">#1 in Asia (GRESB)</div>
               </div>
               <div className="bg-white px-6 py-4 rounded-full shadow-sm border border-[#D4AF37]/20 flex items-center gap-3">
                 <div className="text-2xl">👷</div>
                 <div className="text-sm font-bold text-gray-800">Great Place to Work</div>
               </div>
            </div>
          </div>
        </section>

        {/* Vision Quote */}
        <section className="text-center max-w-2xl mx-auto">
          <div className="text-4xl text-[#D4AF37] mb-4">“</div>
          <p className="text-lg md:text-xl text-gray-700 italic font-serif leading-relaxed">
            Our vision is to build a better life for everyone, by delivering the world's finest developments and ensuring our customers trust us with their biggest life investments.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-[#B8860B] rounded-full flex items-center justify-center text-white font-bold">AL</div>
            <div className="text-left">
              <div className="font-bold text-sm text-[#1A1A1A]">Abhishek Lodha</div>
              <div className="text-xs text-gray-500">Managing Director & CEO</div>
            </div>
          </div>
        </section>
      </div>
      
      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="container mx-auto">
           <Link href="/" className="block w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
             Start Investing Now
           </Link>
        </div>
      </div>
    </div>
  );
}
