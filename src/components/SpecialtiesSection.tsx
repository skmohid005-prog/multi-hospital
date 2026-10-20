import React, { useState } from 'react';
import { Activity, Eye, ShieldAlert, Sparkles, Stethoscope, HeartPulse, CheckCircle2, ArrowRight, Clock, FileText } from 'lucide-react';
import { SPECIALTIES } from '../data/hospitalData';
import { Specialty, Language } from '../types';

interface SpecialtiesSectionProps {
  lang: Language;
  onOpenBooking: () => void;
  onViewReviews: (category: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  lang,
  onOpenBooking,
  onViewReviews,
}) => {
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty | null>(null);
  const isTe = lang === 'te';

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-sky-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-emerald-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      default:
        return <Activity className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="specialties" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2.5 py-1 rounded-md border border-teal-200">
              <Activity className="w-3.5 h-3.5" />
              {isTe ? 'అత్యాధునిక చికిత్సా విభాగాలు' : 'Clinical Departments & Surgeries'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {isTe ? 'వైద్య విభాగాలు & శస్త్రచికిత్సలు' : 'Advanced Specialties & Procedures'}
            </h2>
            <p className="text-base text-slate-600 mt-2">
              {isTe
                ? 'లాపరోస్కోపిక్ కీహోల్ ఆపరేషన్లు, ఎండోస్కోపీ, తీవ్ర కడుపు నొప్పి మరియు సమగ్ర నేత్ర వైద్యం కొరకు నెల్లూరులో అగ్రగామి ఆసుపత్రి.'
                : 'State-of-the-art diagnostic and surgical equipment ensuring faster recovery, minimal pain, and superior clinical outcomes.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
            >
              <span>{isTe ? 'అపాయింట్‌మెంట్ బుకింగ్' : 'Schedule Consultation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grid of Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(spec.iconName)}
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewReviews(spec.id)}
                    className="text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-md border border-teal-200 transition-colors"
                  >
                    {spec.reviewCount}+ {isTe ? 'సమీక్షలు' : 'Reviews'}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-teal-700 transition-colors">
                  {isTe ? spec.titleTe : spec.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isTe ? spec.shortDescTe : spec.shortDesc}
                </p>

                {/* Key procedures bullet list */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {isTe ? 'కీలక విధానాలు:' : 'Key Treatments:'}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {(isTe ? spec.keyProceduresTe : spec.keyProcedures).slice(0, 3).map((proc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-600" />
                  <span>{isTe ? spec.recoveryTimeTe : spec.recoveryTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSpecialty(spec)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{isTe ? 'పూర్తి సమాచారం' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth Procedure Information */}
        {activeSpecialty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveSpecialty(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
                  {getIcon(activeSpecialty.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {isTe ? activeSpecialty.titleTe : activeSpecialty.title}
                  </h3>
                  <div className="text-xs font-semibold text-teal-700">
                    {activeSpecialty.reviewCount}+ {isTe ? 'రోగుల ధృవీకరణ సమీక్షలు' : 'Patient Testimonials'}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isTe ? 'వివరణ & చికిత్సా విధానం' : 'Overview & Clinical Approach'}
                  </h4>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    {isTe ? activeSpecialty.longDescTe : activeSpecialty.longDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isTe ? 'అందుబాటులో ఉన్న శస్త్రచికిత్సలు / పరీక్షలు' : 'Available Procedures & Diagnostics'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {(isTe ? activeSpecialty.keyProceduresTe : activeSpecialty.keyProcedures).map((proc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {isTe ? 'రోగి ప్రయోజనాలు & రికవరీ సమయం' : 'Key Patient Advantages & Recovery'}
                  </h4>
                  <div className="mt-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <span>{isTe ? activeSpecialty.recoveryTimeTe : activeSpecialty.recoveryTime}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-emerald-800">
                      {(isTe ? activeSpecialty.benefitsTe : activeSpecialty.benefits).map((b, i) => (
                        <div key={i} className="flex items-center gap-1">
                          • {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeSpecialty.id;
                    setActiveSpecialty(null);
                    onViewReviews(id);
                  }}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  {isTe ? 'ఈ విభాగం సమీక్షలు చూడండి →' : 'Read Patient Reviews for this Specialty →'}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSpecialty(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
                  >
                    {isTe ? 'మూసివేయి' : 'Close'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSpecialty(null);
                      onOpenBooking();
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
                  >
                    {isTe ? 'కన్సల్టేషన్ బుక్' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
