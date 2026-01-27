// CookieConsent Component
// QRT Innovation Team - titanXboarPRIME

import React, { useState, useEffect } from 'react';
import PrivacyManager from '../services/privacyManager';

interface CookieConsentProps {
    onAccept: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept }) => {
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const privacyManager = PrivacyManager.getInstance();

    useEffect(() => {
        // Show consent banner if not already given
        if (!privacyManager.hasConsent()) {
            setShow(true);
        }
    }, []);

    const handleAcceptAll = () => {
        privacyManager.setConsent({
            necessary: true,
            analytics: true,
            functional: true,
        });
        setShow(false);
        onAccept();
    };

    const handleAcceptNecessary = () => {
        privacyManager.setConsent({
            necessary: true,
            analytics: false,
            functional: false,
        });
        setShow(false);
        onAccept();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
            <div className="glass tech-corner-br max-w-2xl w-full p-6 pointer-events-auto animate-slide-up">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                            🍪 Cookie & Privacy Notice
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                            titanXboarPRIME uses cookies and local storage to enhance your experience.
                            We store analysis results on your device and manage rate limiting (3 images per 5 minutes)
                            to ensure fair usage.
                        </p>

                        {showDetails && (
                            <div className="mb-4 p-4 bg-black/30 rounded border border-orange-500/20">
                                <h4 className="font-semibold text-orange-400 mb-2">What we store:</h4>
                                <ul className="text-xs text-gray-400 space-y-1 ml-4">
                                    <li>✓ <strong>Necessary:</strong> Session data, rate limiting counters</li>
                                    <li>✓ <strong>Functional:</strong> Analysis cache, user preferences</li>
                                    <li>✓ <strong>Analytics:</strong> Usage statistics (optional)</li>
                                </ul>
                                <p className="text-xs text-gray-500 mt-3">
                                    All data is stored locally on your device. We do not transmit personal information
                                    to third parties. Your images are processed via Google's Gemini API.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 items-center">
                            <button
                                onClick={handleAcceptAll}
                                className="prime-gradient px-6 py-2 rounded font-semibold text-white hover:opacity-90 transition-opacity"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleAcceptNecessary}
                                className="px-6 py-2 rounded font-semibold text-gray-300 border border-gray-600 hover:border-orange-500 transition-colors"
                            >
                                Necessary Only
                            </button>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-orange-400 text-sm underline hover:text-orange-300"
                            >
                                {showDetails ? 'Hide Details' : 'Learn More'}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-3">
                            By using titanXboarPRIME, you agree to our data practices.
                            Contact: <a href="mailto:quicredtech@gmail.com" className="text-orange-400 hover:underline">quicredtech@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
