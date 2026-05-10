import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Star, Hexagon, Circle, Triangle, Square, Cloud, ChevronDown, Globe, Shield, Zap, Users, BarChart, Check, MousePointer2, MessageSquare, Layout, Wallet, Quote, Mail, Phone, MapPin, Send, User, Menu, X, Landmark } from 'lucide-react';
import panamaLogo from '../assets/panamalogo.png';
import visaLogo from '../assets/visa.svg';

const LandingPage = ({ selectedLang, setSelectedLang, t, onNavigate }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState('panama');
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [formData, setFormData] = useState({
    companyName: '',
    activity: '',
    pack: 'EXECUTIVE',
    paymentMethod: 'Credit/debit card'
  });
  const langRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const languages = [
    { code: 'EN', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'ES', label: 'Español', flag: 'https://flagcdn.com/w40/pa.png' },
  ];

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Scroll Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => revealElements.forEach(el => observer.unobserve(el));
  }, [selectedLang]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSlug = (item) => {
    return item.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="relative min-h-[100dvh] bg-white overflow-x-hidden overflow-y-auto selection:bg-blue-100 selection:text-blue-900 flex flex-col font-['Inter']">

      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background Gradient Glows */}
      <div className="fixed top-[-5%] left-[-5%] w-[600px] h-[600px] bg-[#60B1FF] rounded-full blur-[100px] opacity-15 pointer-events-none mix-blend-multiply animate-float" />
      <div className="fixed top-[5%] left-[5%] w-[500px] h-[500px] bg-[#319AFF] rounded-full blur-[120px] opacity-15 pointer-events-none mix-blend-multiply animate-float-delayed" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#60B1FF] rounded-full blur-[120px] opacity-10 pointer-events-none mix-blend-multiply" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-10 pt-4 pb-12 flex flex-col h-full flex-grow">

        {/* Navbar */}
        <nav className="sticky top-[20px] z-50 mx-auto w-full md:w-fit flex items-center justify-between px-5 py-2.5 bg-white/40 backdrop-blur-[30px] rounded-[18px] md:rounded-[20px] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0px_2px_4px_0px_rgba(255,255,255,0.4)] transition-all">
          <div className="font-['Fustat'] font-bold text-lg text-gray-900 tracking-tight flex items-center shrink-0">
            <img src={panamaLogo} alt="Panama Company" className="w-7 h-7 rounded-lg object-contain mr-2 shadow-sm" />
            Panama Company
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-600 ml-10 mr-10">
            <a href="#home" className="hover:text-gray-900 transition-colors">{t.nav.home}</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">{t.nav.about}</a>
            <a href="#why-choose-us" className="hover:text-gray-900 transition-colors whitespace-nowrap">{t.nav.why}</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">{t.nav.pricing}</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">{t.nav.testimonials}</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-2 text-xs font-bold text-gray-800 bg-white/50 hover:bg-white/80 transition-all px-3 py-1.5 rounded-lg backdrop-blur-md border border-white shadow-sm"
              >
                <img
                  src={languages.find(l => l.code === selectedLang)?.flag}
                  alt={selectedLang}
                  className="w-5 h-auto object-contain"
                />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white/90 backdrop-blur-2xl rounded-xl border border-black/5 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedLang === lang.code ? 'bg-blue-50/50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <img src={lang.flag} alt={lang.label} className="w-5 h-auto object-contain" />
                        <span>{lang.label}</span>
                      </div>
                      {selectedLang === lang.code && <Check size={12} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/50 rounded-lg border border-white shadow-sm"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Nav Overlay */}
          {menuOpen && (
            <div className="absolute top-[calc(100%+10px)] left-0 right-0 md:hidden bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/5 shadow-2xl p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <a href="#home" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">{t.nav.home}</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">{t.nav.about}</a>
              <a href="#why-choose-us" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">{t.nav.why}</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">{t.nav.pricing}</a>
              <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">{t.nav.testimonials}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-gray-800 pb-2">{t.nav.contact}</a>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="flex flex-col lg:flex-row items-center justify-between mt-12 lg:mt-20 gap-10 lg:gap-4 mb-20 reveal reveal-up active px-2">
          <div className="flex-1 flex flex-col items-start w-full max-w-xl justify-center text-center lg:text-left items-center lg:items-start">
            <div className="flex items-center space-x-2 mb-6 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-sm reveal reveal-left reveal-delay-1 active">
              <div className="flex -space-x-1.5">
                {['/latin1.jpg', '/latin2.jpg', '/latin3.jpg', '/latin4.jpg'].map((src, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={src} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-gray-700">{t.hero.badge}</span>
            </div>

            <h1 className="font-['Fustat'] font-bold text-4xl sm:text-5xl md:text-[54px] leading-[1.1] md:leading-[1.05] tracking-[-2px] text-gray-900 mb-5 reveal reveal-up reveal-delay-2 active">
              {t.hero.title.split(',')[0]},<br /><span className="text-blue-600">{t.hero.title.split(',')[1]}</span>
            </h1>

            <p className="text-[14px] lg:text-[16px] text-gray-600 tracking-[-0.3px] leading-relaxed mb-8 max-w-md reveal reveal-up reveal-delay-3 active">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 reveal reveal-up reveal-delay-4 active w-full sm:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto group flex items-center justify-center space-x-3 bg-gray-900 text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-[12px] text-gray-500 font-bold">
                <Check size={14} className="text-green-500" /> {t.hero.noFees}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 relative w-full justify-center items-center h-[380px] reveal reveal-scale reveal-delay-2 active">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-blue-400/10 rounded-full blur-[60px] animate-float" />
              <video
                src="https://future.co/images/homepage/glassy-orb/orb-purple.webm"
                autoPlay loop muted playsInline
                className="mix-blend-screen scale-[0.85] w-full max-w-[450px] sm:max-w-[500px] object-contain drop-shadow-[0_15px_40px_rgba(0,132,255,0.25)]"
                style={{ filter: "hue-rotate(-55deg) saturate(200%) brightness(1.2)" }}
              />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 relative reveal reveal-up px-2">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 block reveal reveal-up reveal-delay-1">{t.about.badge}</span>
            <h2 className="font-['Fustat'] font-bold text-3xl md:text-[42px] leading-[1.1] tracking-[-1.5px] text-gray-900 mb-5 reveal reveal-up reveal-delay-2">
              {t.about.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[Shield, BarChart, Zap].map((Icon, idx) => (
              <div key={idx} className={`group bg-white/40 backdrop-blur-md p-8 rounded-[24px] border border-black/[0.03] hover:border-blue-500/10 hover:bg-white/70 transition-all duration-500 shadow-sm hover:shadow-xl reveal reveal-up reveal-delay-${idx + 1}`}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <Icon size={22} />
                </div>
                <h3 className="font-['Fustat'] font-bold text-xl text-gray-900 mb-3">{t.about.features[idx].title}</h3>
                <p className="text-gray-600 text-[13px] leading-relaxed">{t.about.features[idx].desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-20 relative reveal reveal-up px-2">
          <div className="text-center mb-16">
            <h2 className="font-['Fustat'] font-bold text-3xl md:text-[42px] tracking-[-1.5px] text-gray-900 reveal reveal-up">
              {t.why.title.split('easy')[0]} <span className="text-blue-600">{selectedLang === 'EN' ? 'easy' : 'fácil'}</span> {t.why.title.split(selectedLang === 'EN' ? 'easy' : 'fácil')[1]}
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto px-4">
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-100 hidden md:block -translate-x-1/2" />
            <div className="flex flex-col space-y-12 md:space-y-16">
              {[MousePointer2, MessageSquare, Layout, Wallet].map((Icon, idx) => (
                <div key={idx} className={`flex md:justify-${idx % 2 === 0 ? 'start' : 'end'} justify-center relative reveal reveal-${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="w-full max-w-sm bg-white p-8 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-black/[0.03] group hover:shadow-lg transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{t.why.steps[idx].title}</h3>
                    <p className="text-gray-600 text-[13px] leading-relaxed">{t.why.steps[idx].desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="mb-16 reveal reveal-left text-left flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <h2 className="font-['Fustat'] font-bold text-6xl md:text-[80px] text-gray-900 leading-tight tracking-[-3px] uppercase">{t.pricing.titleLine1}</h2>
              <h2 className="font-['Fustat'] font-bold text-6xl md:text-[80px] text-gray-900 -mt-4 md:-mt-8 tracking-[-3px] uppercase">{t.pricing.titleLine2}</h2>
            </div>
            <p className="text-gray-400 text-xs font-bold max-w-[200px] text-left mb-4">Transparent offshore solutions with zero hidden costs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="bg-[#FBFBFB] rounded-[32px] p-6 md:p-8 flex flex-col justify-between border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-700 reveal reveal-left">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="font-bold text-[9px] uppercase tracking-widest text-gray-500">{t.pricing.standard.badge}</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-[8px] font-bold uppercase tracking-wider">{t.pricing.standard.tag}</span>
                </div>
                <h3 className="font-['Fustat'] font-bold text-xl md:text-[24px] leading-[1.1] mb-4 text-gray-900 tracking-tight">{t.pricing.standard.sub}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">{t.pricing.standard.price}</span>
                  <span className="text-gray-400 text-[10px] font-bold">{t.pricing.standard.period}</span>
                </div>
                <div className="space-y-3 mb-12">
                  {t.pricing.standard.features.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-gray-600 font-bold">
                      <div className="w-1 h-1 rounded-full bg-blue-200" />{item}
                    </div>
                  ))}
                </div>
                {t.pricing.standard.renewal && (
                  <div className="mb-8 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <p className="text-[10px] font-bold text-blue-600 leading-tight">
                      {t.pricing.standard.renewal}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setFormData({...formData, pack: 'STANDARD'});
                    setShowModal(true);
                  }}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  {selectedLang === 'EN' ? 'View Plan' : 'Ver Plan'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0A0A0A] rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white group hover:scale-[1.01] transition-all duration-700 reveal reveal-up">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[60px]" />
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="font-bold text-[9px] uppercase tracking-widest text-blue-400">{t.pricing.executive.badge}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[8px] font-bold uppercase tracking-wider">{t.pricing.executive.tag}</span>
                </div>
                <h3 className="font-['Fustat'] font-bold text-xl md:text-[24px] leading-[1.1] mb-4 text-white tracking-tight">{t.pricing.executive.sub}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-white tracking-tight">{t.pricing.executive.price}</span>
                  <span className="text-gray-500 text-[10px] font-bold">{t.pricing.executive.period}</span>
                </div>
                <div className="space-y-3 mb-12">
                  {t.pricing.executive.features.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-gray-400 font-bold">
                      <div className="w-1 h-1 rounded-full bg-blue-600" />{item}
                    </div>
                  ))}
                </div>
                {t.pricing.executive.renewal && (
                  <div className="mb-8 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-blue-400 leading-tight">
                      {t.pricing.executive.renewal}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setFormData({...formData, pack: 'EXECUTIVE'});
                    setShowModal(true);
                  }}
                  className="w-full bg-white text-gray-900 px-6 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-xl flex items-center justify-center gap-2 group"
                >
                  {selectedLang === 'EN' ? 'View Plan' : 'Ver Plan'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 flex flex-col justify-between border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-700 reveal reveal-right">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="font-bold text-[9px] uppercase tracking-widest text-blue-600">{t.pricing.elite.badge}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-wider">{t.pricing.elite.tag}</span>
                </div>
                <h3 className="font-['Fustat'] font-bold text-xl md:text-[24px] leading-[1.1] mb-4 text-gray-900 tracking-tight">{t.pricing.elite.sub}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">{t.pricing.elite.price}</span>
                  <span className="text-gray-400 text-[10px] font-bold">{t.pricing.elite.period}</span>
                </div>
                <div className="space-y-3 mb-12">
                  {t.pricing.elite.features.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-gray-600 font-bold">
                      <div className="w-1 h-1 rounded-full bg-blue-400" />{item}
                    </div>
                  ))}
                </div>
                {t.pricing.elite.renewal && (
                  <div className="mb-8 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <p className="text-[10px] font-bold text-blue-600 leading-tight">
                      {t.pricing.elite.renewal}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setFormData({...formData, pack: 'CORPORATE'});
                    setShowModal(true);
                  }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  {selectedLang === 'EN' ? 'View Plan' : 'Ver Plan'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Marquee Section */}
        <section id="testimonials" className="py-12 md:py-20 overflow-hidden reveal reveal-up px-2">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left reveal reveal-left">
              <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">{t.testimonials.badge}</span>
              <h2 className="font-['Fustat'] font-bold text-4xl md:text-[56px] leading-[1.1] tracking-[-2px] text-gray-900 mb-6">{t.testimonials.title}</h2>
              <p className="text-gray-600 text-sm max-w-sm leading-relaxed mb-8">{t.testimonials.subtitle}</p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {['/latin1.jpg', '/latin2.jpg', '/latin3.jpg', '/latin4.jpg', '/latin5.jpg'].map((src, i) => (
                    <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="avatar" />
                  ))}
                </div>
                <div className="text-xs font-bold text-gray-900">{t.testimonials.rated}</div>
              </div>
            </div>
            <div className="flex-1 relative md:h-[450px] overflow-hidden w-full reveal reveal-right">
              <div className="animate-scroll-y flex flex-col gap-4 py-10">
                {[...t.testimonials.items, ...t.testimonials.items].map((item, i) => (
                  <div
                    key={i}
                    className={`bg-[#F8F9FA] p-5 rounded-[20px] border border-black/[0.03] shadow-sm transition-all ${
                      i >= t.testimonials.items.length ? 'hidden md:block' : (i >= 3 ? 'hidden md:block' : '')
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={item.img} className="w-9 h-9 rounded-xl object-cover" alt="client" />
                      <div>
                        <div className="font-bold text-[13px] text-gray-900">{item.name}</div>
                        <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{item.role}</div>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-600 font-medium leading-relaxed italic">"{item.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <div id="payment-methods" className="mt-20 reveal reveal-up">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 block">{selectedLang === 'EN' ? 'Security & Payments' : 'Seguridad y Pagos'}</span>
            <h2 className="font-['Fustat'] font-bold text-3xl md:text-[42px] tracking-[-1.5px] text-gray-900">{t.footer.cols.legal.items[4]}</h2>
          </div>

          <div className="w-full overflow-hidden py-12 relative">
            <div className="flex whitespace-nowrap animate-scroll-x items-center w-max">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-12 px-6">
                  {[
                    { name: 'Google Pay', iconElement: <svg viewBox="0 0 100 60" className="w-full h-full"><rect width="100" height="60" rx="10" fill="white"/><text x="50" y="38" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="#3c4043" textAnchor="middle">G Pay</text></svg> },
                    { name: 'Apple Pay', iconElement: <svg viewBox="0 0 100 60" className="w-full h-full"><rect width="100" height="60" rx="10" fill="black"/><text x="50" y="38" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle"> Pay</text></svg> },
                    { name: 'Master Card', iconElement: <svg viewBox="0 0 100 60" className="w-full h-full"><rect width="100" height="60" rx="10" fill="white"/><circle cx="40" cy="30" r="16" fill="#eb001b" fillOpacity="0.9"/><circle cx="60" cy="30" r="16" fill="#f79e1b" fillOpacity="0.9"/></svg> },
                    { name: 'Visa', logo: visaLogo },
                    { name: 'American Express', iconElement: <svg viewBox="0 0 100 60" className="w-full h-full"><rect width="100" height="60" rx="10" fill="#002663"/><text x="50" y="38" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">AMEX</text></svg> },
                    { name: 'US Bank Transfer', icon: Landmark },
                    { name: 'Panama Bank Transfer', icon: Landmark },
                    { name: 'USDT / USDC', iconElement: <svg viewBox="0 0 32 32" className="w-full h-full"><path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#26A17B"/><path d="M17.279 13.911V10.155H22.428V6.262H9.571V10.155H14.72V13.911C10.749 14.075 7.643 14.883 7.643 15.856C7.643 16.829 10.749 17.636 14.72 17.801V26.393H17.279V17.801C21.25 17.636 24.357 16.829 24.357 15.856C24.357 14.883 21.25 14.075 17.279 13.911ZM15.999 16.516C12.871 16.516 10.22 15.969 9.873 15.267H9.872C10.22 14.565 12.871 14.018 15.999 14.018C19.127 14.018 21.778 14.565 22.126 15.267H22.127C21.779 15.969 19.128 16.516 15.999 16.516Z" fill="white"/></svg> },
                    { name: 'BTC', iconElement: <svg viewBox="0 0 32 32" className="w-full h-full"><path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#F7931A"/><path d="M21.78 15.37C22.61 14.81 23.18 13.9 23.3 12.5C23.51 10.05 21.64 9.17 18.88 8.87V5.51H17.2V8.67H15.65V5.51H13.97V8.58C13.97 8.58 12.01 8.58 11.96 8.58V9.89C12.58 9.93 12.92 10.22 12.92 10.74V19.34C12.92 19.86 12.54 20.19 11.96 20.21V21.52H13.97V24.68H15.65V21.57H17.2V24.68H18.88V21.52C22.42 21.36 24.47 20.25 24.23 17.51C24.08 16.03 23.12 15.54 21.78 15.37ZM15.65 11.1H18.06C19.87 11.1 20.45 11.89 20.29 12.83C20.08 14.07 18.99 14.56 17.43 14.56H15.65V11.1ZM18.42 19.1H15.65V15.56H18.59C20.47 15.56 21.32 16.27 21.16 17.51C20.94 19.06 19.87 19.1 18.42 19.1Z" fill="white"/></svg> },
                    { name: 'ETH', iconElement: <svg viewBox="0 0 32 32" className="w-full h-full"><path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/><path d="M16.498 4V14.629L24.887 18.397L16.498 4Z" fill="#C0CBF6"/><path d="M16.498 4L8.109 18.397L16.498 14.629V4Z" fill="white"/><path d="M16.498 25.999V16.311L8.109 19.988L16.498 25.999Z" fill="white"/><path d="M16.498 25.999L24.887 19.988L16.498 16.311V25.999Z" fill="#C0CBF6"/><path d="M16.498 14.63V4L8.109 18.398L16.498 14.63Z" fill="#8197EE"/></svg> }
                  ].map((method, j) => (
                    <div key={`${i}-${j}`} className="flex flex-col items-center justify-center min-w-[100px] gap-3 group">
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-2xl p-3 group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                        {method.iconElement ? (
                          method.iconElement
                        ) : method.logo ? (
                          <img src={method.logo} alt={method.name} className="w-full h-full object-contain transition-all duration-300" />
                        ) : (
                          <div className="text-blue-600 transition-colors">
                            {method.icon && <method.icon size={28} />}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{method.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <section id="contact" className="py-12 md:py-24 reveal reveal-up px-2">
          <div className="text-center mb-16 reveal reveal-up">
            <h2 className="font-['Fustat'] font-bold text-4xl md:text-[48px] tracking-[-1.5px] text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-gray-500 text-sm font-medium px-4">{t.contact.subtitle}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 w-full reveal reveal-left order-2 lg:order-1">
              <h3 className="font-bold text-lg text-gray-900 mb-6 uppercase tracking-wider">{t.contact.where}</h3>
              <div className="relative w-full h-[300px] md:h-[350px] rounded-[32px] overflow-hidden border border-black/5 shadow-2xl mb-8 group">
                <iframe
                  src={activeBranch === 'panama'
                    ? "https://maps.google.com/maps?q=Tower%20Financial%20Center,%20Panama%20City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    : "https://maps.google.com/maps?q=1200%20Brickell%20Ave,%20Miami,%20FL%2033131&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1) brightness(0.95)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={activeBranch === 'panama' ? "Panama City Map" : "Miami Map"}
                  className="group-hover:grayscale-0 transition-all duration-1000"
                ></iframe>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 mb-6 p-1 bg-gray-100/50 rounded-xl w-fit">
                    <button
                      onClick={() => setActiveBranch('panama')}
                      className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeBranch === 'panama' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <img src="https://flagcdn.com/w40/pa.png" alt="Panama" className="w-4 h-3 object-cover" />
                      Panama Branch
                    </button>
                    <button
                      onClick={() => setActiveBranch('miami')}
                      className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeBranch === 'miami' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-4 h-3 object-cover" />
                      Miami Branch
                    </button>
                  </div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {activeBranch === 'panama' ? t.contact.hq : 'Miami Branch'}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {activeBranch === 'panama' ? t.contact.address : '1200 Brickell Ave | Miami, FL 33131'}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="https://wa.me/13187706430" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-green-600 transition-colors">
                    <svg className="w-5 h-5 fill-green-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.44h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    +1 (318) 770-6430
                  </a>
                  <a href="mailto:contact@panamacompany.net" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    <Mail size={14} className="text-blue-500" /> contact@panamacompany.net
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl reveal reveal-right order-1 lg:order-2">
              <div className="bg-[#F8F9FF] p-6 sm:p-8 md:p-10 rounded-[40px] border border-blue-50 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input type="text" placeholder={t.contact.form.firstName} className="w-full bg-white border border-blue-100 rounded-xl px-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300 font-medium" />
                    </div>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input type="text" placeholder={t.contact.form.lastName} className="w-full bg-white border border-blue-100 rounded-xl px-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300 font-medium" />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input type="tel" placeholder={t.contact.form.phone} className="w-full bg-white border border-blue-100 rounded-xl px-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300 font-medium" />
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                    <input type="email" placeholder={t.contact.form.email} className="w-full bg-white border border-blue-100 rounded-xl px-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300 font-medium" />
                  </div>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-4 text-blue-400" />
                    <textarea rows="4" placeholder={t.contact.form.message} className="w-full bg-white border border-blue-100 rounded-xl px-11 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-300 font-medium resize-none"></textarea>
                  </div>
                  <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-lg">
                    {t.contact.form.cta} <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <footer className="mt-16 pt-10 pb-10 reveal reveal-up px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1 reveal reveal-left">
              <div className="font-['Fustat'] font-bold text-xl text-gray-900 mb-6 flex items-center">
                <img src={panamaLogo} alt="Logo" className="w-8 h-8 mr-2" />
                Panama Company
              </div>
              <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 max-w-xs">
                {t.footer.desc}
              </p>
            </div>

            <div className="reveal reveal-up reveal-delay-1">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-900 mb-8">{t.footer.cols.pages.title}</h4>
              <ul className="space-y-3">
                {t.footer.cols.pages.items.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>


            <div className="reveal reveal-up reveal-delay-3">
              <h4 className="font-bold text-xs uppercase tracking-widest text-gray-900 mb-8">{t.footer.cols.legal.title}</h4>
              <ul className="space-y-3">
                {t.footer.cols.legal.items.map((link) => (
                  <li key={link}>
                    <button onClick={() => onNavigate(`/legal/${getSlug(link)}`)} className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center border-t border-gray-50 pt-10 reveal reveal-up reveal-delay-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4">
              {t.footer.copy}
            </p>
          </div>
        </footer>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/13187706430"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)] transition-all duration-300 group"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-7 h-7 fill-white group-hover:animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.44h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-black/5">
            Chat with us
          </span>
        </a>

        {/* Incorporation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-[40px] border border-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-['Fustat'] font-bold text-2xl text-gray-900">Start Your Incorporation</h3>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitStatus('sending');

                    const templateParams = {
                      company_name: formData.companyName,
                      commercial_activity: formData.activity,
                      selected_pack: formData.pack,
                      payment_method: formData.paymentMethod,
                      to_email: 'simbikelia@gmail.com'
                    };

                    // EmailJS integration (fill your IDs below)
                    const SERVICE_ID = "YOUR_SERVICE_ID";
                    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
                    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

                    // If you haven't set up EmailJS yet, this will fail gracefully and fall back to mailto
                    if (SERVICE_ID === "YOUR_SERVICE_ID") {
                      const subject = encodeURIComponent("New Incorporation Request");
                      const body = encodeURIComponent(
                        `Company Name: ${formData.companyName}\n` +
                        `Commercial Activity: ${formData.activity}\n` +
                        `Selected Pack: ${formData.pack}\n` +
                        `Payment Method: ${formData.paymentMethod}`
                      );
                      window.location.href = `mailto:simbikelia@gmail.com?subject=${subject}&body=${body}`;
                      setSubmitStatus('success');
                      setTimeout(() => {
                        setShowModal(false);
                        setSubmitStatus('idle');
                      }, 3000);
                    } else {
                      // Using the EmailJS REST API
                      fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          service_id: SERVICE_ID,
                          template_id: TEMPLATE_ID,
                          user_id: PUBLIC_KEY,
                          template_params: templateParams
                        })
                      })
                      .then(() => {
                        setSubmitStatus('success');
                        setTimeout(() => {
                          setShowModal(false);
                          setSubmitStatus('idle');
                        }, 3000);
                      })
                      .catch((err) => {
                        console.error('EmailJS Error:', err);
                        // Fallback to mailto
                        window.location.href = `mailto:simbikelia@gmail.com?subject=New Incorporation Request&body=Error sending via EmailJS. Please check details.`;
                      });
                    }
                  }}
                  className="space-y-5"
                >
                  {submitStatus === 'success' ? (
                    <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Application Sent!</h4>
                      <p className="text-gray-500 text-sm">We've received your request and our legal team will contact you shortly.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Proposed Company Name (must end in S.A.)</label>
                    <div className="relative">
                      <Layout size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. My Global Business S.A."
                        className="w-full bg-white border border-blue-100 rounded-2xl px-11 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Commercial Activity</label>
                    <div className="relative">
                      <Zap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software Services"
                        className="w-full bg-white border border-blue-100 rounded-2xl px-11 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                        value={formData.activity}
                        onChange={(e) => setFormData({...formData, activity: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Pack</label>
                      <select
                        className="w-full bg-white border border-blue-100 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium appearance-none"
                        value={formData.pack}
                        onChange={(e) => setFormData({...formData, pack: e.target.value})}
                      >
                        <option>Standard Pack</option>
                        <option>Executive Pro</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                      <select
                        className="w-full bg-white border border-blue-100 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium appearance-none"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      >
                        <option>Credit/debit card</option>
                        <option>Panama local bank transfer</option>
                        <option>US local bank transfer</option>
                        <option>Crypto (USDT USDC BTC ETH)</option>
                      </select>
                    </div>
                  </div>

                      <button
                        type="submit"
                        disabled={submitStatus === 'sending'}
                        className="w-full bg-[#1A1A1A] text-white py-4 mt-4 rounded-2xl text-sm font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl disabled:opacity-50"
                      >
                        {submitStatus === 'sending' ? 'Opening Email...' : 'Send Information'}
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default LandingPage;
