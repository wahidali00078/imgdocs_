/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createUserDataRecord } from '../lib/dbHelper';
import { X, Mail, Lock, UserPlus, LogIn, AlertCircle, Loader2, MailCheck, RotateCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onSimulateLogin?: (email: string) => void;
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login', onSimulateLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Email verification state
  const [verificationSent, setVerificationSent] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  if (!isOpen) return null;

  const handleResendVerification = async () => {
    if (!unverifiedUser) {
      setError('Please try logging in again to request a new verification email.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await sendEmailVerification(unverifiedUser);
      setError('A new verification email has been sent successfully. Please check your inbox.');
    } catch (err: any) {
      console.error(err);
      setError('Failed to send verification email: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedLogin = () => {
    const demoEmail = email || 'demo@imgdocs.com';
    if (onSimulateLogin) {
      onSimulateLogin(demoEmail);
    }
    onClose();
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential.user) {
        await createUserDataRecord(userCredential.user.uid, userCredential.user.email || '');
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      let message = err.message;
      if (err.code === 'auth/popup-closed-by-user') {
        message = 'Google Sign-In popup closed before completion.';
      } else if (err.code === 'auth/operation-not-allowed') {
        message = 'Google Sign-In is not enabled yet in your Firebase console. Go to Authentication > Sign-in method, and enable Google Sign-In!';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          // Save user registration profile in Firestore database
          await createUserDataRecord(userCredential.user.uid, email);
          
          // Try to send verification email but don't force or block them if it fails or if they don't verify it
          try {
            await sendEmailVerification(userCredential.user);
          } catch (verifErr) {
            console.warn('Could not send verification email:', verifErr);
          }
          
          onClose();
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      let message = err.message;
      if (err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please verify your credentials and try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'The email address is invalid.';
      } else if (err.code === 'auth/weak-password') {
        message = 'The password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Access to this account has been temporarily disabled due to many failed login attempts. Try again later.';
      } else if (err.code === 'auth/operation-not-allowed' || message?.includes('operation-not-allowed') || message?.includes('disabled')) {
        message = 'Email & Password Authentication is not enabled in your Firebase project yet. Please go to your Firebase Console > Authentication > Sign-in method, and enable "Email/Password". Or click the Guest Bypass link below to test instantly!';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" id="auth-modal-overlay">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="auth-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors hover:bg-slate-50 cursor-pointer"
          id="auth-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {verificationSent ? (
          <div className="text-center py-6 space-y-4 animate-fade-in" id="auth-verification-sent-screen">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <MailCheck className="h-7 w-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-2xl font-black text-slate-800">Verify your Email</h3>
              <p className="text-sm text-slate-500">
                A verification link has been sent to <span className="font-bold text-slate-700">{email}</span>.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-xs text-slate-500 text-left space-y-1">
              <p className="font-bold text-slate-700">What's next?</p>
              <p>1. Open your inbox and find the email from ImgDocs.</p>
              <p>2. Click the verification link to activate your account.</p>
              <p>3. Return here and log in to enjoy all tools.</p>
            </div>
            <button
              onClick={() => {
                setVerificationSent(false);
                setMode('login');
                setError(null);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary-hover transition-all cursor-pointer"
              id="verification-goto-login-btn"
            >
              Go to Log In
            </button>
          </div>
        ) : (
          <>
            {/* Header Tabs */}
            <div className="flex border-b border-slate-100 mb-6 mt-2" id="auth-tabs">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); setUnverifiedUser(null); }}
                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(null); setUnverifiedUser(null); }}
                className={`flex-1 pb-3 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold text-slate-800">
                {mode === 'login' ? 'Welcome back' : 'Create free account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'login' 
                  ? 'Access your private conversion history logs securely' 
                  : 'Save your file conversion logs completely free'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                    id="auth-email-input"
                  />
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                    id="auth-password-input"
                  />
                </div>
              </div>

              {/* Error display */}
              {error && (
                <div className="flex flex-col gap-2 rounded-xl bg-red-50 p-3.5 border border-red-100 text-red-800 text-xs font-medium animate-fade-in">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{error}</span>
                  </div>
                  {unverifiedUser && (
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 transition-colors cursor-pointer self-start border border-indigo-200 bg-white rounded-lg px-2.5 py-1 shadow-sm"
                    >
                      <RotateCw className="h-3 w-3 animate-spin" />
                      Resend Verification Link
                    </button>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-bold text-white shadow-lg shadow-red-500/15 hover:bg-primary-hover transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                id="auth-submit-btn"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : mode === 'login' ? (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Log In</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Google Sign In Divider & Button */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  or continue with
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                id="auth-google-btn"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google Account</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleSimulatedLogin}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer underline font-medium"
                  id="auth-guest-bypass-link"
                >
                  Bypass Auth and Sign In as Guest
                </button>
              </div>
            </form>
          </>
        )}

        {/* Disclaimer info */}
        <div className="mt-6 border-t border-slate-100 pt-4 text-center text-[10px] font-medium text-slate-400">
          We protect your privacy. Files themselves are never saved on servers — only the file log titles & counts are saved for tracking.
        </div>
      </div>
    </div>
  );
}
