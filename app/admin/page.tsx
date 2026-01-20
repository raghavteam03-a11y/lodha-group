'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminHomePage() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Verify admin access
        const verifyAccess = async () => {
            try {
                const res = await fetch('/api/admin/users')
                if (!res.ok) {
                    router.push('/admin/login')
                }
            } catch (error) {
                router.push('/admin/login')
            } finally {
                setLoading(false)
            }
        }
        verifyAccess()
    }, [router])

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
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Header */}
                <header className="mb-16 flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                            Admin Panel
                        </h1>
                        <p className="text-gray-400 text-lg">Manage your platform efficiently</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-6 py-3 rounded-xl border border-white/10 transition-all font-medium flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </header>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Balance Management Card */}
                    <Link href="/admin/balance">
                        <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-indigo-500/50 rounded-2xl p-8 transition-all duration-300 cursor-pointer backdrop-blur-md hover:shadow-2xl hover:shadow-indigo-500/10 transform hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all">
                                    <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <svg className="w-6 h-6 text-gray-600 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">
                                Balance Management
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Manage user balances, recharges, and income. View fund history and make adjustments.
                            </p>
                        </div>
                    </Link>

                    {/* Withdrawal Management Card */}
                    <Link href="/admin/withdrawal">
                        <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300 cursor-pointer backdrop-blur-md hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                                Withdrawal Management
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Review and process withdrawal requests. Approve or decline pending transactions.
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Access</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/balance" className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium transition-all border border-indigo-500/20">
                            User Balances
                        </Link>
                        <Link href="/admin/withdrawal" className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium transition-all border border-purple-500/20">
                            Pending Withdrawals
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
