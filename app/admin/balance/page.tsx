'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface BalanceHistory {
    id: string
    amount: number
    prevBalance: number
    newBalance: number
    remark: string
    createdAt: string
}

interface User {
    id: string
    mobile: string
    fullName: string | null
    role: string
    balance: number
    balanceHistory: BalanceHistory[]
}

export default function AdminBalancePage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
    const [remarks, setRemarks] = useState<{ [key: string]: string }>({})
    const [error, setError] = useState('')
    const [expandedUser, setExpandedUser] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users')
            const data = await res.json()
            if (data.users) {
                setUsers(data.users)
            }
        } catch (err) {
            console.error('Failed to fetch users', err)
            setError('Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateBalance = async (userId: string) => {
        const amount = amounts[userId]
        if (!amount || isNaN(parseFloat(amount))) {
            alert('Please enter a valid amount')
            return
        }

        setUpdatingId(userId)
        try {
            const res = await fetch('/api/admin/update-balance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    amount: parseFloat(amount),
                    remark: remarks[userId] || ''
                })
            })

            if (res.ok) {
                // Refresh data
                await fetchUsers()
                // Clear inputs
                setAmounts(prev => ({ ...prev, [userId]: '' }))
                setRemarks(prev => ({ ...prev, [userId]: '' }))
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to update balance')
            }
        } catch (err) {
            console.error('Update failed', err)
            alert('An error occurred during update')
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Admin Balance Management
                    </h1>
                    <p className="text-gray-400 mt-2">Oversee user accounts and manage financial transactions efficiently.</p>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 text-left">User Details</th>
                                <th className="px-6 py-4 text-left">Current Balance</th>
                                <th className="px-6 py-4 text-left">Add Balance</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <div key={user.id} className="contents">
                                    <tr className={`hover:bg-white/[0.02] transition-colors ${expandedUser === user.id ? 'bg-white/[0.05]' : ''}`}>
                                        <td className="px-6 py-6" onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}>
                                            <div className="font-medium text-lg">{user.fullName || 'Unnamed User'}</div>
                                            <div className="text-gray-500 text-sm font-mono cursor-pointer hover:text-indigo-400 transition-colors">
                                                {user.mobile} • {user.role}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="text-2xl font-bold text-green-400">
                                                ₹{user.balance.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <input
                                                        type="number"
                                                        placeholder="Amount"
                                                        value={amounts[user.id] || ''}
                                                        onChange={(e) => setAmounts(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Remark (optional)"
                                                        value={remarks[user.id] || ''}
                                                        onChange={(e) => setRemarks(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <button
                                                onClick={() => handleUpdateBalance(user.id)}
                                                disabled={updatingId === user.id}
                                                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20"
                                            >
                                                {updatingId === user.id ? 'Saving...' : 'Save'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedUser === user.id && (
                                        <tr className="bg-black/40 border-t border-white/5">
                                            <td colSpan={4} className="px-10 py-6">
                                                <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Transaction History</h3>
                                                {user.balanceHistory.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {user.balanceHistory.map(history => (
                                                            <div key={history.id} className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/5">
                                                                <div>
                                                                    <div className="text-sm font-medium">{history.remark}</div>
                                                                    <div className="text-xs text-gray-500 lowercase">
                                                                        {new Date(history.createdAt).toLocaleString()}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className={`font-bold ${history.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                                        {history.amount >= 0 ? '+' : ''}{history.amount}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-500">
                                                                        Balance: ₹{history.prevBalance} → ₹{history.newBalance}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-500 italic text-sm py-4">No transactions found for this user.</div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </div>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
