import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface FloatingActionBarProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ lang, onOpenBooking }) => {
  const isTe = lang === 'te';

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Quick Chat */}
      <a
        href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Madala%20Multi-Speciality%20Hospital,%20I%20need%20assistance`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs font-bold border border-emerald-400/50"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Emergency Call Floating */}
      <a
        href={`tel:${HOSPITAL_INFO.phoneTel}`}
        className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95 text-xs font-extrabold border border-rose-500"
        title="Call Emergency Hotline"
      >
        <Phone className="w-4 h-4 animate-bounce" />
        <span>{isTe ? '24/7 ఎమర్జెన్సీ కాల్' : '24/7 Call: 073860 37003'}</span>
      </a>
    </div>
  );
};
