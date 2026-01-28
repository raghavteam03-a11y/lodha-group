'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MyBankPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    holderName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: 'SAVINGS'
  });

  const [errors, setErrors] = useState({
    holderName: '',
    accountNumber: '',
    ifscCode: ''
  });

  const [touched, setTouched] = useState({
    holderName: false,
    accountNumber: false,
    ifscCode: false
  });

  useEffect(() => {
    // Load existing bank details
    const savedBankDetails = localStorage.getItem('bankDetails');
    if (savedBankDetails) {
      const details = JSON.parse(savedBankDetails);
      setFormData(details);
    }
  }, []);

  // Validation functions
  const validateHolderName = (name: string) => {
    if (!name.trim()) {
      return 'Holder name is required';
    }
    if (name.trim().length < 3) {
      return 'Holder name must be at least 3 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Holder name should only contain letters';
    }
    return '';
  };

  const validateAccountNumber = (number: string) => {
    if (!number.trim()) {
      return 'Account number is required';
    }
    if (!/^\d+$/.test(number)) {
      return 'Account number must contain only numbers';
    }
    if (number.length < 9 || number.length > 18) {
      return 'Account number must be between 9-18 digits';
    }
    return '';
  };

  const validateIfscCode = (code: string) => {
    if (!code.trim()) {
      return 'IFSC code is required';
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(code)) {
      return 'Invalid IFSC format (e.g., SBIN0001234)';
    }
    return '';
  };

  // Handle input changes with validation
  const handleHolderNameChange = (value: string) => {
    setFormData({ ...formData, holderName: value });
    if (touched.holderName) {
      setErrors({ ...errors, holderName: validateHolderName(value) });
    }
  };

  const handleAccountNumberChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, accountNumber: numericValue });
    if (touched.accountNumber) {
      setErrors({ ...errors, accountNumber: validateAccountNumber(numericValue) });
    }
  };

  const handleIfscCodeChange = (value: string) => {
    // Convert to uppercase and allow only alphanumeric
    const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
    setFormData({ ...formData, ifscCode: upperValue });
    if (touched.ifscCode) {
      setErrors({ ...errors, ifscCode: validateIfscCode(upperValue) });
    }
  };

  // Handle blur events
  const handleBlur = (field: 'holderName' | 'accountNumber' | 'ifscCode') => {
    setTouched({ ...touched, [field]: true });
    
    let error = '';
    switch (field) {
      case 'holderName':
        error = validateHolderName(formData.holderName);
        break;
      case 'accountNumber':
        error = validateAccountNumber(formData.accountNumber);
        break;
      case 'ifscCode':
        error = validateIfscCode(formData.ifscCode);
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const holderNameError = validateHolderName(formData.holderName);
    const accountNumberError = validateAccountNumber(formData.accountNumber);
    const ifscCodeError = validateIfscCode(formData.ifscCode);

    // Mark all fields as touched
    setTouched({
      holderName: true,
      accountNumber: true,
      ifscCode: true
    });

    // Set all errors
    setErrors({
      holderName: holderNameError,
      accountNumber: accountNumberError,
      ifscCode: ifscCodeError
    });

    // If any errors exist, don't submit
    if (holderNameError || accountNumberError || ifscCodeError) {
      return;
    }

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
              <Image 
                src="/bank-security.webp" 
                alt="Secure Banking" 
                width={192}
                height={192}
                loading="lazy"
                className="mx-auto mb-4 object-contain"
              />
              <p className="text-gray-600 text-sm font-medium">Secure Bank Account Management</p>
              <p className="text-gray-500 text-xs mt-1">Your financial information is protected with bank-grade security</p>
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
                onChange={(e) => handleHolderNameChange(e.target.value)}
                onBlur={() => handleBlur('holderName')}
                placeholder="Account Holder Name"
                className={`w-full py-3 px-4 bg-gray-50 border-2 rounded-lg focus:outline-none transition-colors ${
                  touched.holderName && errors.holderName
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-200 focus:border-[#D4AF37]'
                }`}
              />
              {touched.holderName && errors.holderName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.holderName}
                </p>
              )}
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">Account Number</label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.accountNumber}
                onChange={(e) => handleAccountNumberChange(e.target.value)}
                onBlur={() => handleBlur('accountNumber')}
                placeholder="Account Number (numbers only)"
                className={`w-full py-3 px-4 bg-gray-50 border-2 rounded-lg focus:outline-none transition-colors ${
                  touched.accountNumber && errors.accountNumber
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-200 focus:border-[#D4AF37]'
                }`}
              />
              {touched.accountNumber && errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.accountNumber}
                </p>
              )}
            </div>

            {/* IFSC Code */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-2">IFSC Code</label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => handleIfscCodeChange(e.target.value)}
                onBlur={() => handleBlur('ifscCode')}
                placeholder="IFSC Code (e.g., SBIN0001234)"
                maxLength={11}
                className={`w-full py-3 px-4 bg-gray-50 border-2 rounded-lg focus:outline-none transition-colors uppercase ${
                  touched.ifscCode && errors.ifscCode
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-200 focus:border-[#D4AF37]'
                }`}
              />
              {touched.ifscCode && errors.ifscCode && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.ifscCode}
                </p>
              )}
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
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
