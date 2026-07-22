/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// Configuration parameters retrieved from firebase-applet-config.json
const firebaseConfig = {
  projectId: "blissful-nuance-5k8sk",
  appId: "1:297540206008:web:1252bda61c2a9fdb89e34d",
  apiKey: "AIzaSyBnl8IHh0PckBbpZtfwCESV_Mw1NhQMVuI",
  authDomain: "blissful-nuance-5k8sk.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-imgdocs-a54665b8-c405-404a-80f0-57970021e2b3",
  storageBucket: "blissful-nuance-5k8sk.firebasestorage.app",
  messagingSenderId: "297540206008"
};

// Lazy initialization to prevent startup crashes or multi-instance errors
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use the custom database ID only if running on the AI Studio provisioned project, otherwise fallback to the default database
// Force long-polling to bypass iframe proxy/websocket blockages in sandbox environment
export const db = firebaseConfig.projectId === 'blissful-nuance-5k8sk'
  ? initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId)
  : initializeFirestore(app, { experimentalForceLongPolling: true });

export default app;
