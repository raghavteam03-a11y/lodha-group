'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PersonalInfoPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center tracking-wide">Personal Information</h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {loading ? (
             <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
             </div>
        ) : (
            <>
                 {/* Investor Card */}
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl shadow-2xl p-6 mb-8 text-white relative overflow-hidden border border-[#D4AF37]/30">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37] opacity-10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fff] opacity-5 rounded-full blur-[40px] -translate-x-1/3 translate-y-1/3"></div>
                    <div className="absolute top-4 right-4 text-[#D4AF37]/20">
                         <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 2L1 21h22L12 2zm0 3.8L19.2 19H4.8L12 5.8z"/>
                         </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#B8860B] p-[2px] shadow-lg">
                                <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#D4AF37] text-2xl font-bold">
                                    {user?.fullName?.[0]?.toUpperCase() || 'U'}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-wide">{user?.fullName || 'Investor'}</h2>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Official Investor</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-white/40 text-xs uppercase tracking-widest">Mobile Number</p>
                            <p className="text-lg font-mono tracking-wider text-[#F0F0F0]">{user?.mobile || 'Not Available'}</p>
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-[#D4AF37]">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Welcome to the Team!</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Dear <span className="font-semibold text-[#B8860B]">{user?.fullName || 'Investor'}</span>, 
                        <br/><br/>
                        We are proud to have you as a valued member of the Lodha Group investor family. Your trust powers our commitment to building a better life. Together, we are creating a legacy of wealth and excellence.
                    </p>
                </div>

                 {/* Information List */}
                 <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">Account Details</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="text-sm text-gray-500">Full Name</span>
                            <span className="text-sm font-medium text-gray-900">{user?.fullName || '-'}</span>
                        </div>
                         <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="text-sm text-gray-500">Mobile Number</span>
                            <span className="text-sm font-medium text-gray-900">{user?.mobile || '-'}</span>
                        </div>
                         <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="text-sm text-gray-500">User ID</span>
                            <span className="text-sm font-medium text-gray-900 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                {user?.id?.substring(0, 8).toUpperCase() || 'ID-XXXX'}
                            </span>
                        </div>
                        <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                            <span className="text-sm text-gray-500">Status</span>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">ACTIVE</span>
                        </div>
                    </div>
                 </div>
            </>
        )}
      </div>
    </div>
  );
}
