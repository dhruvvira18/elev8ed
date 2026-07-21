"use client"

import React, { useMemo, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

function SignupForm() {
  const searchParams = useSearchParams()
  const invitationToken = useMemo(() => searchParams.get('token'), [searchParams])

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      setIsLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          invitation_token: invitationToken ?? null,
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

    if (data.session) {
      window.location.href = '/workspace'
      return
    }

    setSuccessMessage(
      invitationToken
        ? 'Account created successfully. Please verify your email, then return through your invitation flow.'
        : 'Account created successfully. Please check your email to verify your account before signing in.'
    )

    setIsLoading(false)
  }

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setErrorMessage(null)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/workspace`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Set your credentials or use your institutional account to get started
        </p>
      </div>

      {invitationToken && (
        <div className="p-3 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-md">
          Invitation detected. Complete your account setup to continue onboarding.
        </div>
      )}

      {errorMessage && (
        <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-3 text-sm font-medium text-green-700 bg-green-500/10 border border-green-500/20 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Main Credentials Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? 'Creating Access...' : 'Create Account'}
        </button>
      </form>

      {/* Horizontal Visual Separator */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <span className="relative bg-background px-2 text-xs uppercase text-muted-foreground tracking-wider font-semibold">
          Or continue with
        </span>
      </div>

      {/* OAuth Integration Actions */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        Sign up with Google
      </button>

      {/* Bottom Navigation Link */}
      <div className="text-center lg:text-left">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground text-center py-8">Loading workspace onboarding...</div>}>
      <SignupForm />
    </Suspense>
  )
}