import React from 'react';
import { CreditCard, Smartphone, ShieldCheck, HeartPulse, Clock, Sparkles, Building, CheckCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface FacilitiesSectionProps {
  lang: Language;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ lang }) => {
  const isTe = lang === 'te';

  const hospitalFeatures = [
    {
      title: isTe ? 'వీల్ చైర్ అనుకూల ప్రవేశం & పార్కింగ్' : 'Wheelchair-Accessible Campus',
      desc: isTe
        ? 'వయోవృద్ధులకు మరియు అస్వస్థతతో ఉన్న రోగులకు వీల్ చైర్ పార్కింగ్ మరియు ప్రత్యేక ర్యాంప్ సదుపాయం.'
        : 'Dedicated wheelchair-accessible car park, ramp entrances, spacious elevator, and attendant assistance.',
      icon: <Building className="w-6 h-6 text-teal-600" />,
      tag: isTe ? 'యాక్సెసిబిలిటీ' : 'Accessibility Certified',
    },
    {
      title: isTe ? 'అత్యాధునిక మాడ్యులర్ ఆపరేషన్ థియేటర్' : 'Advanced Modular Operation Theatres',
      desc: isTe
        ? 'సంపూర్ణ క్రిమిరహిత వాతావరణం (ల్యామినార్ ఎయిర్ ఫ్లో) మరియు అత్యాధునిక హెచ్‌డీ లాపరోస్కోపీ టవర్స్.'
        : 'Equipped with HD laparoscopic video stacks, harmonic scalpel, and HEPA laminar air flow.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      tag: isTe ? 'శస్త్రచికిత్స విభాగం' : 'Surgical Excellence',
    },
    {
      title: isTe ? '24/7 అత్యవసర & క్రిటికల్ కేర్ వార్డ్' : '24/7 Emergency & ICU Care',
      desc: isTe
        ? 'తీవ్ర కడుపు నొప్పి, ట్రామా, ప్రమాదాలు మరియు డెంగ్యూ విష జ్వరాలకు 24 గంటల తక్షణ చికిత్స.'
        : 'Emergency triage, multi-para monitors, ventilator support, and around-the-clock doctor presence.',
      icon: <Clock className="w-6 h-6 text-rose-600" />,
      tag: isTe ? '24 గంటలు సిద్ధం' : 'Open 24 Hours',
    },
    {
      title: isTe ? 'వీడియో ఎండోస్కోపీ & కొలొనోస్కోపీ ల్యాబ్' : 'HD Video Endoscopy Suite',
      desc: isTe
        ? 'జీర్ణకోశ, ఎసిడిటీ మరియు పేగు సమస్యల తక్షణ విశ్లేషణకు ప్రత్యేకమైన అల్ట్రా-క్లియర్ ఎండోస్కోపీ విభాగం.'
        : 'Painless diagnostic and therapeutic endoscopy, colonoscopy, and rapid biopsy facilities.',
      icon: <Sparkles className="w-6 h-6 text-sky-600" />,
      tag: isTe ? 'డయాగ్నస్టిక్స్' : 'Same-Day Diagnostics',
    },
  ];

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2.5 py-1 rounded-md border border-teal-200">
            <HeartPulse className="w-3.5 h-3.5" />
            {isTe ? 'రోగుల సౌకర్యాలు & భద్రత' : 'World-Class Infrastructure'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isTe ? 'హాస్పిటల్ సదుపాయాలు & చెల్లింపు విధానాలు' : 'Hospital Facilities & Patient Amenities'}
          </h2>
          <p className="text-base text-slate-600 mt-2">
            {isTe
              ? 'రోగుల సౌకర్యం, పరిశుభ్రత మరియు అధునాతన వైద్య ప్రమాణాలకు నెల్లూరు నడిబొడ్డున ఉన్న అత్యుత్తమ చిరునామా.'
              : 'Designed for patient safety, rapid recovery, seamless wheelchair mobility, and complete transparent billing.'}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {hospitalFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Card: Accessibility Details & Accepted Payment Modes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accessibility */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                ♿
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {isTe ? 'వీల్ చైర్ & ప్రత్యేక సౌకర్యాలు' : 'Accessibility & Elderly Assistance'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTe ? 'ప్రతి రోగికి సులభమైన ప్రవేశం' : 'Barrier-free healthcare access'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 mt-4">
              {(isTe ? HOSPITAL_INFO.accessibilityTe : HOSPITAL_INFO.accessibility).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              {isTe
                ? 'హాస్పిటల్ వద్దకు చేరుకోగానే మా సిబ్బంది స్ట్రెచర్ లేదా వీల్ చైర్ తో మీకు సహాయం అందించడానికి సిద్ధంగా ఉంటారు.'
                : 'Need stretcher or wheelchair upon arrival? Call ahead at 073860 37003 and our ward assistants will receive you at the parking bay.'}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {isTe ? 'అంగీకరించబడే చెల్లింపు పద్ధతులు' : 'Convenient Payment & Billing'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTe ? 'డిజిటల్ & కార్డు చెల్లింపులు' : '100% transparent cashless & digital options'}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 mt-4">
              {(isTe ? HOSPITAL_INFO.paymentMethodsTe : HOSPITAL_INFO.paymentMethods).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {isTe ? 'మద్దతు ఉన్న మాధ్యమాలు:' : 'Accepted Modes:'}
              </span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                UPI (GPay / PhonePe)
              </span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                NFC Contactless
              </span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                Visa / MasterCard
              </span>
              <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">
                Cash
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
