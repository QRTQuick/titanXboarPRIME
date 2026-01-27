// Footer Component
// QRT Innovation Team - titanXboarPRIME

import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass border-t border-orange-500/10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* About */}
                    <div>
                        <h3 className="text-orange-400 font-bold mb-2 text-sm">About titanXboarPRIME</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            AI-powered image analysis platform by QRT Innovation Team.
                            Providing rapid visual intelligence since 2023.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-orange-400 font-bold mb-2 text-sm">Resources</h3>
                        <ul className="text-gray-400 text-xs space-y-1">
                            <li>
                                <a href="mailto:quicredtech@gmail.com" className="hover:text-orange-400 transition-colors">
                                    📧 Contact Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-400 transition-colors">
                                    📄 Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-orange-400 transition-colors">
                                    📋 Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-orange-400 font-bold mb-2 text-sm">Legal</h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-2">
                            Version: <span className="mono text-orange-400">0.0.0.1-boarbetaVX</span>
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            ⚠️ Proprietary software. Unauthorized modifications prohibited.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-gray-500 text-xs">
                        © {currentYear} <span className="text-orange-400 font-semibold">QRT Innovation Team</span>. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Built with ❤️ using React + Gemini AI
                    </p>
                </div>

                {/* Code Protection Notice */}
                <div className="mt-4 p-3 bg-red-950/20 border border-red-500/30 rounded">
                    <p className="text-red-400 text-xs text-center">
                        🔒 <strong>Code Protection:</strong> This codebase is managed by QRT Innovation Development Management Team.
                        Modifications require authorization. Contact: quicredtech@gmail.com
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
