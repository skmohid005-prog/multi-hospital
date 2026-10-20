import React, { useState } from 'react';
import { Phone, Clock, MapPin, Globe, Menu, X, Calendar, ShieldCheck, HeartPulse } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTe = lang === 'te';

  const navLinks = [
    { label: isTe ? 'ప్రత్యేకతలు' : 'Specialties', href: '#specialties' },
    { label: isTe ? 'వైద్యులు' : 'Doctors', href: '#doctors' },
    { label: isTe ? '460 సమీక్షలు' : '460 Reviews', href: '#reviews' },
    { label: isTe ? 'సదుపాయాలు' : 'Facilities', href: '#facilities' },
    { label: isTe ? 'మార్గం & సంప్రదింపులు' : 'Location & Contact', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Urgent Emergency Alert Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isTe ? '24 గంటలు తెరిచి ఉంటుంది' : 'Open 24 Hours Today'}
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              {isTe ? 'పొగతోట, నెల్లూరు (అమ్మ ఫర్నిచర్ మాల్ ప్రక్కన)' : 'Pogathota, Nellore (Beside Amma Furniture Mall)'}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400 text-[11px]">
              FX2P+49 Nellore
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              <span>{isTe ? '24/7 ఎమర్జెన్సీ:' : '24/7 Emergency:'}</span>
              <span className="tracking-wide underline underline-offset-2">{HOSPITAL_INFO.phone}</span>
            </a>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                  lang === 'en' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('te')}
                className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
                  lang === 'te' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  MADALA
                </span>
                <span className="text-xs sm:text-sm font-semibold text-teal-700 tracking-wider uppercase">
                  Multi-Speciality
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                {isTe ? 'మదాల మల్టీ-స్పెషాలిటీ హాస్పిటల్ · నెల్లూరు' : 'Hospital & Laparoscopic Care · Nellore'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-teal-600 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>{isTe ? 'కాల్ చేయండి' : 'Call Desk'}</span>
            </a>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm shadow-teal-600/30 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{isTe ? 'అపాయింట్‌మెంట్ బుక్' : 'Book Appointment'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-700 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{isTe ? 'అపాయింట్‌మెంట్ బుక్ చేసుకోండి' : 'Book Online Appointment'}</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.phoneTel}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>{isTe ? '24/7 కాల్: 073860 37003' : '24/7 Emergency: 073860 37003'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
