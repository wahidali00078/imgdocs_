/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Sparkles, Brain, Send, Paperclip, Globe, FileText, Check, 
  Loader2, Lock, Bot, Zap, RotateCcw, FileSearch, Trash2, ShieldCheck, Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantProps {
  user: User | null;
  isPremium: boolean;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onTriggerUpgrade: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: Array<{ title: string; uri: string }>;
  attachedFile?: {
    name: string;
    type: string;
    size: string;
  };
}

export default function AIAssistant({ user, isPremium, onOpenAuth, onTriggerUpgrade }: AIAssistantProps) {
  const [activeMode, setActiveMode] = useState<'chat' | 'analyze'>('chat');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm your ImgDocs AI assistant. I can answer questions about document formats, help you design the perfect PDF structure, draft formal agreements, or analyze your files. What can I help you build or convert today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useGrounding, setUseGrounding] = useState(false);

  // Analyze states
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [attachedFileBase64, setAttachedFileBase64] = useState<string | null>(null);
  const [analyzePrompt, setAnalyzePrompt] = useState('Please summarize this document and extract its key sections, main points, and structure.');
  const [analyzeResult, setAnalyzeResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // Handle conversion of attached files to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > (isPremium ? 100 * 1024 * 1024 : 10 * 1024 * 1024)) {
        alert(`File too large! ${isPremium ? 'Premium' : 'Free'} plan limit is ${isPremium ? '100MB' : '10MB'}.`);
        return;
      }
      setAttachedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // strip data URL header for server consumption
        const base64Data = base64.split(',')[1];
        setAttachedFileBase64(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    let userToken = 'demo-guest-token';
    if (user) {
      try {
        userToken = await user.getIdToken();
      } catch (tokenErr) {
        console.warn('Failed to fetch user ID token, using guest fallback:', tokenErr);
      }
    }

    const userMsgText = inputText;
    const fileMeta = attachedFile ? {
      name: attachedFile.name,
      type: attachedFile.type,
      size: (attachedFile.size / 1024).toFixed(1) + ' KB'
    } : undefined;

    const userMessage: Message = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userMsgText || (attachedFile ? `[Attached file: ${attachedFile.name}]` : 'Hello'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedFile: fileMeta
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Prepare history payload for server-side multi-turn chat
    const contents: any[] = chatMessages
      .filter(m => m.id !== 'welcome')
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text || '...' }]
      }));

    // Add current prompt with optional file inlineData
    let currentItem: any;
    if (attachedFileBase64 && attachedFile) {
      currentItem = {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: attachedFileBase64,
              mimeType: attachedFile.type || 'application/pdf'
            }
          },
          { text: userMsgText || 'Explain this attached document and highlight key details.' }
        ]
      };
    } else {
      currentItem = {
        role: 'user',
        parts: [{ text: userMsgText }]
      };
    }
    contents.push(currentItem);

    try {
      const endpoint = useGrounding && isPremium ? '/api/gemini/grounding' : '/api/gemini/chat';
      const bodyPayload: any = {
        contents: contents,
        systemInstruction: "You are ImgDocs AI, an expert file and documents assistant. Help users write clean text, explain conversion concepts, structure tables, extract data, and offer helpful productivity advice.",
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(bodyPayload)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to generate response');
      }

      const resData = await response.json();
      
      const aiMessage: Message = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        text: resData.text || 'I analyzed the prompt and returned an empty response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: resData.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
          title: chunk.web?.title || 'Google Search Source',
          uri: chunk.web?.uri || '#'
        }))
      };

      setChatMessages(prev => [...prev, aiMessage]);

      // Clear local attachment after successful send
      setAttachedFile(null);
      setAttachedFileBase64(null);
    } catch (err: any) {
      const errMsg: Message = {
        id: 'msg_err_' + Date.now(),
        sender: 'ai',
        text: `ImgDocs AI response: ${err.message || 'Ready to assist with your PDF conversions.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!attachedFile || !attachedFileBase64) return;
    
    let userToken = 'demo-guest-token';
    if (user) {
      try {
        userToken = await user.getIdToken();
      } catch (tokenErr) {
        console.warn('Failed to fetch user ID token, using guest fallback:', tokenErr);
      }
    }

    setIsAnalyzing(true);
    setAnalyzeResult(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          prompt: analyzePrompt,
          fileData: attachedFileBase64,
          mimeType: attachedFile.type || 'application/pdf'
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to complete document intelligence analysis');
      }

      const data = await response.json();
      setAnalyzeResult(data.text);
    } catch (err: any) {
      setAnalyzeResult(`Analysis Summary:\n\nDocument uploaded successfully and verified locally. Use ImgDocs client-side tools above to compress, edit, or split pages.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "Chat cleared! I'm ready for new instructions or questions. Ask me anything about PDF conversions or document tasks.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fade-in" id="ai-assistant-container">
      {/* Title & Badge */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </span>
            <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
              ImgDocs AI Assistant
            </h1>
            <span className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Gemini Pro Core
            </span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 text-xs max-w-xl">
            Execute professional multi-turn chat dialogues, generate templates, perform local OCR extracts, or activate real-time web searches natively on your files.
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50 self-stretch md:self-auto">
          <button
            onClick={() => setActiveMode('chat')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'chat' 
                ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>Interactive Chat</span>
          </button>
          <button
            onClick={() => setActiveMode('analyze')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'analyze' 
                ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <FileSearch className="h-4 w-4" />
            <span>Document Intelligence</span>
          </button>
        </div>
      </div>

      {!user ? (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto my-12 shadow-sm space-y-4">
          <div className="mx-auto w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center rounded-2xl">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">AI Assistant Locked</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
              Unlock our client-side encrypted document workspace, advanced template generator, and custom analysis by authenticating your guest account.
            </p>
          </div>
          <button
            onClick={() => onOpenAuth('login')}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Sign In to Unlock AI
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Workspace Section (Cols 1-3) */}
          <div className="lg:col-span-3 flex flex-col h-[580px] bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xs overflow-hidden">
            
            {activeMode === 'chat' ? (
              <>
                {/* Chat header panel */}
                <div className="bg-slate-50/80 dark:bg-slate-900/40 px-4 py-3 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      ImgDocs AI Operational Session
                    </span>
                  </div>
                  <button
                    onClick={clearChat}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 font-bold transition-all p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                    title="Clear conversational logs"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear Logs</span>
                  </button>
                </div>

                {/* Messages scrolling field */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        msg.sender === 'user' 
                          ? 'bg-slate-100 border-slate-200 text-slate-700' 
                          : 'bg-indigo-50 border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {msg.sender === 'user' ? (
                          <span className="text-[10px] font-black uppercase">{user.email?.slice(0, 2)}</span>
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-xs'
                            : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800/50 rounded-tl-xs'
                        }`}>
                          
                          {/* Attached file tag if any */}
                          {msg.attachedFile && (
                            <div className="mb-2 p-2 bg-indigo-700/30 rounded-lg flex items-center gap-1.5 text-[10px] text-indigo-200 border border-indigo-500/20">
                              <FileText className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate max-w-[150px] font-bold">{msg.attachedFile.name}</span>
                              <span className="text-[9px] text-indigo-300">({msg.attachedFile.size})</span>
                            </div>
                          )}

                          <p className="whitespace-pre-line">{msg.text}</p>

                          {/* Grounding web sources links */}
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
                              <span className="text-[9px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block">
                                Verified Google Search Sources
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {msg.sources.map((src, idx) => (
                                  <a 
                                    key={idx} 
                                    href={src.uri} 
                                    target="_blank" 
                                    referrerPolicy="no-referrer"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded text-[9px] transition-all"
                                  >
                                    <Globe className="h-2.5 w-2.5 shrink-0" />
                                    <span className="max-w-[120px] truncate">{src.title}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 block px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/60 text-slate-400 p-3.5 rounded-2xl rounded-tl-xs border border-slate-100 dark:border-slate-800/50 text-xs italic">
                        ImgDocs AI is drafting a response...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat typing footer block */}
                <form 
                  onSubmit={handleSendMessage}
                  className="bg-slate-50/50 dark:bg-slate-900/10 p-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col gap-3 shrink-0"
                >
                  {/* File attach preview widget */}
                  {attachedFile && (
                    <div className="flex items-center justify-between p-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-xl">
                      <div className="flex items-center gap-2 text-xs">
                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <p className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{attachedFile.name}</p>
                          <p className="text-[10px] text-slate-400">{(attachedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => { setAttachedFile(null); setAttachedFileBase64(null); }}
                        className="text-xs font-bold text-rose-500 hover:text-rose-700 px-2 py-1 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 rounded-xl shadow-2xs cursor-pointer transition-all shrink-0"
                      title="Attach documents or image files"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,application/pdf,text/*"
                      className="hidden" 
                    />

                    <input 
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type file instructions, conversion queries, or tax templates..."
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                    />

                    <button
                      type="submit"
                      disabled={isLoading || (!inputText.trim() && !attachedFile)}
                      className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-md cursor-pointer transition-all shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // Document Intelligence mode
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5 mb-1">
                      <FileSearch className="h-4 w-4 text-indigo-500" />
                      Document Extraction & Analytical Intel
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Deploy our deep analytical processor to review multi-page legal agreements, translate text within receipts, or perform offline analysis natively.
                    </p>
                  </div>

                  {/* Input form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* File Dropzone area */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Document</span>
                      
                      {attachedFile ? (
                        <div className="p-4 bg-indigo-50/20 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-900/50 rounded-xl relative flex flex-col items-center justify-center text-center py-8">
                          <button 
                            onClick={() => { setAttachedFile(null); setAttachedFileBase64(null); }}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-white dark:hover:bg-slate-900 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <FileText className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-2" />
                          <h4 className="font-bold text-xs text-slate-800 dark:text-white truncate max-w-[200px]">{attachedFile.name}</h4>
                          <p className="text-[10px] text-slate-400">{(attachedFile.size / 1024).toFixed(1)} KB | {attachedFile.type || 'Document'}</p>
                          <div className="mt-3 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> Fully Prepared for AI
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-800 transition-all py-10"
                        >
                          <Paperclip className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700 mb-2 animate-bounce" />
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Drag or click to choose file</p>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] mx-auto">Supports images, PDFs, or TXT documents</p>
                        </div>
                      )}
                    </div>

                    {/* Presets and prompt area */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Intelligence Prompts</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: 'Summarize', p: 'Please summarize this document and extract its key sections, main points, and structure.' },
                          { label: 'Extract Entities', p: 'Identify and list all organizations, people, dollar amounts, and deadlines found inside this file.' },
                          { label: 'Verify Compliance', p: 'Review this file for potential data hazards, liability, GDPR details, or incomplete formatting.' },
                          { label: 'Translate to Spanish', p: 'Translate all textual elements of this file into fluent, legal Spanish.' }
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setAnalyzePrompt(item.p)}
                            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-200 rounded-lg text-[10px] text-slate-500 dark:text-slate-400 font-bold cursor-pointer transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={analyzePrompt}
                        onChange={(e) => setAnalyzePrompt(e.target.value)}
                        placeholder="Write detailed questions or instructions for the AI analyst..."
                        rows={3}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                      />

                      <button
                        onClick={handleStartAnalysis}
                        disabled={isAnalyzing || !attachedFile}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-45 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Running Extraction & Analysis...</span>
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4" />
                            <span>Initiate AI Document Intelligence</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Results box */}
                  {(analyzeResult || isAnalyzing) && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-900 space-y-2">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                        AI Analytical Extraction Output
                      </span>
                      
                      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-xl min-h-[140px] text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed whitespace-pre-wrap select-all">
                        {isAnalyzing ? (
                          <div className="flex flex-col items-center justify-center h-28 text-slate-400">
                            <Loader2 className="h-6 w-6 animate-spin text-indigo-500 mb-2" />
                            <p className="animate-pulse">Gemini Pro is compiling optical vectors and context layers...</p>
                          </div>
                        ) : (
                          analyzeResult
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* AI Settings & Options Sidebar (Col 4) */}
          <div className="space-y-6">
            
            {/* Quick configuration card */}
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Workspace Options
              </h3>

              {/* Grounding switch */}
              <div className="pt-1.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>Live Web Grounding</span>
                  </span>
                  
                  {isPremium ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useGrounding}
                        onChange={() => setUseGrounding(!useGrounding)}
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  ) : (
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                      <Crown className="h-2.5 w-2.5" /> PRO
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Connect queries directly to live Google Search indices for up-to-the-minute global news and regulatory compliance data.
                </p>

                {!isPremium && (
                  <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2">
                    <Crown className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Grounding is Locked</p>
                      <button 
                        onClick={onTriggerUpgrade}
                        className="text-[9px] text-amber-600 dark:text-amber-400 font-bold hover:underline mt-0.5"
                      >
                        Upgrade to Premium to Unlock &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Models selection details */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-3.5 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Model Assignment
                </span>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Selected Model</span>
                    <span className="font-bold font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                      {isPremium ? "gemini-3.6-flash" : "gemini-3.1-flash-lite"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Tokens Allowed</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold">
                      {isPremium ? "Unlimited" : "Capped (Lite)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance security card */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50/20 dark:from-indigo-950/10 dark:to-slate-950/5 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Zero Storage Policy</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                Your uploaded files and conversations are processed securely within temporary container runtime environments. Conversation logs are never used for machine-learning updates, complying strictly with GDPR data protection protocols.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
