import React, { useEffect } from 'react';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { legalContent } from '../data/legalContent';
import panamaLogo from '../assets/panamalogo.png';

const LegalPage = ({ selectedLang, slug, onNavigate }) => {
  const content = legalContent[selectedLang]?.[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Page not found</p>
          <button onClick={() => onNavigate('/')} className="text-blue-600 font-bold hover:underline">Go back home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white font-['Inter'] selection:bg-blue-100 selection:text-blue-900">
      {/* Background Gradient Glows (Matching App.jsx) */}
      <div className="fixed top-[-5%] left-[-5%] w-[600px] h-[600px] bg-[#60B1FF] rounded-full blur-[100px] opacity-15 pointer-events-none mix-blend-multiply animate-float" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#60B1FF] rounded-full blur-[120px] opacity-10 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <div className="mb-16">
          <button 
            onClick={() => onNavigate('/')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest">Back to Home</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em]">Legal Documentation</span>
          </div>
          
          <h1 className="font-['Fustat'] font-bold text-4xl md:text-6xl text-gray-900 tracking-[-2px] mb-6">
            {content.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-black/5">
              <Clock size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{content.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-none space-y-8">
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-12 bg-white/40 backdrop-blur-sm p-8 rounded-[32px] border border-black/[0.03] shadow-sm">
              <h2 className="font-['Fustat'] font-bold text-2xl text-gray-900 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed text-[15px] font-medium whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer of Legal Page */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <img src={panamaLogo} alt="Logo" className="w-8 h-8" />
            <span className="font-['Fustat'] font-bold text-gray-900">Panama Company</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © 2024 PANAMA COMPANY S.A. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
