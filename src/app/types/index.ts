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
  name: string;
  rating: string;
  specialty: string;
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
  wantLevel: string;
  wantStyles: string[];
  wantAvailability: string[];
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
  | 'addPartner'
  | 'gettingStarted'
  | 'partnerProfile';

export type TabType = 'gyms' | 'partners' | 'progress';
