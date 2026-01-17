import Image from 'next/image';
import Link from 'next/link';
import { Property } from '../data/properties';

// Icons
const BedIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const AreaIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="group bg-white rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative">
      {/* Image Section with VIP Badge */}
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        
        {/* VIP Level Badge */}
        {property.vipLevel && (
          <div className="absolute top-4 left-4">
             <div className="bg-gradient-to-br from-[#FAD961] to-[#D4AF37] text-black text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-1.5">
               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
               </svg>
               VIP {property.vipLevel}
             </div>
          </div>
        )}
        
        <div className="absolute top-4 right-4">
           <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 shadow-lg">
             Investment Property
           </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-5 left-6 right-6">
          <h3 className="text-2xl font-black text-white mb-1 drop-shadow-md tracking-tight">
            {property.name}
          </h3>
          <div className="flex items-center gap-3">
            <p className="text-white/70 text-xs flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {property.location}
            </p>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <p className="text-white/70 text-xs flex items-center gap-1.5 font-medium">
               <AreaIcon />
               {property.area} sq.ft.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Main Stats Card */}
        <div className="bg-[#F8F9FA] rounded-3xl p-5 border border-gray-100 mb-6 group-hover:bg-white transition-colors duration-500">
           <div className="grid grid-cols-2 gap-y-6">
             <div>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Daily Income</p>
                <p className="text-[#D4AF37] text-2xl font-black">{formatPrice(property.dailyIncome)}</p>
             </div>
             <div className="text-right">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Time Cycle</p>
                <div className="flex items-center justify-end gap-1.5">
                   <p className="text-gray-900 text-2xl font-black">{property.cycleDays}</p>
                   <p className="text-gray-400 text-xs font-bold mt-1">Days</p>
                </div>
             </div>
             <div>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Total Return</p>
                <p className="text-green-600 text-2xl font-black">{formatPrice(property.totalReturn)}</p>
             </div>
             <div className="text-right">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Rating</p>
                <div className="flex items-center justify-end gap-0.5 text-[#D4AF37]">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                     </svg>
                   ))}
                </div>
             </div>
           </div>
        </div>

        {/* Invest CTA Button */}
        <Link 
          href={`/property/${property.id}`}
          className="w-full bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white py-4 px-6 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(184,134,11,0.2)] hover:shadow-[0_15px_40px_rgba(184,134,11,0.3)] transition-all flex items-center justify-between group/btn active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            Buy Now
            <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="text-white/30 font-light mx-2">|</span>
          <span className="tracking-tight">{formatPrice(property.price)}</span>
        </Link>
      </div>
    </div>
  );
}
