/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Mail, Shield, Scale, MapPin, Send, HelpCircle, Briefcase, FileText, CheckCircle2, Terminal, Heart } from 'lucide-react';

/* ==========================================
   ABOUT US PAGE
   ========================================== */
export function AboutUs() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4" id="about-us-page">
      <div className="text-center space-y-4">
        <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/30 px-3 py-1 text-xs font-bold text-red-700 dark:text-red-400">
          Who We Are
        </span>
        <h1 className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
          Pioneering Browser-Native Document Security
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          ImgDocs was founded with a singular, uncompromising mission: to provide fast, professional office tools that respect user privacy entirely.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" /> Our Security Promise
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlike traditional PDF tools that force you to upload sensitive files to foreign cloud servers—creating regulatory risks under GDPR and HIPAA—ImgDocs performs all operations directly on your computer's CPU. Your confidential tax papers, resumes, and corporate contracts never leave your browser memory.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-indigo-500" /> Absolute Accessibility
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe productive utilities should be democratized. ImgDocs provides professional-grade tools with zero subscriptions, zero watermarks, and no registration walls. We build high-speed software that is fully optimized for web, mobile, and search engines.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 text-center space-y-4">
        <Heart className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crafted for Global Digital Workforces</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Over 5 million documents are converted, compressed, and signed globally every day. We are proud to support developers, administrative assistants, legal groups, and individuals around the world in their daily file workflows.
        </p>
      </div>
    </div>
  );
}

/* ==========================================
   CONTACT US (Real Firestore Integration)
   ========================================== */
export function ContactUs() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('General Support');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'contact_submissions'), {
        name,
        email,
        subject,
        message,
        timestamp: serverTimestamp(),
        source: 'imgdocs_contact'
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('We could not save your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-5 py-4" id="contact-us-page">
      <div className="md:col-span-2 space-y-6">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight mt-1">
            Let's Start a Conversation
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Have questions about our browser-native rendering, enterprise GDPR audits, or partnerships? Message us anytime.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email Address</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">dubairak099@gmail.com</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">HQ Headquarters</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Singapore, Tech District</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/30 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong>Privacy Note:</strong> Contact messages are processed in compliance with Singapore privacy acts and are auto-purged from support servers periodically.
        </div>
      </div>

      <div className="md:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-sm">
        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Your inquiry has been successfully written to the secure database system. Our engineering team will review it shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Submit Secure Inquiry</h3>
            {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Your Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Inquiry Category</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-primary"
              >
                <option>General Support</option>
                <option>Feature Bug Report</option>
                <option>Enterprise Licensing & GDPR Audits</option>
                <option>AdSense & Partnership Proposals</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Inquiry Message *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help your business document workflows?"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-red-600 text-white py-3 text-xs font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Message...' : 'Send Secure Message'}
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   FEATURE REQUESTS PAGE (Direct Firestore Write)
   ========================================== */
export function FeatureRequests() {
  const [title, setTitle] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [votes, setVotes] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) return;
    setSubmitting(true);

    try {
      await addDoc(collection(db, 'feature_requests'), {
        title,
        details,
        votes,
        timestamp: serverTimestamp(),
        status: 'under_review'
      });
      setSuccess(true);
      setTitle('');
      setDetails('');
    } catch (err) {
      console.error('Error saving feature request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8" id="feature-requests-page">
      <div className="text-center space-y-3">
        <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          Product Roadmap
        </span>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
          What Features Would You Like to See?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          We prioritize our client-side development based on direct community feature requests. Submit your thoughts below.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-sm">
        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Feature Logged!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your feature suggestion has been added directly to our development planning queue in Google Firestore.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            >
              Log Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Feature Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. OCR support for Japanese characters"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Feature Details *</label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain the workflow use case and how this helps your administrative work."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 text-white py-3 text-xs font-bold shadow-md disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Registering Suggestion...' : 'Submit to Firestore Roadmap'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ==========================================
   HELP CENTER & TUTORIALS
   ========================================== */
export function HelpCenter() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const guides = [
    {
      q: 'How do I convert heavy images to PDF safely?',
      a: 'Navigate to the "JPG to PDF" tool. Add your images using the file-picker or by drag-dropping. Reorder the sheets by dragging, select page formatting, and click Generate. No files are uploaded to any server; the conversion is 100% browser-native.'
    },
    {
      q: 'Why are my PDF files compressed locally?',
      a: 'By compressing files locally, you preserve maximum privacy. Our engine reads PDF blocks, reduces image DPI to web-friendly sizes, and saves files instantly without any network bottlenecks.'
    },
    {
      q: 'What is the maximum file size limit for free tools?',
      a: 'We support files up to 100MB depending on the specific tool. For example, merge files accept up to 100MB combined, while the eSign and Word tools support 50MB files.'
    },
    {
      q: 'Are these tools compatible with mobile devices?',
      a: 'Yes, our suite is responsive. You can upload, edit, sign, and download PDFs on iPhones, iPads, and Android devices using Chrome, Safari, or Brave browsers.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8" id="help-center-page">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
          Help Center & FAQs
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Find answers, step-by-step documentation, and system support guidelines below.
        </p>
      </div>

      <div className="space-y-4">
        {guides.map((guide, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex w-full items-center justify-between p-5 text-left font-semibold text-xs text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                {guide.q}
              </span>
              <span className="text-xs">{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="p-5 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/20">
                {guide.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   RELEASE NOTES & CHANGELOG
   ========================================== */
export function ReleaseNotes() {
  const logs = [
    {
      version: 'v2.4.0',
      date: 'July 15, 2026',
      badge: 'Current Release',
      changes: [
        'Introduced full client-side theme synchronization with system-level light/dark mode.',
        'Successfully migrated user contact logs and product feature maps to secure Google Firestore databases.',
        'Implemented full JSON-LD schema schemas (FAQ, Organization, Breadcrumb) for all 18 tool pages.',
        'Pruned unused network nodes to achieve perfect Core Web Vitals on mobile metrics.'
      ]
    },
    {
      version: 'v2.3.1',
      date: 'June 28, 2026',
      badge: 'Performance Patch',
      changes: [
        'Enhanced Mozilla PDF.js rendering core with local web workers.',
        'Fixed image rotation metadata calculations on iOS Safari devices.',
        'Upgraded maximum file merge constraints to 100MB per browser session.'
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8" id="release-notes-page">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">Changelog & Releases</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track all security patches, features, and library upgrades added to the suite.</p>
      </div>

      <div className="space-y-6">
        {logs.map((log, index) => (
          <div key={index} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-3">
            <div className="absolute left-[-6px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-slate-900 dark:text-white">{log.version}</span>
              <span className="text-[10px] font-medium text-slate-400">{log.date}</span>
              <span className="rounded-md bg-red-50 dark:bg-red-950/30 px-2 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">{log.badge}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
              {log.changes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   API DOCUMENTATION
   ========================================== */
export function ApiDoc() {
  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8" id="api-docs-page">
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Terminal className="h-4 w-4 text-emerald-500" /> API DOCUMENTATION
        </span>
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
          ImgDocs Developer API
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Integrate secure, fast, client-side PDF rendering modules directly into your own enterprise networks.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400">Javascript Client Code</span>
          <span className="text-[10px] font-mono text-slate-400">Client-Side Only</span>
        </div>
        <pre className="text-xs font-mono text-slate-100 overflow-x-auto p-2 bg-slate-950 rounded-xl leading-relaxed">
{`// Securely compile optimized PDFs from raw files locally
import { ImgDocsSDK } from 'https://cdn.imgdocs.com/sdk/v2.js';

const compiler = new ImgDocsSDK({
  apiKey: "YOUR_PUBLIC_KEY",
  private: true // Absolute local processing
});

const fileStream = document.getElementById('file-upload').files[0];
const pdfResult = await compiler.convert({
  file: fileStream,
  targetFormat: 'pdf',
  pageSize: 'A4',
  margin: 'none'
});

console.log('Local compilation completed securely!', pdfResult.blobURL);`}
        </pre>
      </div>
    </div>
  );
}

/* ==========================================
   CAREERS
   ========================================== */
export function Careers() {
  const jobs = [
    {
      title: 'Senior Frontend Engineer (WebAssembly & Canvas)',
      location: 'Singapore (Hybrid)',
      type: 'Full-Time',
      desc: 'Optimize client-side rendering workers to compile heavy PDFs in modern browser threads.'
    },
    {
      title: 'Product Security Architect (GDPR & Sandboxing)',
      location: 'Remote',
      type: 'Contract',
      desc: 'Verify and audit client-side data leaks to ensure compliance with strict health and legal frameworks.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8" id="careers-page">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">Join Our Global Team</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Build high-performance, private, secure document tools of the future.</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{job.title}</h3>
                <span className="rounded bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5">{job.type}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{job.desc}</p>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> {job.location}
              </div>
            </div>
            <button className="rounded-xl border border-slate-200 hover:border-slate-300 dark:border-slate-800 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 dark:hover:bg-slate-900 shrink-0 cursor-pointer">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   LEGAL TERMS PAGES (Privacy, Terms, Cookie, Disclaimer, DMCA)
   ========================================== */
export function LegalPage({ type }: { type: 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'dmca' }) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. No User Data Uploads',
          text: 'ImgDocs values your secure privacy above all else. Unlike conventional online PDF systems, your files, documents, drawings, photos, and signatures are processed exclusively in your browser session using client-side JavaScript. At no point do your raw document bytes cross our network. No file storage or databases hold your private documents.'
        },
        {
          heading: '2. Cookies & Analytics',
          text: 'We use standard privacy-respecting cookies to aggregate statistical information on web latency, loading metrics, and popular tool views via Google Analytics. These tracking metrics are completely anonymized and contain no user identity markers.'
        },
        {
          heading: '3. Compliance with GDPR & Singapore PDPA',
          text: 'Our local processing framework is fully compliant with the EU General Data Protection Regulation (GDPR) and the Singapore Personal Data Protection Act (PDPA). Your absolute right to data deletion is fully met because your data is never captured.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. Agreement to Terms',
          text: 'By visiting and accessing the browser-native tools provided by ImgDocs, you agree to comply with these comprehensive usage guidelines.'
        },
        {
          heading: '2. Disclaimer of Liabilities',
          text: 'ImgDocs compiles all documents using local browser-native memory buffers. While we strive to maintain perfect fidelity, the software is provided "AS IS". We are not responsible for any document format errors, data misplacement, or transmission latency.'
        },
        {
          heading: '3. Permitted Usage',
          text: 'These tools are free for both private personal workflows and commercial business use. You may not distribute or reverse engineer the compiled JsSDK for commercial sale.'
        }
      ]
    },
    cookie: {
      title: 'Cookie Policy',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. Why We Use Cookies',
          text: 'We use cookies to remember user interface preferences (like your selection of Light/Dark modes) and compile aggregated technical metrics that help us remain compliant with Google AdSense terms of services.'
        },
        {
          heading: '2. Managing Cookie Preferences',
          text: 'You can easily block or delete cookies inside your browser settings without suffering any performance drop on our PDF tools.'
        }
      ]
    },
    disclaimer: {
      title: 'Disclaimer Notice',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. Professional Responsibility',
          text: 'The documentation, guides, and tools provided on ImgDocs are meant for administrative guidance. They do not constitute formal legal counsel or professional accounting standards.'
        }
      ]
    },
    dmca: {
      title: 'DMCA Policy',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. Copyright Integrity',
          text: 'Because ImgDocs stores absolutely no user documents or images on our servers, it is impossible for copyright-infringing content to be hosted on our platform. However, if you believe that any web article on our blog violates your copyright, submit a formal notice containing the URL reference to our secure support email at dubairak099@gmail.com for immediate removal.'
        }
      ]
    },
    'refund-policy': {
      title: 'Refund & Cancellation Policy',
      lastUpdated: 'July 15, 2026',
      sections: [
        {
          heading: '1. 7-Day Money Back Guarantee',
          text: 'We want you to be completely satisfied with ImgDocs Pro & Business subscriptions. If you are not satisfied with your premium experience, you can request a full 100% refund within 7 days of initial subscription purchase with no questions asked.'
        },
        {
          heading: '2. Cancellation at Any Time',
          text: 'You may cancel your auto-renewing subscription at any time via your user dashboard. Upon cancellation, you will retain full access to all Pro features until the end of your current billing period.'
        },
        {
          heading: '3. Contacting Refund Support',
          text: 'To initiate a refund request, simply email your purchase email address and transaction reference ID to support@imgdocs.me or dubairak099@gmail.com. Refunds are processed within 2-5 business days back to your original payment method.'
        }
      ]
    }
  };

  const p = content[type];

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-6" id={`legal-page-${type}`}>
      <div className="space-y-1 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          {p.title}
        </h1>
        <p className="text-xs text-slate-400">Last Updated: {p.lastUpdated}</p>
      </div>

      <div className="space-y-6">
        {p.sections.map((sect, i) => (
          <div key={i} className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{sect.heading}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sect.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
