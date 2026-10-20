import React, { useState, useMemo } from 'react';
import { Star, Search, ThumbsUp, CheckCircle, MessageSquare, Filter, Plus, Share2, Award, HeartHandshake } from 'lucide-react';
import { REVIEWS, REVIEW_CATEGORIES, HOSPITAL_INFO } from '../data/hospitalData';
import { Review, Language } from '../types';

interface ReviewsSectionProps {
  lang: Language;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenWriteReview: () => void;
  customReviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  onOpenWriteReview,
  customReviews,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('helpful');
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isTe = lang === 'te';

  // Combine standard and any newly submitted user reviews
  const allReviews = useMemo(() => {
    return [...customReviews, ...REVIEWS];
  }, [customReviews]);

  // Filtering
  const filteredReviews = useMemo(() => {
    return allReviews.filter((rev) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' ||
        rev.category === selectedCategory ||
        (selectedCategory === 'gall_bladder' && (rev.category === 'gall_bladder' || rev.category === 'laparoscopic')) ||
        (selectedCategory === 'general_surgery' && (rev.category === 'general_surgery' || rev.category === 'laparoscopic'));

      // Search match
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        rev.author.toLowerCase().includes(query) ||
        rev.text.toLowerCase().includes(query) ||
        (rev.doctorMentioned && rev.doctorMentioned.toLowerCase().includes(query)) ||
        rev.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'helpful') {
        const countA = (helpfulMap[a.id] ?? a.helpfulCount);
        const countB = (helpfulMap[b.id] ?? b.helpfulCount);
        return countB - countA;
      }
      return 0;
    });
  }, [allReviews, selectedCategory, searchTerm, sortBy, helpfulMap]);

  const handleToggleHelpful = (id: string, initialCount: number) => {
    if (userVoted[id]) return;
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  const handleShareReview = (review: Review) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`"${review.text}" - ${review.author} at Madala Multi-Speciality Hospital, Nellore`);
      setCopiedId(review.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Rating Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Rating score big display */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-700/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-white flex items-center gap-3">
                5.0
                <span className="text-xl font-medium text-slate-400">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 my-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-base font-bold text-slate-200">
                460 {isTe ? 'ధృవీకరించబడిన గూగుల్ సమీక్షలు' : 'Verified Google Reviews'}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isTe
                  ? 'నెల్లూరు మరియు చుట్టుపక్కల ప్రాంతాల రోగుల సంపూర్ణ సంతృప్తి.'
                  : '100% positive patient experiences across Nellore and Andhra Pradesh.'}
              </p>
            </div>

            {/* Quick Rating Breakdown & Trust Badges */}
            <div className="lg:col-span-5 space-y-3">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-16 font-semibold text-slate-300">5 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[99%]" />
                  </div>
                  <span className="w-10 text-right font-mono text-slate-400">99%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 font-semibold text-slate-300">4 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400/80 rounded-full w-[1%]" />
                  </div>
                  <span className="w-10 text-right font-mono text-slate-400">1%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 font-semibold text-slate-300">1-3 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-slate-700 rounded-full w-[0%]" />
                  </div>
                  <span className="w-10 text-right font-mono text-slate-400">0%</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  {isTe ? 'నిజమైన రోగుల అనుభవాలు' : 'Genuine Treated Patients'}
                </span>
                <span className="flex items-center gap-1.5 text-teal-400">
                  <Award className="w-4 h-4" />
                  {isTe ? 'ఉత్తమ లాపరోస్కోపీ హాస్పిటల్' : 'Top Rated Laparoscopy in Pogathota'}
                </span>
              </div>
            </div>

            {/* Write a Review Button */}
            <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-end">
              <button
                type="button"
                onClick={onOpenWriteReview}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{isTe ? 'సమీక్షను రాయండి' : 'Write a Patient Review'}</span>
              </button>
              <div className="text-[11px] text-slate-400 mt-2 text-center lg:text-right">
                {isTe ? 'మీ అనుభవాన్ని పంచుకోండి' : 'Share your recovery feedback'}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Categories Tabs */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isTe ? 'చికిత్సా విభాగం వారీగా సమీక్షలు:' : 'Filter Reviews by Specialty & Procedure:'}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isTe ? 'డాక్టర్, సమస్య లేదా పేరు వెతకండి...' : 'Search doctor, surgery, patient...'}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {REVIEW_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{isTe ? cat.labelTe : cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-teal-900 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              {isTe ? 'ఎలాంటి సమీక్షలు కనుగొనబడలేదు' : 'No patient reviews found matching your search.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSelectCategory('all');
              }}
              className="mt-3 text-xs font-bold text-teal-700 hover:underline"
            >
              {isTe ? 'అన్ని 460 సమీక్షలను చూపించు' : 'Reset filters and view all reviews'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => {
              const isExpanded = expandedReviews[rev.id] || false;
              const hasLongText = rev.text.length > 200;
              const displayText = !hasLongText || isExpanded ? rev.text : `${rev.text.slice(0, 190)}...`;
              const currentHelpful = helpfulMap[rev.id] ?? rev.helpfulCount;
              const isVoted = userVoted[rev.id] || false;

              // Extract initials
              const initials = rev.author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: User avatar, author, time, rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {initials}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-tight">
                            {isTe && rev.authorTe ? rev.authorTe : rev.author}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            {rev.location && (
                              <>
                                <span>{rev.location}</span>
                                <span>·</span>
                              </>
                            )}
                            <span>{rev.reviewCount} {isTe ? 'సమీక్ష' : 'review'}</span>
                            {rev.photoCount && (
                              <>
                                <span>·</span>
                                <span>{rev.photoCount} photos</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Metadata line: category label & time ago */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-100">
                      <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-sm">
                        {isTe ? rev.categoryLabelTe : rev.categoryLabel}
                      </span>
                      <span>·</span>
                      <span>{isTe ? rev.timeAgoTe : rev.timeAgo}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed whitespace-pre-line">
                      "{displayText}"
                    </p>

                    {hasLongText && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(rev.id)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 mt-1 cursor-pointer"
                      >
                        {isExpanded ? (isTe ? 'తక్కువ చూడండి' : 'Show less') : (isTe ? 'పూర్తిగా చదవండి' : 'Read more')}
                      </button>
                    )}

                    {/* Doctor Mention Highlight */}
                    {rev.doctorMentioned && (
                      <div className="mt-3 text-[11px] font-semibold text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-1.5">
                        <HeartHandshake className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>
                          {isTe ? 'సంప్రదించిన వైద్యులు:' : 'Treated by:'}{' '}
                          <span className="font-bold text-slate-800">{rev.doctorMentioned}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer: Helpful & Share */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => handleToggleHelpful(rev.id, rev.helpfulCount)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                        isVoted
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-teal-700 text-teal-700' : ''}`} />
                      <span>{isTe ? 'సహాయకరం' : 'Helpful'} ({currentHelpful})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareReview(rev)}
                      className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      title="Share review"
                    >
                      {copiedId === rev.id ? (
                        <span className="text-[10px] font-bold text-teal-700">Copied!</span>
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
