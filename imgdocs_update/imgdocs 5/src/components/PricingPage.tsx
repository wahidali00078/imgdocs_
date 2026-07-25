/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, X, Crown, Star, Zap, HelpCircle, ShieldCheck, 
  CheckCircle, ArrowRight, Building, Users, Lock, ChevronRight, MessageSquare,
  AlertTriangle, Loader2
} from 'lucide-react';

interface PricingPageProps {
  user: any;
  isPremium: boolean;
  activePlan: string;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onSelectPlan: (planId: 'free' | 'pro_monthly' | 'pro_yearly' | 'business_monthly' | 'business_yearly') => void;
  onNavigateHome: () => void;
}

export default function PricingPage({
  user,
  isPremium,
  activePlan,
  onOpenAuth,
  onSelectPlan,
  onNavigateHome
}: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [contactSalesOpen, setContactSalesOpen] = useState(false);
  const [salesInquirySent, setSalesInquirySent] = useState(false);
  const [salesFormData, setSalesFormData] = useState({
    name: '',
    email: user?.email || '',
    company: '',
    teamSize: '5-10',
    message: ''
  });

  const loading = false;
  const error = null;

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSalesInquirySent(true);
    setTimeout(() => {
      setSalesInquirySent(false);
      setContactSalesOpen(false);
      setSalesFormData({
        name: '',
        email: user?.email || '',
        company: '',
        teamSize: '5-10',
        message: ''
      });
    }, 3000);
  };

  const handleCtaClick = (planId: string) => {
    if (planId === 'free') {
      if (!user) {
        onOpenAuth('signup');
      } else {
        onNavigateHome();
      }
    } else if (planId === 'pro') {
      onSelectPlan(isYearly ? 'pro_yearly' : 'pro_monthly');
    } else if (planId === 'business') {
      onSelectPlan(isYearly ? 'business_yearly' : 'business_monthly');
    }
  };

  // Pricing configuration
  const prices = {
    free: { monthly: '₹0', yearly: '₹0', label: 'forever' },
    pro: { 
      monthly: '₹299', 
      yearly: '₹2,499', // Pro yearly total is ₹2,999 (about 249/mo)
      totalYearlyLabel: '₹2,999/year (Save 17%)',
      periodMonthly: '/month',
      periodYearly: '/year'
    },
    business: { 
      monthly: '₹799', 
      yearly: '₹6,650', // Business yearly total ~₹7,990 (about 665/mo)
      totalYearlyLabel: '₹7,990/year (Save 17%)',
      periodMonthly: '/month',
      periodYearly: '/year'
    }
  };

  const comparisonFeatures = [
    {
      name: 'Unlimited Conversions',
      free: '15 per day',
      pro: '✓ Unlimited',
      business: '✓ Unlimited',
      highlight: true
    },
    {
      name: 'OCR Document Parsing',
      free: 'Basic OCR',
      pro: '✓ Unlimited OCR',
      business: '✓ Unlimited OCR',
      highlight: false
    },
    {
      name: 'High-Speed Local Processing',
      free: 'Standard Speed',
      pro: '✓ Maximum GPU Speed',
      business: '✓ Maximum Speed',
      highlight: true
    },
    {
      name: 'Advanced Output Resolution',
      free: 'Standard',
      pro: '✓ Ultra High-Fidelity',
      business: '✓ Ultra High-Fidelity',
      highlight: false
    },
    {
      name: 'Secure Document Workspaces',
      free: '1 workspace',
      pro: '✓ Unlimited',
      business: '✓ Unlimited + Team Workspace',
      highlight: true
    },
    {
      name: 'Batch Processing',
      free: '—',
      pro: '✓ Unlimited',
      business: '✓ Unlimited',
      highlight: false
    },
    {
      name: 'eSign Digital Signatures',
      free: '—',
      pro: '✓ Included',
      business: '✓ Included',
      highlight: false
    },
    {
      name: 'Watermark Removal',
      free: '— (Watermarked)',
      pro: '✓ Clean Exports',
      business: '✓ Clean Exports',
      highlight: false
    },
    {
      name: 'Priority Processing',
      free: 'Standard Speed',
      pro: '✓ 10x Faster Lane',
      business: '✓ Dedicated Lane',
      highlight: true
    },
    {
      name: 'Cloud Storage integration',
      free: '—',
      pro: '—',
      business: '✓ Shared Drives Sync',
      highlight: false
    },
    {
      name: 'API Developer Keys',
      free: '—',
      pro: '—',
      business: '✓ Complete SDK Access',
      highlight: false
    },
    {
      name: 'Team Members Seats',
      free: '1 member',
      pro: '1 member',
      business: '✓ Unlimited Seats',
      highlight: true
    },
    {
      name: 'Support Services',
      free: 'Community Forums',
      pro: '✓ 24/7 Premium Email',
      business: '✓ Dedicated Account Manager',
      highlight: false
    }
  ];

  return (
    <div className="space-y-16 py-12 px-4 max-w-7xl mx-auto animate-fade-in" id="saas-pricing-suite">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3.5 py-1 text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest border border-blue-100 dark:border-blue-900/40">
          <Crown className="h-3.5 w-3.5 text-primary" />
          <span>Local Compiled PDF Productivity Suite</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-none">
          Simple, Transparent Plans
        </h1>
        
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Scale your local browser-native compiler without worrying about hidden costs. Cancel or downgrade at any time.
        </p>


      </div>

      {/* Monthly / Yearly Toggle */}
      <div className="flex items-center justify-center gap-4 pt-8">
          <span className={`text-xs md:text-sm font-bold transition-colors ${!isYearly ? 'text-slate-900 dark:text-white font-black' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-6.5 w-12 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
            id="saas-pricing-duration-toggle"
            aria-label="Toggle billing duration"
          >
            <div className={`absolute top-1 left-1 h-4.5 w-4.5 rounded-full bg-primary shadow-sm transition-transform ${isYearly ? 'translate-x-5.5' : ''}`} />
          </button>
          <span className={`text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors ${isYearly ? 'text-slate-900 dark:text-white font-black' : 'text-slate-400'}`}>
            <span>Yearly Billing</span>
            <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-pulse">
              Save 17%
            </span>
          </span>
        </div>

      {/* 2. Three Premium Pricing Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
        
        {/* FREE TIER CARD */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative" id="pricing-card-free">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Standard Option</span>
              <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">Free Plan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Perfect for casual local PDF compilations and basic editing.</p>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-900">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">₹0</span>
                <span className="text-xs font-bold text-slate-400">/ forever</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">No credit card required</span>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Included Features</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>15 PDF conversions per day</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Maximum file size 20 MB</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Basic PDF tools (Split, Rotate)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Basic OCR document translation</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Secure client-side sandbox</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Up to 5 document conversions/day</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Community help support</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-400 dark:text-slate-500 italic">
                  <Check className="h-4 w-4 text-slate-400 shrink-0 mt-0.5 stroke-[2]" />
                  <span>Ads supported console</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleCtaClick('free')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* PRO TIER CARD (MOST POPULAR) */}
        <div className="rounded-2xl border-2 border-primary bg-slate-50/20 dark:bg-slate-900/10 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative ring-4 ring-primary/5" id="pricing-card-pro">
          
          {/* Blue Most Popular Badge */}
          <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Crown className="h-3 w-3 fill-white text-white" />
            <span>Most Popular</span>
          </div>

          <div className="space-y-6 pt-2">
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Premium Performance</span>
              <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">Pro Plan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">The ultimate toolbelt for designers, lawyers, and writers.</p>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-900">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                  {isYearly ? '₹2,999' : '₹299'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {isYearly ? prices.pro.periodYearly : prices.pro.periodMonthly}
                </span>
              </div>
              <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                {isYearly ? 'Equivalent to ~₹249/month' : 'Cancel subscription anytime'}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Included Features</p>
              <ul className="grid grid-cols-1 gap-2.5">
                <li className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-semibold">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Unlimited PDF conversions</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Unlimited local OCR parsing</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-semibold">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>High-speed local multithreading</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Advanced custom output profiles</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Unlimited secure workspaces</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Unlimited file sizes</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Batch processing (Multi-files)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>No advertisements (Clean UI)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Faster local processing speeds</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Cryptographic eSign tools</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Watermark automatic removal</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Premium 24/7 Email Support</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Priority task queueing</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => handleCtaClick('pro')}
              className="w-full py-3 px-4 rounded-xl text-xs font-black text-white bg-primary hover:bg-primary-hover shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Crown className="h-4 w-4 fill-white text-white" />
              <span>Upgrade to Pro</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* BUSINESS TIER CARD */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative" id="pricing-card-business">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Enterprise Collaborative</span>
              <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">Business Plan</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Multi-user workspace, shared templates, and developer APIs.</p>
            </div>

            <div className="py-2 border-b border-slate-100 dark:border-slate-900">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                  {isYearly ? '₹7,990' : '₹799'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {isYearly ? prices.business.periodYearly : prices.business.periodMonthly}
                </span>
              </div>
              <span className="text-[10px] text-indigo-500 font-bold block mt-1">
                {isYearly ? 'Equivalent to ~₹665/month' : 'For business environments'}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Everything in Pro, plus:</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Unlimited Team Members</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-semibold text-indigo-500">Shared Activity & Security Logs</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Team Shared Workspace</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Shared document templates</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Central administrative dashboard</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Complete Document APIs Access</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span>Immediate invoice PDF retrieval</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5 stroke-[3]" />
                  <span className="font-medium text-slate-850 dark:text-slate-200">24/7 Priority VIP support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2.5">
            <button
              onClick={() => handleCtaClick('business')}
              className="w-full py-3 px-4 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
            >
              <Zap className="h-4 w-4 fill-white text-white" />
              <span>Upgrade to Business</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setContactSalesOpen(true)}
              className="w-full py-2 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Or Contact Sales for Teams</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Fully Styled Comparison Table */}
      <div className="pt-16 border-t border-slate-200 dark:border-slate-800 max-w-5xl mx-auto space-y-6" id="comparison-matrix">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
            Feature-by-Feature Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-1">Choose the perfect plan fit for your local document workflow requirements.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                <th className="p-4">Feature Matrix</th>
                <th className="p-4 text-center">Free</th>
                <th className="p-4 text-center text-primary">Pro</th>
                <th className="p-4 text-center">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900 text-xs">
              {comparisonFeatures.map((feat, index) => (
                <tr 
                  key={index} 
                  className={`transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20 ${
                    feat.highlight ? 'bg-blue-50/10 dark:bg-blue-950/5' : ''
                  }`}
                >
                  <td className="p-4 font-bold text-slate-850 dark:text-slate-300">{feat.name}</td>
                  <td className="p-4 text-center text-slate-500 dark:text-slate-400 font-medium">{feat.free}</td>
                  <td className="p-4 text-center text-primary dark:text-blue-400 font-bold">{feat.pro}</td>
                  <td className="p-4 text-center text-slate-800 dark:text-slate-200 font-semibold">{feat.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Contact Sales Modal dialog */}
      {contactSalesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            
            <button 
              onClick={() => setContactSalesOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
              <Building className="h-5 w-5" />
              <h3 className="text-base font-black font-display">Contact Enterprise Sales</h3>
            </div>

            <p className="text-xs text-slate-400">
              Enter your corporate workspace details. Our success engineers will respond within 4 hours to provision your dedicated group folder logs.
            </p>

            {salesInquirySent ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900 text-center space-y-2 animate-fade-in">
                <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Sales Inquiry Sent!</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Thank you for contacting ImgDocs. We have generated ticket #M-{Math.floor(Math.random() * 9000 + 1000)} and emailed a verification link to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSalesSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={salesFormData.name}
                    onChange={(e) => setSalesFormData({ ...salesFormData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={salesFormData.email}
                    onChange={(e) => setSalesFormData({ ...salesFormData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Name</label>
                  <input
                    type="text"
                    required
                    value={salesFormData.company}
                    onChange={(e) => setSalesFormData({ ...salesFormData, company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Team Workspace Seats</label>
                  <select
                    value={salesFormData.teamSize}
                    onChange={(e) => setSalesFormData({ ...salesFormData, teamSize: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none text-slate-800 dark:text-white"
                  >
                    <option value="5-10">5 - 10 members</option>
                    <option value="11-50">11 - 50 members</option>
                    <option value="51-200">51 - 200 members</option>
                    <option value="200+">More than 200 members</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Workspace Requirements</label>
                  <textarea
                    rows={2}
                    value={salesFormData.message}
                    onChange={(e) => setSalesFormData({ ...salesFormData, message: e.target.value })}
                    placeholder="e.g. Need SSO integration, custom retention logs..."
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Workspace Inquiry</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] text-slate-400 text-center">
              Adheres to enterprise privacy protocols. No cookies or tracker pixels.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
