import React from 'react';
import { Star, ShieldCheck, Phone, Calendar, ArrowRight, Clock, MapPin, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking, onSelectCategory }) => {
  const isTe = lang === 'te';

  const quickSymptoms = [
    { label: isTe ? 'పిత్తాశయ రాళ్లు (గాల్ బ్లాడర్)' : 'Gallbladder Stones', category: 'gall_bladder' },
    { label: isTe ? 'లాపరోస్కోపిక్ సర్జరీ' : 'Laparoscopic Surgery', category: 'laparoscopic' },
    { label: isTe ? 'కడుపు నొప్పి నివారణ' : 'Stomach Pain Relief', category: 'stomach_pain' },
    { label: isTe ? 'ఎండోస్కోపీ & కొలొనోస్కోపీ' : 'Endoscopy & Colonoscopy', category: 'endoscopy' },
    { label: isTe ? 'కంటి సమస్యలు (డా. ప్రశాంత్)' : 'Eye Checkup (Dr. Prasanth)', category: 'eye_care' },
    { label: isTe ? 'డెంగ్యూ & జ్వరాల చికిత్స' : 'Dengue & Fever Care', category: 'dengue_fever' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-teal-100/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Rating Strip */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-amber-200/80 shadow-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-extrabold text-slate-900">5.0</span>
              <span className="text-xs text-slate-500 font-medium">
                (460 {isTe ? 'గూగుల్ సమీక్షలు' : 'Google Reviews'})
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="hidden sm:inline-block text-xs font-semibold text-emerald-700">
                {isTe ? '100% నమ్మకమైన వైద్యం' : '100% Patient Trust'}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                {isTe ? (
                  <>
                    మదాల మల్టీ-స్పెషాలిటీ హాస్పిటల్
                    <span className="block text-2xl sm:text-3xl lg:text-4xl text-teal-700 font-bold mt-2">
                      నెల్లూరులో 24/7 అత్యాధునిక శస్త్రచికిత్స & సంరక్షణ
                    </span>
                  </>
                ) : (
                  <>
                    Advanced Laparoscopic & Multi-Speciality Surgical Care in Nellore
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                {isTe
                  ? 'డాక్టర్ మదాల వెంకట తరుణ్ గారి ఆధ్వర్యంలో నొప్పిలేని కీహోల్ సర్జరీ, ఎండోస్కోపీ మరియు డాక్టర్ ప్రశాంత్ గారి నేత్ర చికిత్స. 24 గంటల అత్యవసర వైద్య సేవలు, అమ్మ ఫర్నిచర్ మాల్ ప్రక్కన, పొగతోట, నెల్లూరు.'
                  : 'Led by renowned surgeons Dr. Madala Venkata Tarun & Dr. Prasanth. Specializing in painless keyhole surgeries, diagnostic endoscopy, gastrointestinal care, ophthalmology, and 24/7 round-the-clock emergency medical assistance.'}
              </p>
            </div>

            {/* Core Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{isTe ? '24 గంటలు తెరిచి ఉంటుంది' : 'Open 24/7 Always'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isTe ? 'తక్కువ కోత & నొప్పి' : 'Keyhole Precision'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white/80 p-2.5 rounded-lg border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <HeartHandshake className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{isTe ? 'వీల్ చైర్ అనుకూలం' : 'Wheelchair Ready'}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-md shadow-teal-600/30 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                <span>{isTe ? 'అపాయింట్‌మెంట్ బుక్ చేయండి' : 'Book Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl border border-slate-300 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{HOSPITAL_INFO.phone}</span>
              </a>

              <a
                href="#location"
                className="text-xs font-semibold text-slate-600 hover:text-teal-700 underline underline-offset-4 py-2 px-1"
              >
                {isTe ? 'హాస్పిటల్ మార్గం చూడండి' : 'View Hospital Map & Directions'}
              </a>
            </div>

            {/* Quick Symptom Chips */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {isTe ? 'త్వరిత చికిత్సా విభాగాలు:' : 'Common Patient Searches & Treatments:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickSymptoms.map((symptom) => (
                  <button
                    key={symptom.category}
                    onClick={() => {
                      onSelectCategory(symptom.category);
                      const el = document.getElementById('reviews');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {symptom.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Hospital Hero Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                  alt="Madala Multi-Speciality Hospital Nellore"
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                        {isTe ? 'పొగతోట, నెల్లూరు' : 'Pogathota, Nellore'}
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">
                        {HOSPITAL_INFO.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isTe ? HOSPITAL_INFO.nameTe : 'Beside Amma Furniture Mall, Gandhinagar'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        5.0 / 5.0
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">460 reviews</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium">{isTe ? 'ప్రధాన సర్జన్' : 'Lead Laparoscopic'}</div>
                      <div className="font-bold text-slate-800 mt-0.5">Dr. M. Venkata Tarun</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-slate-500 font-medium">{isTe ? 'నేత్ర నిపుణులు' : 'Eye Specialist'}</div>
                      <div className="font-bold text-slate-800 mt-0.5">Dr. Prasanth</div>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{isTe ? 'లాపరోస్కోపిక్ గాల్ బ్లాడర్ & అపెండిక్స్ సర్జరీలు' : 'Gallbladder Stones & Laparoscopic Appendectomy'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{isTe ? 'అత్యాధునిక వీడియో ఎండోస్కోపీ & కొలొనోస్కోపీ' : 'High-definition Video Endoscopy & Colonoscopy'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{isTe ? '24/7 ఎమర్జెన్సీ, ట్రామా & క్రిటికల్ కేర్ వార్డ్' : '24/7 Emergency, Trauma, Dengue & Inpatient Care'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Emergency Badge */}
              <div className="absolute -bottom-5 -left-4 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {isTe ? 'అత్యవసర విభాగం' : 'Emergency Assistance'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {isTe ? '24 గంటలూ సిద్ధం' : 'Round the Clock 24/7'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
