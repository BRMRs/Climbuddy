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

export interface Message {
  id: string;
  text: string;
  fromSelf: boolean;
  time: string;
}

export interface Badge {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
  desc: string;
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

export type ScreenType =
  | 'home'
  | 'gymDetail'
  | 'chat'
  | 'addPartner'
  | 'gettingStarted';

export type TabType = 'gyms' | 'partners' | 'progress';
