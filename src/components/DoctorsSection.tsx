import React, { useState } from 'react';
import { Calendar, Award, CheckCircle, Clock, Stethoscope, Eye, Shield, Phone, Sparkles } from 'lucide-react';
import { DOCTORS, HOSPITAL_INFO } from '../data/hospitalData';
import { Doctor, Language } from '../types';

interface DoctorsSectionProps {
  lang: Language;
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ lang, onBookDoctor }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const isTe = lang === 'te';

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            <Stethoscope className="w-3.5 h-3.5" />
            {isTe ? 'అనుభవజ్ఞులైన వైద్య బృందం' : 'Expert Medical Specialists'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {isTe ? 'ప్రముఖ వైద్యులు & శస్త్రచికిత్స నిపుణులు' : 'Distinguished Doctors & Surgeons'}
          </h2>
          <p className="text-base text-slate-600 mt-2">
            {isTe
              ? 'ప్రతి రోగికి సమగ్ర వివరణ, కరుణతో కూడిన సంరక్షణ మరియు అత్యాధునిక శస్త్రచికిత్స నైపుణ్యాన్ని అందించే వైద్యులు.'
              : 'Dedicated doctors celebrated in over 460 patient reviews for detailed explanations, gentle care, and precision surgical outcomes.'}
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doctor) => {
            const isChief = doctor.id === 'dr-tarun';
            const isEye = doctor.id === 'dr-prasanth';

            return (
              <div
                key={doctor.id}
                className={`flex flex-col bg-slate-50/70 rounded-2xl border transition-all hover:shadow-lg ${
                  isChief ? 'border-teal-300 ring-1 ring-teal-200/50 bg-teal-50/20' : 'border-slate-200'
                }`}
              >
                {/* Doctor Image & Availability */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl bg-slate-200">
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs text-[11px] font-bold text-emerald-700 flex items-center gap-1.5 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {doctor.availability}
                  </div>
                  {isChief && (
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-300 px-3 py-1 rounded-md text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                      <Award className="w-3.5 h-3.5" />
                      {isTe ? 'ముఖ్య సర్జన్' : 'Chief Laparoscopic Surgeon'}
                    </div>
                  )}
                  {isEye && (
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-sky-300 px-3 py-1 rounded-md text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      {isTe ? 'నేత్ర నిపుణులు' : 'Senior Eye Specialist'}
                    </div>
                  )}
                </div>

                {/* Doctor Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      {doctor.experience}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {isTe ? doctor.nameTe : doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 mt-0.5">
                      {isTe ? doctor.roleTe : doctor.role}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      {doctor.qualification}
                    </p>

                    <p className="text-sm text-slate-600 mt-3 line-clamp-3">
                      {isTe ? doctor.bioTe : doctor.bio}
                    </p>

                    {/* Specializations list */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {isTe ? 'ప్రధాన చికిత్సలు:' : 'Key Focus Areas:'}
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {(isTe ? doctor.specializationsTe : doctor.specializations)
                          .slice(0, 3)
                          .map((spec, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* OPD Hours */}
                    <div className="mt-4 p-2.5 rounded-lg bg-white border border-slate-200 text-xs flex items-start gap-2">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800">
                          {isTe ? 'ఓపీడీ సమయాలు:' : 'OPD Consultation Hours:'}
                        </div>
                        <div className="text-slate-600 text-[11px] mt-0.5">
                          {isTe ? doctor.opdHoursTe : doctor.opdHours}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onBookDoctor(doctor.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isTe ? 'అపాయింట్‌మెంట్' : 'Book Consultation'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedDoctor(doctor)}
                      className="px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                    >
                      {isTe ? 'పూర్తి వివరాలు' : 'View Profile'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctor Details Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={selectedDoctor.photoUrl}
                  alt={selectedDoctor.name}
                  className="w-32 h-32 rounded-xl object-cover object-top border border-slate-200 shadow-sm shrink-0"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    {selectedDoctor.experience}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {isTe ? selectedDoctor.nameTe : selectedDoctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700">
                    {isTe ? selectedDoctor.roleTe : selectedDoctor.role}
                  </p>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    {selectedDoctor.qualification}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {isTe ? 'వైద్యుల పరిచయం' : 'Clinical Background & Approach'}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {isTe ? selectedDoctor.bioTe : selectedDoctor.bio}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {isTe ? 'ప్రత్యేక శస్త్రచికిత్సలు & నైపుణ్యాలు' : 'Clinical Procedures & Expertise'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {(isTe ? selectedDoctor.specializationsTe : selectedDoctor.specializations).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 text-xs space-y-1">
                  <div className="font-bold text-teal-900">
                    {isTe ? 'సంప్రదించే వేళలు' : 'Consultation Timings'}
                  </div>
                  <div className="text-teal-800">
                    {isTe ? selectedDoctor.opdHoursTe : selectedDoctor.opdHours}
                  </div>
                  <div className="text-teal-700 text-[11px] pt-1">
                    {isTe ? 'అత్యవసర కేసులకు 24 గంటలూ అందుబాటులో ఉంటారు' : 'Available 24/7 on-call for emergency cases and trauma triage'}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  {isTe ? 'మూసివేయి' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedDoctor.id;
                    setSelectedDoctor(null);
                    onBookDoctor(id);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
                >
                  {isTe ? 'ఈ వైద్యుడిని సంప్రదించండి' : 'Book with Doctor'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
