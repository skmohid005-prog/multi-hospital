import React, { useState } from 'react';
import { X, Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { Review, Language } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSubmitReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSubmitReview,
}) => {
  const isTe = lang === 'te';

  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<Review['category']>('laparoscopic');
  const [doctorMentioned, setDoctorMentioned] = useState('Dr. Madala Venkata Tarun');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMsg(isTe ? 'దయచేసి మీ పేరు రాయండి' : 'Please enter your name');
      return;
    }
    if (!text.trim() || text.trim().length < 10) {
      setErrorMsg(isTe ? 'దయచేసి కనీసం ఒక వాక్యం అనుభవాన్ని రాయండి' : 'Please share a brief description of your hospital experience');
      return;
    }

    const categoryLabels: Record<string, { en: string; te: string }> = {
      laparoscopic: { en: 'Laparoscopic Surgery', te: 'లాపరోస్కోపిక్ సర్జరీ' },
      endoscopy: { en: 'Endoscopy & GI', te: 'ఎండోస్కోపీ' },
      colonoscopy: { en: 'Colonoscopy', te: 'కొలొనోస్కోపీ' },
      stomach_pain: { en: 'Stomach Pain Treatment', te: 'కడుపు నొప్పి చికిత్స' },
      gall_bladder: { en: 'Gall Bladder Stone', te: 'పిత్తాశయ రాళ్లు' },
      dengue_fever: { en: 'Dengue Fever Care', te: 'డెంగ్యూ జ్వరం' },
      general_surgery: { en: 'General Surgery', te: 'జనరల్ సర్జరీ' },
      eye_care: { en: 'Ophthalmology / Eye Care', te: 'నేత్ర వైద్యం' },
      other: { en: 'Patient Care', te: 'రోగుల సంరక్షణ' },
    };

    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Nellore',
      reviewCount: 1,
      rating,
      timeAgo: 'Just now',
      timeAgoTe: 'ఇప్పుడే',
      category,
      categoryLabel: categoryLabels[category].en,
      categoryLabelTe: categoryLabels[category].te,
      text: text.trim(),
      doctorMentioned: doctorMentioned.trim(),
      helpfulCount: 1,
      verified: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Star className="w-10 h-10 fill-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {isTe ? 'మీ సమీక్షకు ధన్యవాదాలు!' : 'Thank You for Your Review!'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTe
                ? 'మీ అభిప్రాయం ఇతర రోగులకు సరైన నిర్ణయం తీసుకోవడంలో ఎంతో సహాయపడుతుంది.'
                : 'Your feedback has been published and added to our community testimonials.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                5.0 ★ Google Community
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {isTe ? 'మీ చికిత్సా అనుభవాన్ని పంచుకోండి' : 'Write a Patient Review'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isTe
                  ? 'మదాల హాస్పిటల్ లో డాక్టర్ తరుణ్ లేదా డాక్టర్ ప్రశాంత్ గారి చికిత్స గురించి తెలపండి.'
                  : 'Share how our surgical or medical team treated you and your family.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {isTe ? 'మీ రేటింగ్ ఎంచుకోండి:' : 'Select Star Rating:'}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700">
                    {rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Patient Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'మీ పేరు *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'ప్రాంతం / ఊరు' : 'Town / Area (e.g. Sangam, Nellore)'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pogathota, Sangam"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Treatment Category & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'చికిత్స విభాగం' : 'Treatment Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="laparoscopic">Laparoscopic Surgery</option>
                    <option value="gall_bladder">Gall Bladder Stone</option>
                    <option value="endoscopy">Endoscopy</option>
                    <option value="colonoscopy">Colonoscopy</option>
                    <option value="stomach_pain">Stomach Pain & GI</option>
                    <option value="eye_care">Eye Care (Dr. Prasanth)</option>
                    <option value="dengue_fever">Dengue Fever Care</option>
                    <option value="general_surgery">General Surgery / Fistula</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTe ? 'చికిత్స చేసిన వైద్యులు' : 'Treated By Doctor'}
                  </label>
                  <select
                    value={doctorMentioned}
                    onChange={(e) => setDoctorMentioned(e.target.value)}
                    className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Dr. Madala Venkata Tarun">Dr. Madala Venkata Tarun</option>
                    <option value="Dr. Prasanth">Dr. Prasanth</option>
                    <option value="Dr. Pradeep & Inpatient Team">Dr. Pradeep & Inpatient Team</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isTe ? 'మీ అనుభవం *' : 'Your Review / Comments *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={isTe ? 'సర్జరీ, సంరక్షణ, డాక్టర్ వివరణ గురించి రాయండి...' : 'Tell others about doctor explanation, surgery smoothness, cleanliness...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors"
                >
                  {isTe ? 'సమీక్షను పోస్ట్ చేయండి' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
