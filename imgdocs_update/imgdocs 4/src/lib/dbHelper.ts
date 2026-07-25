/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, addDoc, query, where, orderBy, getDocs, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface ConversionRecord {
  id?: string;
  userId: string;
  tool: string;
  fileName: string;
  fileSize: string;
  pageCount: number;
  timestamp: any;
}

export interface SubscriptionData {
  plan: 'free' | 'pro_monthly' | 'pro_yearly' | 'business_monthly' | 'business_yearly';
  status: 'active' | 'cancelled';
  renewalDate: string;
  isPremium: boolean;
  paymentHistory: Array<{
    id: string;
    date: string;
    amount: string;
    plan: string;
    status: 'paid' | 'failed';
  }>;
}

const DEFAULT_SUBSCRIPTION: SubscriptionData = {
  plan: 'free',
  status: 'active',
  renewalDate: '',
  isPremium: false,
  paymentHistory: []
};

/**
 * Persists a conversion event log for logged-in users.
 */
export async function saveConversionRecord(record: Omit<ConversionRecord, 'timestamp'>) {
  const localRecord = {
    ...record,
    id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString()
  };

  // Always save to localStorage as a super robust local mirror/fallback
  try {
    const existing = localStorage.getItem('imgdocs_local_conversions') || '[]';
    const parsed = JSON.parse(existing);
    parsed.unshift(localRecord);
    // Keep last 50 entries
    if (parsed.length > 50) parsed.pop();
    localStorage.setItem('imgdocs_local_conversions', JSON.stringify(parsed));
  } catch (err) {
    console.error('Error saving to localStorage fallback:', err);
  }

  // Attempt saving to Firebase Firestore if authenticated and not a local demo user
  if (record.userId && !record.userId.startsWith('demo-')) {
    try {
      const colRef = collection(db, 'conversions');
      await addDoc(colRef, {
        ...record,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving conversion history to Firestore:', error);
    }
  }
}

/**
 * Retrieves the last 15 conversion records for a specific authenticated user.
 */
export async function getUserConversionHistory(userId: string): Promise<ConversionRecord[]> {
  // If demo user, read from localStorage
  if (!userId || userId.startsWith('demo-')) {
    try {
      const existing = localStorage.getItem('imgdocs_local_conversions') || '[]';
      const parsed: any[] = JSON.parse(existing);
      return parsed
        .filter((r) => r.userId === userId)
        .map((r) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        }))
        .slice(0, 15);
    } catch (err) {
      console.error('Error fetching from localStorage fallback:', err);
      return [];
    }
  }

  try {
    const colRef = collection(db, 'conversions');
    const q = query(
      colRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(15)
    );
    
    const querySnapshot = await getDocs(q);
    const records: ConversionRecord[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        userId: data.userId,
        tool: data.tool,
        fileName: data.fileName,
        fileSize: data.fileSize,
        pageCount: data.pageCount,
        timestamp: data.timestamp?.toDate() || new Date()
      });
    });
    return records;
  } catch (error) {
    console.warn('Error fetching user conversion history from Firestore, falling back to localStorage:', error);
    // Fallback to local storage records for this user
    try {
      const existing = localStorage.getItem('imgdocs_local_conversions') || '[]';
      const parsed: any[] = JSON.parse(existing);
      return parsed
        .filter((r) => r.userId === userId)
        .map((r) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        }))
        .slice(0, 15);
    } catch (err) {
      return [];
    }
  }
}

/**
 * Reads a user's Premium Status and subscription details from Firestore or falls back to localStorage.
 */
export async function getUserSubscriptionData(userId: string): Promise<SubscriptionData> {
  const getLocalData = (): SubscriptionData => {
    try {
      const isPrem = localStorage.getItem('imgdocs_is_premium') === 'true';
      const plan = (localStorage.getItem('imgdocs_sub_plan') || 'free') as any;
      const status = (localStorage.getItem('imgdocs_sub_status') || 'active') as any;
      const renewalDate = localStorage.getItem('imgdocs_sub_renewal') || '';
      const historyStr = localStorage.getItem('imgdocs_sub_payment_history') || '[]';
      const paymentHistory = JSON.parse(historyStr);
      
      return {
        plan,
        status,
        renewalDate,
        isPremium: isPrem,
        paymentHistory
      };
    } catch (err) {
      return DEFAULT_SUBSCRIPTION;
    }
  };

  if (!userId || userId.startsWith('demo-')) {
    return getLocalData();
  }

  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        plan: data.subscriptionPlan || 'free',
        status: data.subscriptionStatus || 'active',
        renewalDate: data.renewalDate || '',
        isPremium: !!data.isPremium,
        paymentHistory: data.paymentHistory || []
      };
    }
    return getLocalData();
  } catch (error) {
    console.error('Error fetching user premium status from Firestore:', error);
    return getLocalData();
  }
}

/**
 * Saves a user's Premium Status and details to local storage and Firestore.
 */
export async function setUserSubscriptionData(userId: string, data: SubscriptionData): Promise<void> {
  localStorage.setItem('imgdocs_is_premium', data.isPremium ? 'true' : 'false');
  localStorage.setItem('imgdocs_sub_plan', data.plan);
  localStorage.setItem('imgdocs_sub_status', data.status);
  localStorage.setItem('imgdocs_sub_renewal', data.renewalDate);
  localStorage.setItem('imgdocs_sub_payment_history', JSON.stringify(data.paymentHistory));

  if (!userId || userId.startsWith('demo-')) {
    return;
  }
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      isPremium: data.isPremium,
      subscriptionPlan: data.plan,
      subscriptionStatus: data.status,
      renewalDate: data.renewalDate,
      paymentHistory: data.paymentHistory
    }, { merge: true });
  } catch (error) {
    console.error('Error setting user premium status in Firestore:', error);
  }
}

/**
 * Reads a user's Premium Status from Firestore or falls back to localStorage.
 */
export async function getUserPremiumStatus(userId: string): Promise<boolean> {
  const sub = await getUserSubscriptionData(userId);
  return sub.isPremium;
}

/**
 * Saves a user's Premium Status to local storage and Firestore.
 */
export async function setUserPremiumStatus(userId: string, isPremium: boolean): Promise<void> {
  const sub = await getUserSubscriptionData(userId);
  sub.isPremium = isPremium;
  sub.plan = isPremium ? 'pro_monthly' : 'free';
  sub.status = 'active';
  if (isPremium) {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    sub.renewalDate = d.toISOString().split('T')[0];
    if (sub.paymentHistory.length === 0) {
      sub.paymentHistory = [{
        id: `inv_${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString().split('T')[0],
        amount: '$4.99',
        plan: 'Pro Monthly Plan',
        status: 'paid'
      }];
    }
  } else {
    sub.renewalDate = '';
  }
  await setUserSubscriptionData(userId, sub);
}

/**
 * Creates or updates a user profile record in Firestore upon signup.
 */
export async function createUserDataRecord(userId: string, email: string): Promise<void> {
  if (!userId || userId.startsWith('demo-')) {
    return;
  }
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      email,
      isPremium: false,
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
      renewalDate: '',
      paymentHistory: [],
      createdAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user data record in Firestore:', error);
  }
}


