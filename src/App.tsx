/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Language, Review, AppointmentBooking } from './types';
import { HOSPITAL_INFO } from './data/hospitalData';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('dr-tarun');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [customReviews, setCustomReviews] = useState<Review[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenBookingWithDoctor = (docId: string) => {
    setSelectedDoctorId(docId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (booking: AppointmentBooking) => {
    showToast(
      lang === 'te'
        ? `టోకెన్ ${booking.id} నమోదైంది! మేము త్వరలో ${booking.phoneNumber} కు సందేశం పంపుతాము.`
        : `Token ${booking.id} confirmed for ${booking.patientName}! Confirmation prepared.`
    );
  };

  const handleSubmitReview = (newReview: Review) => {
    setCustomReviews((prev) => [newReview, ...prev]);
    showToast(
      lang === 'te'
        ? 'ధన్యవాదాలు! మీ సమీక్ష విజయవంతంగా ప్రచురించబడింది.'
        : 'Thank you! Your patient review has been published.'
    );
  };

  const handleViewReviewsForCategory = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 ${lang === 'te' ? 'font-sans' : 'font-sans'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-teal-500/50 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={setLang}
        onOpenBooking={() => {
          setSelectedDoctorId('dr-tarun');
          setIsBookingOpen(true);
        }}
      />

      {/* Hero Section */}
      <main>
        <Hero
          lang={lang}
          onOpenBooking={() => {
            setSelectedDoctorId('dr-tarun');
            setIsBookingOpen(true);
          }}
          onSelectCategory={handleViewReviewsForCategory}
        />

        {/* Clinical Specialties */}
        <SpecialtiesSection
          lang={lang}
          onOpenBooking={() => {
            setSelectedDoctorId('dr-tarun');
            setIsBookingOpen(true);
          }}
          onViewReviews={handleViewReviewsForCategory}
        />

        {/* Doctors Section */}
        <DoctorsSection
          lang={lang}
          onBookDoctor={handleOpenBookingWithDoctor}
        />

        {/* 460 Reviews Section */}
        <ReviewsSection
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenWriteReview={() => setIsWriteReviewOpen(true)}
          customReviews={customReviews}
        />

        {/* Hospital Facilities & Accessibility */}
        <FacilitiesSection lang={lang} />

        {/* Location, Directions & Contact */}
        <LocationSection lang={lang} />

        {/* FAQ Section */}
        <FAQSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenBooking={() => {
          setSelectedDoctorId('dr-tarun');
          setIsBookingOpen(true);
        }}
      />

      {/* Floating Action Buttons */}
      <FloatingActionBar
        lang={lang}
        onOpenBooking={() => {
          setSelectedDoctorId('dr-tarun');
          setIsBookingOpen(true);
        }}
      />

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        preselectedDoctorId={selectedDoctorId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        lang={lang}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
}
