'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminWithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/withdrawal');
      if (res.ok) {
        const data = await res.json();
        setWithdrawals(data.withdrawals);
      }
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'DECLINED') => {
    if (processing) return;
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/withdrawal/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Update local state
        setWithdrawals(prev => 
          prev.map(w => w.id === id ? { ...w, status } : w)
        );
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Something went wrong');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Withdrawal Management
            </h1>
            <p className="text-gray-400 mt-2">Review and process withdrawal requests efficiently.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-6 py-2 rounded-xl border border-white/10 transition-all font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              href="/admin/balance"
              className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-6 py-2 rounded-xl border border-white/10 transition-all font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Balance
            </Link>
          </div>
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : withdrawals.length > 0 ? (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User / Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Bank Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{w.user.fullName || 'No Name'}</div>
                        <div className="text-sm text-gray-400">{w.user.mobile}</div>
                        <div className="text-[10px] text-gray-500 uppercase mt-1">{new Date(w.createdAt).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-black text-green-400">₹{w.amount.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-gray-500 font-bold">User Balance: ₹{w.user.balance.toLocaleString('en-IN')}</div>
                      </td>
                      <td className="px-6 py-4">
                        {w.bankDetails ? (
                          <div className="text-xs space-y-1">
                            <p><span className="text-gray-500">Name:</span> <span className="text-gray-300">{w.bankDetails.holderName}</span></p>
                            <p className="font-mono bg-white/5 px-2 py-1 rounded"><span className="text-gray-500">Acc:</span> <span className="text-gray-300">{w.bankDetails.accountNumber}</span></p>
                            <p><span className="text-gray-500">IFSC:</span> <span className="text-gray-300">{w.bankDetails.ifscCode}</span></p>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-xs">No details</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          w.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                          w.status === 'DECLINED' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {w.status === 'PENDING' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateStatus(w.id, 'APPROVED')}
                              disabled={processing !== null}
                              className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              {processing === w.id ? '...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(w.id, 'DECLINED')}
                              disabled={processing !== null}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                              {processing === w.id ? '...' : 'Decline'}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
            <h3 className="text-lg font-bold text-gray-400">No withdrawal requests found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
