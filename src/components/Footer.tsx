import React from 'react';
import { HeartPulse, Phone, MapPin, Clock, Star, Mail, ArrowUp } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking }) => {
  const isTe = lang === 'te';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-md shadow-teal-600/30">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">MADALA</span>
                <span className="text-teal-400 font-bold ml-1 text-sm">HOSPITAL</span>
                <div className="text-[11px] text-slate-400 font-medium">
                  {HOSPITAL_INFO.nameTe}
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              {isTe
                ? 'నెల్లూరులో ప్రముఖ అత్యాధునిక లాపరోస్కోపిక్ సర్జరీ, ఎండోస్కోపీ, కడుపు నొప్పి మరియు సమగ్ర నేత్ర వైద్య కేంద్రం. 24 గంటల అత్యవసర వైద్య సేవలు.'
                : 'Premier center for advanced laparoscopic surgery, GI endoscopy, stomach pain treatment, and comprehensive eye care in Nellore with 24/7 round-the-clock emergency assistance.'}
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-amber-400">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold text-xs">5.0 / 5.0</span>
              <span className="text-slate-400 text-[11px]">(460 Reviews)</span>
            </div>
          </div>

          {/* Quick Departments (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isTe ? 'ప్రధాన విభాగాలు' : 'Key Specialities'}
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Laparoscopic Gallstone Removal
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Laparoscopic Appendectomy
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Video Endoscopy & Colonoscopy
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Eye Care (Dr. Prasanth)
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Stomach Pain & Liver Care
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-teal-400 transition-colors">
                  Dengue & Critical Fever Management
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isTe ? 'త్వరిత లింకులు' : 'Quick Navigation'}
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#doctors" className="hover:text-teal-400 transition-colors">
                  {isTe ? 'వైద్యుల బృందం' : 'Doctors Team'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-400 transition-colors">
                  {isTe ? '460 రోగి సమీక్షలు' : '460 Google Reviews'}
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-teal-400 transition-colors">
                  {isTe ? 'వీల్ చైర్ & సదుపాయాలు' : 'Accessibility & Wards'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-teal-400 transition-colors">
                  {isTe ? 'చిరునామా & మ్యాప్' : 'Map & Landmarks'}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-teal-400 hover:text-teal-300 font-semibold transition-colors cursor-pointer"
                >
                  {isTe ? 'అపాయింట్‌మెంట్ బుకింగ్' : 'Book Appointment'}
                </button>
              </li>
            </ul>
          </div>

          {/* 24/7 Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {isTe ? 'సంప్రదించండి' : '24/7 Contacts'}
            </div>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">{HOSPITAL_INFO.phone}</div>
                  <div className="text-[11px] text-slate-400">24/7 Emergency & Casualty</div>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  Beside Amma Furniture Mall, Gandhinagar, Pogathota, Nellore - 524001
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px]">Open 24 Hours, 7 Days a Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Accessibility */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Madala Multi-Speciality Hospital, Nellore. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Wheelchair-accessible car park & entrance</span>
          <span>·</span>
          <span>NFC & UPI accepted</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
