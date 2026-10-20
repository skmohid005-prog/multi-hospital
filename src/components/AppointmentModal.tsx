import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, ShieldAlert, Sparkles, Building, ArrowRight } from 'lucide-react';
import { DOCTORS, SPECIALTIES, HOSPITAL_INFO } from '../data/hospitalData';
import { AppointmentBooking, Language } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedDoctorId?: string;
  onBookingSuccess: (booking: AppointmentBooking) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedDoctorId,
  onBookingSuccess,
}) => {
  const isTe = lang === 'te';

  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    department: 'laparoscopic',
    doctorId: preselectedDoctorId || 'dr-tarun',
    preferredDate: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    symptoms: '',
  });

  const [submittedBooking, setSubmittedBooking] = useState<AppointmentBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim()) {
      setErrorMsg(isTe ? 'దయచేసి రోగి పేరు నమోదు చేయండి' : 'Please enter patient name');
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg(isTe ? 'దయచేసి సరైన 10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    const newBooking: AppointmentBooking = {
      id: `MADALA-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName: formData.patientName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      age: formData.age || '35',
      gender: formData.gender,
      department: formData.department,
      doctorId: formData.doctorId,
      preferredDate: formData.preferredDate,
      timeSlot: formData.timeSlot,
      symptoms: formData.symptoms.trim() || 'General consultation',
      bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubmittedBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    onClose();
  };

  const selectedDoctorObj = DOCTORS.find((d) => d.id === (submittedBooking?.doctorId || formData.doctorId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedBooking ? (
          /* Confirmation Ticket View */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {isTe ? 'అపాయింట్‌మెంట్ ధృవీకరించబడింది' : 'Appointment Request Confirmed'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {isTe ? 'కన్సల్టేషన్ వివరాలు' : 'Consultation Scheduled'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTe
                  ? 'మా హాస్పిటల్ డెస్క్ నుండి మీకు త్వరలో SMS / WhatsApp ద్వారా సమాచారం అందుతుంది.'
                  : 'A confirmation SMS has been prepared. Our front desk will reserve your consultation token.'}
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Token Reference</span>
                  <div className="font-mono font-bold text-teal-800 text-sm">{submittedBooking.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Status</span>
                  <div className="text-xs font-bold text-emerald-600">Reserved (Priority)</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Patient Name:</span>
                  <div className="font-bold text-slate-800">{submittedBooking.patientName}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Contact:</span>
                  <div className="font-bold text-slate-800">{submittedBooking.phoneNumber}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Consultant Doctor:</span>
                  <div className="font-bold text-slate-800">
                    {isTe ? selectedDoctorObj?.nameTe : selectedDoctorObj?.name}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Date & Slot:</span>
                  <div className="font-bold text-slate-800">
                    {submittedBooking.preferredDate} ({submittedBooking.timeSlot.split(' ')[0]})
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Beside Amma Furniture Mall, Gandhinagar, Pogathota, Nellore - 524001</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${HOSPITAL_INFO.phoneTel}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>{isTe ? 'హాస్పిటల్ కు కాల్ చేయండి' : 'Call Desk: 073860 37003'}</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors"
              >
                {isTe ? 'పూర్తయింది' : 'Done & Return'}
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                <Calendar className="w-3.5 h-3.5" />
                {isTe ? 'ఆన్‌లైన్ కన్సల్టేషన్ బుకింగ్' : 'Online Appointment Booking'}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {isTe ? 'వైద్యుని అపాయింట్‌మెంట్ తీసుకోండి' : 'Book a Doctor Consultation'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isTe
                  ? 'డాక్టర్ తరుణ్ లేదా డాక్టర్ ప్రశాంత్ గారిని సంప్రదించడానికి వివరాలు నమోదు చేయండి.'
                  : 'Fast-track OPD registration with zero waiting time at Pogathota, Nellore.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isTe ? 'వైద్యులను ఎంచుకోండి *' : 'Select Specialist / Doctor *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DOCTORS.slice(0, 2).map((doc) => {
                    const isSelected = formData.doctorId === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, doctorId: doc.id })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/70 ring-1 ring-teal-500'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <img
                          src={doc.photoUrl}
                          alt={doc.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {isTe ? doc.nameTe : doc.name}
                          </div>
                          <div className="text-[10px] text-teal-700 truncate">
                            {isTe ? doc.roleTe.split(',')[0] : doc.role.split(',')[0]}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'రోగి పేరు *' : 'Patient Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.patientName}
                      onChange={(e) => {
                        setErrorMsg('');
                        setFormData({ ...formData, patientName: e.target.value });
                      }}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'ఫోన్ నంబర్ *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => {
                        setErrorMsg('');
                        setFormData({ ...formData, phoneNumber: e.target.value });
                      }}
                      placeholder="e.g. 09876543210"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Age, Gender & Department */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'వయస్సు' : 'Age'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g. 38"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'లింగం' : 'Gender'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="male">{isTe ? 'పురుషుడు' : 'Male'}</option>
                    <option value="female">{isTe ? 'మహిళ' : 'Female'}</option>
                    <option value="other">{isTe ? 'ఇతర' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'విభాగం' : 'Department'}
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="laparoscopic">Laparoscopic Surgery</option>
                    <option value="endoscopy">Endoscopy & Colonoscopy</option>
                    <option value="stomach_pain">Stomach Pain & GI</option>
                    <option value="eye_care">Eye Care (Dr. Prasanth)</option>
                    <option value="dengue_fever">Dengue & Fever Ward</option>
                    <option value="general_surgery">General & Fistula</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'తేదీ' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'సమయం స్లాట్' : 'Time Slot'}
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Evening (6:00 PM - 8:30 PM)">Evening (6:00 PM - 8:30 PM)</option>
                    <option value="Emergency (Immediate Walk-in 24/7)">Emergency (Immediate Walk-in 24/7)</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Chief Complaint */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isTe ? 'సమస్య లేదా లక్షణాలు (ఐచ్ఛికం)' : 'Symptoms or Health Concern (Optional)'}
                </label>
                <textarea
                  rows={2}
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  placeholder={isTe ? 'ఉదా: కడుపు నొప్పి, పిత్తాశయ రాళ్లు, కంటి సమస్య...' : 'e.g., Stomach pain since 2 days, gall bladder stone scan reports...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Emergency note */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  {isTe
                    ? 'తీవ్ర అత్యవసర కేసుల కొరకు ముందస్తు అపాయింట్‌మెంట్ అవసరం లేదు, వెంటనే 073860 37003 కు కాల్ చేసి హాస్పిటల్ కు రావచ్చు.'
                    : 'For severe abdominal pain or acute trauma, you do NOT need an appointment. Walk straight into our 24/7 Emergency Casualty.'}
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-md shadow-teal-600/30 transition-all hover:scale-[1.01]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isTe ? 'అపాయింట్‌మెంట్ ఖరారు చేయండి' : 'Confirm Appointment Booking'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
