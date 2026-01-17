'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyBankPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    holderName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: 'SAVINGS'
  });

  useEffect(() => {
    // Load existing bank details
    const savedBankDetails = localStorage.getItem('bankDetails');
    if (savedBankDetails) {
      const details = JSON.parse(savedBankDetails);
      setFormData(details);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('bankDetails', JSON.stringify(formData));
    // Redirect to withdrawal page
    router.push('/withdrawal');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#8B6914] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/withdrawal" className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl md:text-2xl font-bold flex-1 text-center">My Bank</h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      {/* Illustration Section */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gradient-to-br from-[#F7E7CE] to-[#F4D03F]/30 rounded-2xl p-8">
              <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-gray-600 text-sm">Secure Bank Account Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            {/* Holder Name */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">Holder name</label>
              <input
                type="text"
                value={formData.holderName}
                onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                placeholder="Account Holder Name"
                required
                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="Account Number"
                required
                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* IFSC Code */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">IFSC Code</label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                placeholder="IFSC Code"
                required
                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Account Type */}
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Account Type</label>
              <select
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
