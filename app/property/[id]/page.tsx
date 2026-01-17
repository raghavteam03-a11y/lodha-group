import Image from 'next/image';
import Link from 'next/link';
import { properties } from '../../data/properties';
import { notFound } from 'next/navigation';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-28">
      {/* Premium Sticky Header */}
      <header className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-serif font-black tracking-widest uppercase">Invest Detail</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pt-6">
        
        {/* Gallery & Hero Info */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
           <div className="relative w-full h-[30vh] md:h-[50vh]">
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              {/* Overlay Tags */}
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#D4AF37] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
                      VIP Level {property.vipLevel}
                    </span>
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {property.type}
                    </span>
                 </div>
                 <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">{property.name}</h2>
              </div>
           </div>

           {/* Core Investment Stats Card */}
           <div className="p-6 md:p-8 bg-[#1A1A1A] text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="space-y-1">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Investment</p>
                    <p className="text-2xl font-black text-[#D4AF37]">{formatPrice(property.price)}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Daily Return</p>
                    <p className="text-2xl font-black text-[#D4AF37]">{formatPrice(property.dailyIncome)}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Time Cycle</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-black">{property.cycleDays}</span>
                       <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Days</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Total Profit</p>
                    <p className="text-2xl font-black text-green-500">{formatPrice(property.totalReturn)}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                 <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></div>
                   Investment Description
                 </h3>
                 <p className="text-gray-500 font-medium leading-relaxed italic border-l-4 border-gray-50 pl-6">
                   {property.description}
                 </p>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                 <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full"></div>
                   Plan Features
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] group hover:bg-[#D4AF37]/5 transition-colors border border-transparent hover:border-[#D4AF37]/10">
                         <div className="w-10 h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-[#D4AF37]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                         </div>
                         <span className="text-gray-700 font-bold text-sm tracking-wide">{amenity}</span>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Sidebar Info */}
           <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                 <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Asset Location</p>
                    <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">{property.location}</span>
                 </div>
                 
                 <div className="space-y-6 mb-8 pt-6 border-t border-gray-50">
                    <div className="flex justify-between items-center">
                       <span className="text-gray-500 font-medium text-sm">Building</span>
                       <span className="text-gray-900 font-black text-sm">{property.building}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-500 font-medium text-sm">Area Sqft</span>
                       <span className="text-gray-900 font-black text-sm">{property.area} sq.ft.</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-500 font-medium text-sm">Rooms</span>
                       <span className="text-gray-900 font-black text-sm">{property.bedrooms} BHK</span>
                    </div>
                 </div>

                 <button className="w-full bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white py-5 px-6 rounded-3xl font-black text-lg shadow-[0_10px_30px_rgba(184,134,11,0.25)] hover:shadow-[0_15px_40px_rgba(184,134,11,0.35)] transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    Confirm Investment
                 </button>
                 <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-4">
                    Secured by Lodha Trust Wallet
                 </p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Decorative Blobs */}
      <div className="fixed top-1/3 -right-32 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-32 w-80 h-80 bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
