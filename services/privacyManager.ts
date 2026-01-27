// Cookie Consent & Privacy Manager
// QRT Innovation Team - titanXboarPRIME

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  timestamp: number;
}

export interface UserSession {
  sessionId: string;
  imageAnalysisCount: number;
  lastAnalysisTime: number;
  consentGiven: boolean;
}

class PrivacyManager {
  private static instance: PrivacyManager;
  private readonly CONSENT_KEY = 'qrt_cookie_consent';
  private readonly SESSION_KEY = 'qrt_user_session';
  private readonly RATE_LIMIT = 3; // images per window
  private readonly RATE_WINDOW = 5 * 60 * 1000; // 5 minutes in ms

  private constructor() {}

  static getInstance(): PrivacyManager {
    if (!PrivacyManager.instance) {
      PrivacyManager.instance = new PrivacyManager();
    }
    return PrivacyManager.instance;
  }

  // Cookie Consent Management
  hasConsent(): boolean {
    const consent = this.getConsent();
    return consent !== null && consent.necessary;
  }

  getConsent(): CookieConsent | null {
    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  setConsent(consent: Partial<CookieConsent>): void {
    const fullConsent: CookieConsent = {
      necessary: true, // Always required
      analytics: consent.analytics ?? false,
      functional: consent.functional ?? true,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(fullConsent));
  }

  revokeConsent(): void {
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Session Management
  getSession(): UserSession {
    try {
      const stored = localStorage.getItem(this.SESSION_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    // Create new session
    const newSession: UserSession = {
      sessionId: this.generateSessionId(),
      imageAnalysisCount: 0,
      lastAnalysisTime: 0,
      consentGiven: this.hasConsent(),
    };
    this.saveSession(newSession);
    return newSession;
  }

  private saveSession(session: UserSession): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  private generateSessionId(): string {
    return `qrt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Rate Limiting
  canAnalyzeImage(): { allowed: boolean; remainingCount: number; resetTime: number } {
    const session = this.getSession();
    const now = Date.now();
    const timeSinceLastAnalysis = now - session.lastAnalysisTime;

    // Reset counter if window has passed
    if (timeSinceLastAnalysis > this.RATE_WINDOW) {
      session.imageAnalysisCount = 0;
      session.lastAnalysisTime = now;
      this.saveSession(session);
    }

    const remainingCount = this.RATE_LIMIT - session.imageAnalysisCount;
    const resetTime = session.lastAnalysisTime + this.RATE_WINDOW;

    return {
      allowed: session.imageAnalysisCount < this.RATE_LIMIT,
      remainingCount: Math.max(0, remainingCount),
      resetTime,
    };
  }

  recordImageAnalysis(): void {
    const session = this.getSession();
    const now = Date.now();

    // Reset if window passed
    if (now - session.lastAnalysisTime > this.RATE_WINDOW) {
      session.imageAnalysisCount = 1;
      session.lastAnalysisTime = now;
    } else {
      session.imageAnalysisCount++;
    }

    this.saveSession(session);
  }

  getRemainingTime(): number {
    const session = this.getSession();
    const resetTime = session.lastAnalysisTime + this.RATE_WINDOW;
    return Math.max(0, resetTime - Date.now());
  }

  // Cache Management
  cacheAnalysis(imageHash: string, result: any): void {
    if (!this.hasConsent()) return;

    try {
      const cacheKey = `qrt_cache_${imageHash}`;
      const cacheData = {
        result,
        timestamp: Date.now(),
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache analysis:', error);
    }
  }

  getCachedAnalysis(imageHash: string): any | null {
    if (!this.hasConsent()) return null;

    try {
      const cacheKey = `qrt_cache_${imageHash}`;
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const { result, timestamp } = JSON.parse(stored);
        // Cache valid for 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          return result;
        }
        localStorage.removeItem(cacheKey);
      }
    } catch {}
    return null;
  }

  clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('qrt_cache_')) {
        localStorage.removeItem(key);
      }
    });
  }

  // Utility: Generate hash for image
  async hashImage(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export default PrivacyManager;
