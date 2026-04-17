import { Gym, Partner, Coach, Badge, Route, SlotBooker, PartnerRating, MyPreferences, ChatHistoryItem } from '../types';

export const PORTRAITS = {
  emma:  "https://images.unsplash.com/photo-1546872041-03da29ccc3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  alice: "https://images.unsplash.com/photo-1582515572488-8b9c7da08e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  bob:   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  chen:  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  maya:  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
};

export const GYMS_DATA: Gym[] = [
  {
    id: 'g1',
    name: 'Peak Bouldering',
    rating: 4.8,
    distance: '1.2 km',
    price: '$25/day',
    tags: ['Beginner Friendly', 'Auto-belay'],
    image: "https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    verified: true,
    address: '12 Summit St, Block B',
    amenities: ['Showers', 'Lockers', 'Cafe', 'Gear Rental', 'Yoga Room'],
    photos: [
      "https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1633859023075-fada2199a42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1696105538786-52c0636202a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    id: 'g2',
    name: 'The Crux Gym',
    rating: 4.2,
    distance: '2.5 km',
    price: '$20/day',
    tags: ['Bouldering', 'Yoga'],
    image: "https://images.unsplash.com/photo-1696105538786-52c0636202a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    verified: true,
    address: '88 Cliff Ave, Level 3',
    amenities: ['Lockers', 'Gear Rental', 'Yoga Room'],
    photos: [
      "https://images.unsplash.com/photo-1696105538786-52c0636202a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    id: 'g3',
    name: 'Iron Walls',
    rating: 4.5,
    distance: '3.0 km',
    price: '$28/day',
    tags: ['Lead Climbing', 'Competition'],
    image: "https://images.unsplash.com/photo-1633859023075-fada2199a42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    verified: false,
    address: '5 Granite Rd, Floor 1',
    amenities: ['Showers', 'Lockers', 'Pro Shop'],
    photos: [
      "https://images.unsplash.com/photo-1633859023075-fada2199a42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
];

export const GYM_COACHES: Record<string, Coach[]> = {
  g1: [
    { name: 'Bob',  rating: '4.9', specialty: 'Footwork' },
    { name: 'Jack', rating: '4.7', specialty: 'Lead' },
    { name: 'John', rating: '4.8', specialty: 'Bouldering' },
  ],
  g2: [
    { name: 'Sara', rating: '4.6', specialty: 'Yoga + Climb' },
    { name: 'Liam', rating: '4.5', specialty: 'Beginner' },
  ],
  g3: [
    { name: 'Kai',  rating: '4.9', specialty: 'Competition' },
    { name: 'Mia',  rating: '4.8', specialty: 'Lead' },
    { name: 'Rex',  rating: '4.7', specialty: 'Strength' },
  ],
};

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'p1', name: 'Alice', level: 'V3–V4',
    hopePartner: 'Looking for a chill regular partner. Safety first, vibes second 🙌',
    image: PORTRAITS.alice, gym: 'Peak Bouldering',
    trustScore: 98, verified: true, age: 24, climbingSince: '2022',
  },
  {
    id: 'p2', name: 'Bob', level: 'V1–V2',
    hopePartner: 'Total beginner, need someone patient to teach me the basics!',
    image: PORTRAITS.bob, gym: 'The Crux Gym',
    trustScore: 91, verified: true, age: 28, climbingSince: '2025',
  },
  {
    id: 'p3', name: 'Chen', level: 'V5–V6',
    hopePartner: 'Looking to push my limit. Must be serious about projecting.',
    image: PORTRAITS.chen, gym: 'Iron Walls',
    trustScore: 95, verified: true, age: 22, climbingSince: '2020',
  },
  {
    id: 'p4', name: 'Maya', level: 'V2–V3',
    hopePartner: 'Weekend warrior. Prefer mornings at Peak Bouldering 🧗‍♀️',
    image: PORTRAITS.maya, gym: 'Peak Bouldering',
    trustScore: 87, verified: false, age: 26, climbingSince: '2023',
  },
];

export const GYM_ROUTES: Record<string, Route[]> = {
  g1: [
    { id: 'r1', name: 'Blue Slab',     grade: 'V0', color: 'text-sky-700',    bgColor: 'bg-sky-100',    type: 'Boulder',  setter: 'Bob',  dateSet: 'Apr 10', holds: 'Crimps + Slopers' },
    { id: 'r2', name: 'Yellow Arête',  grade: 'V1', color: 'text-amber-700',  bgColor: 'bg-amber-100',  type: 'Boulder',  setter: 'Bob',  dateSet: 'Apr 10', holds: 'Jugs + Side-pulls' },
    { id: 'r3', name: 'Green Overhang',grade: 'V2', color: 'text-green-700',  bgColor: 'bg-green-100',  type: 'Boulder',  setter: 'Jack', dateSet: 'Apr 8',  holds: 'Pinches + Slopers' },
    { id: 'r4', name: 'Red Dyno',      grade: 'V3', color: 'text-red-700',    bgColor: 'bg-red-100',    type: 'Boulder',  setter: 'Jack', dateSet: 'Apr 8',  holds: 'Jugs + Dynamic' },
    { id: 'r5', name: 'Purple Cave',   grade: 'V4', color: 'text-purple-700', bgColor: 'bg-purple-100', type: 'Boulder',  setter: 'John', dateSet: 'Apr 5',  holds: 'Pockets + Crimps' },
    { id: 'r6', name: 'Black Dihedral',grade: 'V5', color: 'text-slate-700',  bgColor: 'bg-slate-100',  type: 'Boulder',  setter: 'John', dateSet: 'Mar 30', holds: 'Compression' },
  ],
  g2: [
    { id: 'r7', name: 'Morning Flow',  grade: 'V0', color: 'text-teal-700',   bgColor: 'bg-teal-100',   type: 'Boulder',  setter: 'Sara', dateSet: 'Apr 12', holds: 'Jugs' },
    { id: 'r8', name: 'Granite Slab',  grade: 'V2', color: 'text-orange-700', bgColor: 'bg-orange-100', type: 'Top Rope', setter: 'Liam', dateSet: 'Apr 9',  holds: 'Friction + Smears' },
    { id: 'r9', name: 'Yoga Traverse', grade: 'V1', color: 'text-pink-700',   bgColor: 'bg-pink-100',   type: 'Boulder',  setter: 'Sara', dateSet: 'Apr 7',  holds: 'Balance + Crimps' },
  ],
  g3: [
    { id: 'ra', name: 'Crimp City',    grade: '5.10a', color: 'text-sky-700',    bgColor: 'bg-sky-100',    type: 'Lead',  setter: 'Kai', dateSet: 'Apr 11', holds: 'Crimps' },
    { id: 'rb', name: 'Pump Factory',  grade: '5.11b', color: 'text-orange-700', bgColor: 'bg-orange-100', type: 'Lead',  setter: 'Mia', dateSet: 'Apr 9',  holds: 'Jugs + Jugs' },
    { id: 'rc', name: 'Competition A', grade: '5.12c', color: 'text-red-700',    bgColor: 'bg-red-100',    type: 'Lead',  setter: 'Rex', dateSet: 'Apr 6',  holds: 'Pockets + Crimps' },
  ],
};

export const TIME_SLOTS = ['9:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–17:00', '17:00–19:00', '19:00–21:00'];

export const SLOT_BOOKERS: Record<string, SlotBooker[]> = {
  '9:00–11:00':  [
    { name: 'Alice', image: "https://images.unsplash.com/photo-1582515572488-8b9c7da08e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V3–V4' },
    { name: 'Bob',   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V1–V2' },
  ],
  '11:00–13:00': [
    { name: 'Maya',  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V2–V3' },
  ],
  '15:00–17:00': [
    { name: 'Chen',  image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V5–V6' },
    { name: 'Alice', image: "https://images.unsplash.com/photo-1582515572488-8b9c7da08e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V3–V4' },
    { name: 'Bob',   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V1–V2' },
  ],
  '17:00–19:00': [
    { name: 'Maya',  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V2–V3' },
    { name: 'Chen',  image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", level: 'V5–V6' },
  ],
};

export const PARTNER_RATINGS: Record<string, PartnerRating> = {
  p1: { reliability: 4.8, safety: 4.9, encouragement: 4.7, skillMatch: 4.5, communication: 4.6, totalReviews: 12, creditScore: 96 },
  p2: { reliability: 3.5, safety: 4.2, encouragement: 4.8, skillMatch: 3.0, communication: 4.0, totalReviews: 5,  creditScore: 78 },
  p3: { reliability: 4.5, safety: 4.8, encouragement: 3.8, skillMatch: 4.9, communication: 4.2, totalReviews: 20, creditScore: 93 },
  p4: { reliability: 4.0, safety: 4.5, encouragement: 4.6, skillMatch: 4.2, communication: 4.4, totalReviews: 8,  creditScore: 85 },
};

// Emma's own rating as seen by past partners
export const MY_RATINGS: PartnerRating = {
  reliability: 4.2, safety: 4.5, encouragement: 4.0,
  skillMatch: 3.8, communication: 4.6,
  totalReviews: 3, creditScore: 82,
};

export const MY_PREFERENCES: MyPreferences = {
  myLevel: 'V2–V3',
  myStyles: ['Boulder', 'Top Rope'],
  myAvailability: ['Weekday mornings', 'Weekend afternoons'],
  myGym: 'Peak Bouldering',
  wantLevel: 'V1–V4',
  wantStyles: ['Boulder'],
  wantAvailability: ['Weekends'],
};

export const MOCK_REVIEWS: Record<string, { from: string; text: string; date: string }[]> = {
  p1: [
    { from: 'Maya', text: 'Alice is super reliable and always on time. Great energy at the wall!', date: 'Apr 5' },
    { from: 'Bob',  text: 'Really encouraging, helped me push through my first V4 attempt.', date: 'Mar 28' },
    { from: 'Chen', text: 'Solid safety awareness, always double-checks. Would climb again!', date: 'Mar 15' },
  ],
  p2: [
    { from: 'Alice', text: 'Bob is enthusiastic! Still learning but super fun to climb with.', date: 'Apr 10' },
  ],
  p3: [
    { from: 'Maya', text: 'Chen is an absolute beast on the wall. Very focused and serious.', date: 'Apr 8' },
    { from: 'Alice', text: 'Pushed me harder than I expected — in a good way! Very skilled.', date: 'Apr 2' },
  ],
  p4: [
    { from: 'Bob',  text: 'Maya is so positive and fun! Morning sessions with her are 10/10.', date: 'Apr 12' },
    { from: 'Chen', text: 'Good footwork technique. Always keeps a great vibe at the gym.', date: 'Apr 1' },
  ],
};

export const CHAT_HISTORY: ChatHistoryItem[] = [
  {
    partnerId: 'p1', lastMessage: 'See you Saturday! 🧗', time: 'Yesterday', unread: 0,
    sessionStatus: 'upcoming', sessionDate: 'Apr 19',
    sessionGym: 'Peak Bouldering', sessionSlot: '11:00–13:00',
  },
  {
    partnerId: 'p3', lastMessage: "Let's project V5 next time!", time: 'Mon', unread: 0,
    sessionStatus: 'completed_unreviewed', sessionDate: 'Apr 14',
    sessionGym: 'Iron Walls', sessionSlot: '15:00–17:00',
  },
];

export const BADGES: Badge[] = [
  { id: 'b1', label: 'First Climb!',  icon: '🧗', unlocked: true,  desc: 'Completed your first climb.' },
  { id: 'b2', label: 'V1 Sent',       icon: '✅', unlocked: true,  desc: 'Sent your first V1 route.' },
  { id: 'b3', label: 'Social Bee',    icon: '🤝', unlocked: true,  desc: 'Matched with a partner.' },
  { id: 'b4', label: '5 Sessions',    icon: '🔥', unlocked: false, desc: 'Log 5 climbing sessions.' },
  { id: 'b5', label: 'V3 Crusher',    icon: '💥', unlocked: false, desc: 'Send a V3 route.' },
  { id: 'b6', label: 'Video Star',    icon: '🎬', unlocked: false, desc: 'Upload a climbing video.' },
];
