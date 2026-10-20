export type Language = 'en' | 'te';

export interface Doctor {
  id: string;
  name: string;
  nameTe: string;
  role: string;
  roleTe: string;
  qualification: string;
  experience: string;
  specializations: string[];
  specializationsTe: string[];
  bio: string;
  bioTe: string;
  opdHours: string;
  opdHoursTe: string;
  availability: string;
  photoUrl: string;
}

export interface Review {
  id: string;
  author: string;
  authorTe?: string;
  location?: string;
  reviewCount: number;
  photoCount?: number;
  rating: number;
  timeAgo: string;
  timeAgoTe: string;
  category: 'laparoscopic' | 'endoscopy' | 'colonoscopy' | 'stomach_pain' | 'gall_bladder' | 'dengue_fever' | 'general_surgery' | 'eye_care' | 'other';
  categoryLabel: string;
  categoryLabelTe: string;
  text: string;
  textTe?: string;
  doctorMentioned?: string;
  helpfulCount: number;
  verified: boolean;
}

export interface Specialty {
  id: string;
  title: string;
  titleTe: string;
  shortDesc: string;
  shortDescTe: string;
  iconName: string;
  reviewCount: number;
  keyProcedures: string[];
  keyProceduresTe: string[];
  longDesc: string;
  longDescTe: string;
  recoveryTime: string;
  recoveryTimeTe: string;
  benefits: string[];
  benefitsTe: string[];
}

export interface AppointmentBooking {
  id: string;
  patientName: string;
  phoneNumber: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  department: string;
  doctorId: string;
  preferredDate: string;
  timeSlot: string;
  symptoms: string;
  bookingTime: string;
}
