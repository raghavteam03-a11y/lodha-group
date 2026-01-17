import { getCurrentUser } from '@/lib/auth-utils';
import PropertyCard from './components/PropertyCard';
import { properties } from './data/properties';
import Link from 'next/link';
import AnnouncementPopup from './components/AnnouncementPopup';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Immersive Hero Section - Gold Theme */}
      <div className="relative bg-[#B8860B] overflow-hidden rounded-b-[2.5rem] pb-8 shadow-xl">
        <div className="absolute inset-0">
           {/* Abstract lighter gold elements */}
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4AF37] opacity-20 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#DAA520] opacity-20 rounded-full blur-[60px] transform -translate-x-1/3 translate-y-1/3"></div>
           
           {/* Subtle gradient for depth, keeping it Gold */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#8B6508]/10"></div>
        </div>

        <div className="relative container mx-auto px-6 pt-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                LODHA GROUP
              </h1>
              <p className="text-white/90 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 drop-shadow-sm">
                Building a Better Life
              </p>
            </div>
            
            <Link href="/profile" className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-transform active:scale-95">
               <div className="w-6 h-6 rounded-full bg-white text-[#B8860B] flex items-center justify-center font-bold text-xs shadow-inner">
                 {user?.fullName ? user.fullName[0].toUpperCase() : 'G'}
               </div>
               <div className="text-right hidden md:block">
                 <p className="text-white text-[10px] font-bold leading-tight">
                   {user?.fullName || 'Guest'}
                 </p>
                 {user && <p className="text-white/90 text-[8px]">VIP</p>}
               </div>
            </Link>
          </header>

          {/* Hero Content - Compact */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-medium text-white leading-tight drop-shadow-md">
                Invest in <span className="text-white font-serif italic">Excellence</span>
              </h2>
            </div>
            
            <div className="flex gap-3">
               <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/10 shadow-lg text-center">
                 <p className="text-white text-lg font-bold">12%</p>
                 <p className="text-white/90 text-[10px] uppercase">Returns</p>
               </div>
               <div className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl border border-white/10 shadow-lg text-center">
                 <p className="text-white text-lg font-bold">80k + </p>
<p className="text-white/90 text-[10px] uppercase">Investors</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-6 mt-6 relative z-20 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center px-6 md:px-12">
          <Link href="/recharge" className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B8860B] rounded-xl flex items-center justify-center shadow-md group-active:scale-95 transition-transform text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
               </svg>
            </div>
            <span className="text-[10px] md:text-xs font-medium text-gray-700">Recharge</span>
          </Link>

          <Link href="/withdrawal" className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B8860B] rounded-xl flex items-center justify-center shadow-md group-active:scale-95 transition-transform text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
             </div>
             <span className="text-[10px] md:text-xs font-medium text-gray-700">Withdraw</span>
          </Link>

          <Link href="/channel" className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B8860B] rounded-xl flex items-center justify-center shadow-md group-active:scale-95 transition-transform text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
             </div>
             <span className="text-[10px] md:text-xs font-medium text-gray-700">Channel</span>
          </Link>

          <Link href="/helpline" className="flex flex-col items-center gap-2 group">
             <div className="w-12 h-12 md:w-14 md:h-14 bg-[#B8860B] rounded-xl flex items-center justify-center shadow-md group-active:scale-95 transition-transform text-white">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             </div>
             <span className="text-[10px] md:text-xs font-medium text-gray-700">Helpline</span>
          </Link>
        </div>
      </div>
      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="hidden md:block text-2xl font-bold text-[#1A1A1A]">
            Featured <span className="text-[#D4AF37] font-serif italic">Collections</span>
          </h2>
          <Link href="/vip-plans" className="text-sm font-medium text-[#D4AF37] hover:text-[#B8860B] transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Welcome Announcement Popup */}
      <AnnouncementPopup />
    </main>
  );
}
