import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQS, HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isTe = lang === 'te';

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5" />
            {isTe ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Patient Information & FAQs'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isTe ? 'రోగులు మరియు సహాయకులకు సమాధానాలు' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {isTe
              ? 'లాపరోస్కోపిక్ సర్జరీ, ఎండోస్కోపీ, అడ్మిషన్లు మరియు చెల్లింపుల గురించి అవసరమైన వివరాలు.'
              : 'Clear guidance on surgical recovery, admission procedures, 24/7 emergency care, and cashless insurance.'}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-teal-700 transition-colors"
                >
                  <span className="text-sm sm:text-base leading-snug">
                    {isTe ? faq.qTe : faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {isTe ? faq.aTe : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inquiries Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-900 text-sm">
              {isTe ? 'ఇంకా ఏవైనా సందేహాలు ఉన్నాయా?' : 'Have specific medical or surgery questions?'}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {isTe
                ? 'మా కౌన్సెలర్లతో నేరుగా మాట్లాడండి.'
                : 'Our surgical care coordinators are available 24/7 to assist.'}
            </p>
          </div>
          <a
            href={`tel:${HOSPITAL_INFO.phoneTel}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>073860 37003</span>
          </a>
        </div>
      </div>
    </section>
  );
};
