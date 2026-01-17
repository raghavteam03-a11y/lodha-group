'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Icons
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const OrderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BankIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// const DownloadIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//   </svg>
// );

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();

  const [bankDetails, setBankDetails] = useState<any>(null);
  const [recharge] = useState(0);
  const [totalIncome] = useState(0);
  const [user, setUser] = useState<any>(null);

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
      }
    };
    fetchUser();

    const savedBankDetails = localStorage.getItem('bankDetails');
    if (savedBankDetails) {
      setBankDetails(JSON.parse(savedBankDetails));
    }
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // 🔴 LOGOUT FUNCTION
  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (!confirmLogout) return;

    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        // Clear client storage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to home / login
        router.push('/');
        router.refresh();
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Something went wrong while logging out.');
    }
  };

  const menuItems = [
    { icon: <UserIcon />, label: 'Personal information', href: '/profile/info' },
    { icon: <OrderIcon />, label: 'My Orders', href: '/profile/orders' },
    { icon: <WalletIcon />, label: 'Income Records', href: '/profile/income' },
    { icon: <BankIcon />, label: 'Withdraw Records', href: '/profile/withdrawals' },
    { icon: <InfoIcon />, label: 'About us', href: '/about' },
    // { icon: <DownloadIcon />, label: 'Download App', href: '#' },
    { icon: <LogoutIcon />, label: 'Log out', action: 'logout', danger: true },
  ];
  
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-28">
      {/* Premium Header - Gold Theme */}
      <div className="bg-[#B8860B] pb-20 pt-8 rounded-b-[2.5rem] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DAA520] opacity-20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8B6508] opacity-10 rounded-full blur-[50px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white text-[#B8860B] text-2xl font-bold flex items-center justify-center shadow-lg border-2 border-white/30">
                {user?.fullName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">{user?.fullName || 'User Name'}</h1>
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-sm">{user?.mobile || '+91 XXXXX XXXXX'}</span>
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium border border-white/20">VIP Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        {/* Floating Stats Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between divide-x divide-gray-100">
            <div className="flex-1 text-center px-2">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Balance</div>
              <div className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                {formatPrice(user?.balance || 0)}
              </div>
            </div>
            <div className="flex-1 text-center px-2">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Recharge</div>
              <div className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
                {formatPrice(recharge)}
              </div>
            </div>
            <div className="flex-1 text-center px-2">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Income</div>
              <div className="text-xl md:text-2xl font-bold text-[#D4AF37]">
                {formatPrice(totalIncome)}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Card */}
        {bankDetails && (
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2C2C2C] rounded-2xl shadow-lg p-5 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Account Holder</p>
                <p className="font-semibold text-lg">{bankDetails.holderName}</p>
              </div>
              <div className="bg-[#D4AF37]/20 p-2 rounded-lg">
                <BankIcon />
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Account Number</p>
                <p className="font-mono text-xl tracking-wider">{bankDetails.accountNumber}</p>
              </div>
              <Link href="/my-bank" className="flex items-center gap-1 text-[#D4AF37] text-sm font-medium hover:text-white transition-colors">
                <span>Edit</span>
                <EditIcon />
              </Link>
            </div>
          </div>
        )}

        {/* Menu Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-2">
            {menuItems.map((item, index) => {
              if (item.action === 'logout') {
                return (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${item.danger
                        ? 'bg-red-50 text-red-500 group-hover:bg-red-100'
                        : 'bg-gray-50 text-gray-600 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]'
                        }`}>
                        {item.icon}
                      </div>
                      <span className={`font-medium ${item.danger ? 'text-red-600' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href || '#'}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group mb-1 last:mb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight />
                </Link>
              );
            })}
          </div>
        </div>

        {/* App Version */}
        <div className="text-center mt-6 text-gray-400 text-xs">
          <p className="mt-1">Lodha Group © 2026</p>
        </div>
      </div>
    </div>
  );
}
