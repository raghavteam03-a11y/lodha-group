'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Phone, Lock } from 'lucide-react'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1A1A1A]">
                <Image
                    src="/images/auth-bg.png"
                    alt="Luxury Real Estate"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                
                <div className="absolute bottom-20 left-12 z-10 text-white max-w-lg">
                    <h2 className="text-4xl font-serif font-bold mb-4">Experience Premium Living</h2>
                    <p className="text-lg text-white/80">Join the exclusive community of Lodha Group investors and homeowners.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative">
                 {/* Mobile Background Helper (Optional, if we want image on mobile too, but solid bg is cleaner for form) */}
                <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative z-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-serif font-bold text-[#B8860B]">LODHA GROUP</h1>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-600">Enter your details to access your portfolio</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                <span className="block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B8860B] transition-colors">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] outline-none transition-all placeholder-gray-400"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B8860B] transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] outline-none transition-all placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#B8860B] hover:bg-[#8B6508] transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B8860B] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-bold text-[#B8860B] hover:text-[#8B6508] transition-colors hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
                
                {/* Mobile Background Image (Visible only on small screens behind the card) */}
                <div className="absolute inset-0 lg:hidden">
                    <Image
                        src="/images/auth-bg.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-5"
                    />
                </div>
            </div>
        </div>
    )
}
