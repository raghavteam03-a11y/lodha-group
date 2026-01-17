'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InvitePage() {
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    // Fetch user to get ID for referral code
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          // Generate a simple referral link based on user ID
          if (data.user?.id) {
             const code = data.user.id.substring(0, 8).toUpperCase();
             setReferralLink(`https://lodhagroup.com/register?ref=${code}`);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Join Lodha Group's premier investment platform and earn daily returns! Use my referral code to sign up.`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4 p-1 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center tracking-wide">Refer & Earn</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        
        {/* Hero Card */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl mb-8">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37] opacity-20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Invite Friends</h2>
              <p className="text-[#D4AF37] font-medium text-lg mb-6">Earn <span className="text-2xl font-bold">10%</span> Commission</p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-6">
                 <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Your Referral Link</p>
                 <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={referralLink || 'Loading...'} 
                      className="bg-transparent text-white text-sm flex-1 outline-none font-mono truncate"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="bg-[#D4AF37] hover:bg-[#B8860B] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors"
                    >
                      {copied ? 'COPIED!' : 'COPY'}
                    </button>
                 </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + referralLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
                  >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                     WhatsApp
                  </a>
                  <button className="flex items-center justify-center gap-2 bg-[#0088cc] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                     Telegram
                  </button>
               </div>
           </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
           <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">How it Works</h3>
           <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#FFF8E1] text-[#D4AF37] flex items-center justify-center font-bold text-lg shrink-0">1</div>
                 <div>
                    <h4 className="font-bold text-gray-800">Share your link</h4>
                    <p className="text-sm text-gray-500">Copy your unique referral link and share it with your friends.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#FFF8E1] text-[#D4AF37] flex items-center justify-center font-bold text-lg shrink-0">2</div>
                 <div>
                    <h4 className="font-bold text-gray-800">Friend Registers</h4>
                    <p className="text-sm text-gray-500">Your friend signs up using your link and becomes part of your team.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#FFF8E1] text-[#D4AF37] flex items-center justify-center font-bold text-lg shrink-0">3</div>
                 <div>
                    <h4 className="font-bold text-gray-800">Earn Rewards</h4>
                    <p className="text-sm text-gray-500">You earn commission instantly when they invest in any plan.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Team Stats Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-6">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#1A1A1A]">My Team</h3>
              <Link href="/team" className="text-sm text-[#D4AF37] font-medium">View All</Link>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#1A1A1A]">0</div>
                 <div className="text-xs text-gray-500 uppercase">Total Members</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                 <div className="text-2xl font-bold text-[#D4AF37]">₹0</div>
                 <div className="text-xs text-gray-500 uppercase">Total Commission</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
