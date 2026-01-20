'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FundHistory {
    id: string
    type: 'BALANCE' | 'RECHARGE' | 'INCOME'
    amount: number
    prevValue: number
    newValue: number
    remark: string
    createdAt: string
}

interface User {
    id: string
    mobile: string
    fullName: string | null
    role: string
    balance: number
    recharge: number
    income: number
    fundHistory: FundHistory[]
}

export default function AdminBalancePage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
    const [recharges, setRecharges] = useState<{ [key: string]: string }>({})
    const [incomes, setIncomes] = useState<{ [key: string]: string }>({})
    const [remarks, setRemarks] = useState<{ [key: string]: string }>({})
    const [error, setError] = useState('')
    const [expandedUser, setExpandedUser] = useState<string | null>(null)
    const router = useRouter()

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
        const recharge = recharges[userId]
        const income = incomes[userId]

        if (!amount && !recharge && !income) {
            alert('Please enter at least one value to update')
            return
        }

        setUpdatingId(userId)
        try {
            const res = await fetch('/api/admin/update-balance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    amount: amount ? parseFloat(amount) : undefined,
                    recharge: recharge ? parseFloat(recharge) : undefined,
                    income: income ? parseFloat(income) : undefined,
                    remark: remarks[userId] || ''
                })
            })

            if (res.ok) {
                // Refresh data
                await fetchUsers()
                // Clear inputs
                setAmounts(prev => ({ ...prev, [userId]: '' }))
                setRecharges(prev => ({ ...prev, [userId]: '' }))
                setIncomes(prev => ({ ...prev, [userId]: '' }))
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

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/admin/logout', { method: 'POST' })
            if (res.ok) {
                router.push('/admin/login')
            } else {
                alert('Logout failed')
            }
        } catch (err) {
            console.error('Logout error:', err)
            alert('An error occurred during logout')
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
                <header className="mb-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Admin Balance Management
                        </h1>
                        <p className="text-gray-400 mt-2">Oversee user accounts and manage financial transactions efficiently.</p>
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
                            href="/admin/withdrawal"
                            className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-6 py-2 rounded-xl border border-white/10 transition-all font-medium flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Withdrawals
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-6 py-2 rounded-xl border border-white/10 transition-all font-medium flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                    <table className="w-full border-collapse">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 text-left">User Details</th>
                                <th className="px-6 py-4 text-left">Current Stats</th>
                                <th className="px-6 py-4 text-left">Update Funds</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <div key={user.id} className="contents">
                                    <tr className={`hover:bg-white/[0.02] transition-colors ${expandedUser === user.id ? 'bg-white/[0.05]' : ''} flex flex-col md:table-row border-b border-white/5 md:border-none last:border-none`}>
                                        <td className="px-6 py-4 md:py-6 block md:table-cell" onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}>
                                            <div className="font-medium text-lg">{user.fullName || 'Unnamed User'}</div>
                                            <div className="text-gray-500 text-sm font-mono cursor-pointer hover:text-indigo-400 transition-colors">
                                                {user.mobile} • {user.role}
                                            </div>
                                            <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                                                {expandedUser === user.id ? 'Hide History' : 'Show History'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 md:py-6 block md:table-cell border-t border-white/5 md:border-none">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center gap-4">
                                                    <span className="text-xs text-gray-500 uppercase">Balance</span>
                                                    <span className="font-bold text-green-400">₹{user.balance.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4 border-t border-white/5 pt-1">
                                                    <span className="text-xs text-gray-500 uppercase">Recharge</span>
                                                    <span className="font-bold text-blue-400">₹{(user.recharge || 0).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center gap-4 border-t border-white/5 pt-1">
                                                    <span className="text-xs text-gray-500 uppercase">Income</span>
                                                    <span className="font-bold text-purple-400">₹{(user.income || 0).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 md:py-6 block md:table-cell border-t border-white/5 md:border-none">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="Add Balance"
                                                        value={amounts[user.id] || ''}
                                                        onChange={(e) => setAmounts(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Remark"
                                                        value={remarks[user.id] || ''}
                                                        onChange={(e) => setRemarks(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="Add Recharge"
                                                        value={recharges[user.id] || ''}
                                                        onChange={(e) => setRecharges(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 border-blue-500/20"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="Add Income"
                                                        value={incomes[user.id] || ''}
                                                        onChange={(e) => setIncomes(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 border-purple-500/20"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 md:py-6 block md:table-cell text-right border-t border-white/5 md:border-none">
                                            <button
                                                onClick={() => handleUpdateBalance(user.id)}
                                                disabled={updatingId === user.id}
                                                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20"
                                            >
                                                {updatingId === user.id ? 'Saving...' : 'Save'}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedUser === user.id && (
                                        <tr className="bg-black/40 border-t border-white/5 flex flex-col md:table-row">
                                            <td colSpan={4} className="px-6 md:px-10 py-6 block md:table-cell">
                                                <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Collective Fund History</h3>
                                                {user.fundHistory.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {user.fundHistory.map(history => (
                                                            <div key={history.id} className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/5">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${history.type === 'BALANCE' ? 'bg-green-500/20 text-green-400' :
                                                                            history.type === 'RECHARGE' ? 'bg-blue-500/20 text-blue-400' :
                                                                                'bg-purple-500/20 text-purple-400'
                                                                        }`}>
                                                                        {history.type}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-medium">{history.remark}</div>
                                                                        <div className="text-xs text-gray-500 lowercase">
                                                                            {new Date(history.createdAt).toLocaleString()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className={`font-bold ${history.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                                        {history.amount >= 0 ? '+' : ''}{history.amount.toLocaleString()}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-500">
                                                                        {history.prevValue.toLocaleString()} → {history.newValue.toLocaleString()}
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
