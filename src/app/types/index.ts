export interface Gym {
  id: string;
  name: string;
  rating: number;
  distance: string;
  price: string;
  tags: string[];
  image: string;
  verified: boolean;
  amenities: string[];
  address: string;
  photos: string[];
}

export interface Coach {
  id: string;
  name: string;
  rating: string;
  specialty: string;
  frequentGyms: string[];
  styles: string[];
  qualifications: { label: string; score: number }[];
  bio: string;
  courseIds: string[];
  price?: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  level: string;
  hopePartner: string;
  image: string;
  gym: string;
  trustScore: number;
  verified: boolean;
  age: number;
  climbingSince: string;
}

export interface MeetingProposal {
  gym: string;
  gymId: string;
  date: string;
  slot: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Message {
  id: string;
  text: string;
  fromSelf: boolean;
  time: string;
  meetingProposal?: MeetingProposal;
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
  earnedDate?: string;
  desc: string;
}

export interface Route {
  id: string;
  name: string;
  grade: string;
  color: string;
  bgColor: string;
  type: 'Boulder' | 'Lead' | 'Top Rope';
  setter: string;
  dateSet: string;
  holds: string;
}

export interface SlotBooker {
  name: string;
  image: string;
  level: string;
}

export interface SessionLog {
  date: string;
  routes: number;
  level: string;
  duration: number;
  heartRate: number;
  calories: number;
  notes: string;
  videoUrl?: string;
  fatigueLevel?: number;
}

export interface PartnerRating {
  reliability: number;    // 1–5 准时可靠
  safety: number;         // 1–5 安全意识
  encouragement: number;  // 1–5 鼓励氛围
  skillMatch: number;     // 1–5 技术匹配
  communication: number;  // 1–5 沟通顺畅
  totalReviews: number;
  creditScore: number;    // 0–100
}

export interface MyPreferences {
  myLevel: string;
  myStyles: string[];
  myAvailability: string[];
  myGym: string;
  myGender?: string;
  wantLevel: string;
  wantStyles: string[];
  wantAvailability: string[];
  wantGender?: string[];
}

export interface ChatHistoryItem {
  partnerId: string;
  lastMessage: string;
  time: string;
  unread: number;
  sessionStatus?: 'upcoming' | 'completed_unreviewed' | 'completed_reviewed';
  sessionDate?: string;
  sessionGym?: string;
  sessionSlot?: string;
}

export type ScreenType =
  | 'home'
  | 'gymDetail'
  | 'chat'
  | 'coachChat'
  | 'addPartner'
  | 'gettingStarted'
  | 'partnerProfile'
  | 'courseDetail'
  | 'coachDetail'
  | 'aiCoachChat';

export type TabType = 'gyms' | 'partners' | 'progress' | 'boost';

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  type: 'free' | 'paid';
  price?: number;
  description: string;
  category: string;
  coachId?: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  type: 'booking' | 'social' | 'personal' | 'coach';
  gymId?: string;
  gymName?: string;
  partnerName?: string;
  coachName?: string;
  slot?: string;
  note?: string;
  isExpired: boolean;
  isReviewed: boolean;
}

export interface VenueReview {
  id: string;
  gymId: string;
  authorName: string;
  date: string;
  environment: number;
  routeDesign: number;
  equipment: number;
  value: number;
  text?: string;
}

export interface CoachReview {
  id: string;
  coachId: string;
  authorName: string;
  date: string;
  professionalism: number;
  teachingSkill: number;
  communication: number;
  valueForMoney: number;
  text?: string;
}

export interface PartnerReview {
  id: string;
  partnerId: string;
  partnerName: string;
  authorName: string;
  date: string;
  reliability: number;
  safety: number;
  encouragement: number;
  skillMatch: number;
  communication: number;
  text?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  duration: string;
  type: 'free' | 'paid' | 'coach';
  courseId?: string;
  completed: boolean;
}

export interface CoachCourse {
  id: string;
  coachId: string;
  courseId: string;
}
