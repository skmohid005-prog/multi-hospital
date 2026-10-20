import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check, MessageCircle, ExternalLink, Compass } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface LocationSectionProps {
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const isTe = lang === 'te';

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(HOSPITAL_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Madala Multi Speciality Hospital, beside amma furniture mall, Gandhinagar, Pogathota, Nellore, Andhra Pradesh 524001'
  )}`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            <MapPin className="w-3.5 h-3.5" />
            {isTe ? 'చిరునామా & సంప్రదింపులు' : 'Location & Directions'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isTe ? 'హాస్పిటల్ ను ఎలా చేరుకోవాలి' : 'Visit Us in Pogathota, Nellore'}
          </h2>
          <p className="text-base text-slate-600 mt-2">
            {isTe
              ? 'నెల్లూరు ప్రధాన కేంద్రం పొగతోటలో, అమ్మ ఫర్నిచర్ మాల్ ప్రక్కన సులభంగా చేరుకోగల ప్రదేశం.'
              : 'Centrally located in Pogathota beside Amma Furniture Mall with round-the-clock emergency assistance.'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Address & Contact Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Address Box */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-600/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {HOSPITAL_INFO.name}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {isTe ? HOSPITAL_INFO.addressTe : HOSPITAL_INFO.address}
                  </p>
                  <p className="text-xs text-teal-800 font-semibold bg-teal-50 inline-block px-2.5 py-1 rounded border border-teal-200">
                    {isTe ? 'గుర్తు: అమ్మ ఫర్నిచర్ మాల్ ప్రక్కన' : 'Key Landmark: Beside Amma Furniture Mall'}
                  </p>
                </div>
              </div>

              {/* Plus Code Strip */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs">
                  <Compass className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-slate-600">Google Plus Code:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {HOSPITAL_INFO.plusCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPlusCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 hover:bg-teal-50 rounded-md transition-colors"
                >
                  {copiedPlusCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{isTe ? 'కాపీ అయ్యింది!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isTe ? 'కోడ్ కాపీ చేయండి' : 'Copy Code'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Distances from Key Points */}
              <div className="mt-6">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  {isTe ? 'ప్రధాన ప్రదేశాల నుండి దూరం:' : 'Transit Proximity:'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {HOSPITAL_INFO.landmarks.map((lm, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                      <div className="font-bold text-teal-700 text-sm">{lm.dist}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5 line-clamp-1">{lm.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timings & Emergency Call Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <span>{isTe ? 'హాస్పిటల్ సమయాలు' : 'Operating Hours'}</span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    {isTe ? HOSPITAL_INFO.hoursTe : HOSPITAL_INFO.hours}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {isTe
                      ? 'మంగళవారం (విజయదశమి) సహా అన్ని రోజులూ 24 గంటల అత్యవసర వైద్య సేవలు.'
                      : 'Open 24 hours daily ensuring patients receive round-the-clock emergency medical assistance and care.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isTe ? 'ఎమర్జెన్సీ వార్డ్ సిద్ధంగా ఉంది' : 'Trauma & Emergency Active Now'}
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                    <Phone className="w-4 h-4" />
                    <span>{isTe ? 'అత్యవసర హెల్ప్‌లైన్' : 'Emergency Hotline'}</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-2 tracking-wide">
                    {HOSPITAL_INFO.phone}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {isTe ? 'అంబులెన్స్ & అడ్మిషన్ల కొరకు సంప్రదించండి.' : 'Call directly for immediate emergency dispatch & admission assistance.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-teal-200 flex gap-2">
                  <a
                    href={`tel:${HOSPITAL_INFO.phoneTel}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isTe ? 'కాల్ చేయండి' : 'Call Desk'}</span>
                  </a>
                  <a
                    href={`https://wa.me/${HOSPITAL_INFO.whatsapp}?text=Hello%20Madala%20Hospital,%20I%20would%20like%20to%20inquire%20about%20consultation`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map & Directions Container (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-4">
            <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative min-h-[380px] flex flex-col">
              {/* Map Preview Graphic & Embed fallback */}
              <div className="relative flex-1 bg-slate-200 overflow-hidden flex flex-col justify-center items-center p-6 text-center">
                {/* Background stylistic street grid */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(#0d9488 1px, transparent 1px), radial-gradient(#0d9488 1px, #f1f5f9 1px)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px',
                  }}
                />

                <div className="relative z-10 space-y-3 max-w-sm">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-600/40">
                    <Navigation className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Madala Multi-Speciality Hospital
                  </h4>
                  <p className="text-xs text-slate-600">
                    Beside Amma Furniture Mall, Pogathota, Nellore - 524001
                  </p>
                  <div className="text-[11px] font-mono font-semibold text-teal-800 bg-teal-50 py-1 px-3 rounded-full border border-teal-200 inline-block">
                    {HOSPITAL_INFO.plusCode}
                  </div>
                </div>

                <div className="relative z-10 mt-6 w-full max-w-xs">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                  >
                    <ExternalLink className="w-4 h-4 text-teal-400" />
                    <span>{isTe ? 'గూగుల్ మ్యాప్స్ లో తెరవండి' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>

              {/* Instructions Bar */}
              <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">
                  {isTe ? 'చేరుకోవడానికి సులువైన మార్గం:' : 'Quick Navigation Tip:'}
                </div>
                <p>
                  {isTe
                    ? 'పొగతోట మెయిన్ రోడ్డు నుండి గాంధీనగర్ వైపు వెళ్ళే దారిలో అమ్మ ఫర్నిచర్ మాల్ ప్రక్కనే హాస్పిటల్ ఉంటుంది.'
                    : 'From Pogathota Main Road heading towards Gandhinagar, look for Amma Furniture Mall. The hospital is situated immediately adjacent with dedicated parking.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
