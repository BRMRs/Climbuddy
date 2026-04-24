import { Gym, Partner, Coach, Badge, Route, SlotBooker, PartnerRating, MyPreferences, ChatHistoryItem, Course, CalendarEvent, VenueReview, DailyTask, SessionLog, CoachCourse, Message } from '../types';

export const PORTRAITS = {
  emma:  "https://images.unsplash.com/photo-1546872041-03da29ccc3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  alice: "https://images.unsplash.com/photo-1582515572488-8b9c7da08e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  bob:   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  chen:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
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
    {
      id: 'c1', name: 'Bob', rating: '5.0', specialty: 'Footwork Expert', price: '$75/hr',
      image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g1', 'g2'],
      styles: ['Bouldering', 'Sport Climbing', 'Technique'],
      qualifications: [
        { label: 'Technique', score: 9 },
        { label: 'Safety', score: 8 },
        { label: 'Communication', score: 9 },
        { label: 'Patience', score: 10 },
        { label: 'Experience', score: 8 },
      ],
      bio: 'Certified climbing instructor with 8+ years of teaching experience. Specializes in helping beginners build solid fundamentals.',
      courseIds: ['course1', 'course3'],
    },
    {
      id: 'c2', name: 'Jack', rating: '4.7', specialty: 'Lead Climbing', price: '$70/hr',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g1', 'g3'],
      styles: ['Lead Climbing', 'Trad', 'Mountaineering'],
      qualifications: [
        { label: 'Technique', score: 9 },
        { label: 'Safety', score: 9 },
        { label: 'Communication', score: 7 },
        { label: 'Patience', score: 7 },
        { label: 'Experience', score: 9 },
      ],
      bio: 'Professional climbing coach focused on advanced lead techniques and mental preparation for projecting.',
      courseIds: ['course2'],
    },
    {
      id: 'c3', name: 'John', rating: '4.8', specialty: 'Bouldering', price: '$65/hr',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g1'],
      styles: ['Bouldering', 'Power', 'Campus Board'],
      qualifications: [
        { label: 'Technique', score: 8 },
        { label: 'Safety', score: 7 },
        { label: 'Communication', score: 8 },
        { label: 'Patience', score: 8 },
        { label: 'Experience', score: 7 },
      ],
      bio: 'Former competition climber now coaching bouldering technique and finger strength training.',
      courseIds: [],
    },
  ],
  g2: [
    {
      id: 'c4', name: 'Sara', rating: '4.6', specialty: 'Yoga + Climb', price: '$60/hr',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g2'],
      styles: ['Yoga', 'Mindfulness', 'Beginner'],
      qualifications: [
        { label: 'Technique', score: 6 },
        { label: 'Safety', score: 8 },
        { label: 'Communication', score: 9 },
        { label: 'Patience', score: 10 },
        { label: 'Experience', score: 6 },
      ],
      bio: 'Certified yoga instructor and climbing coach. Helps climbers improve flexibility and mental focus.',
      courseIds: [],
    },
    {
      id: 'c5', name: 'Liam', rating: '4.5', specialty: 'Beginner Expert', price: '$55/hr',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g2', 'g1'],
      styles: ['Beginner', 'Technique', 'Foundation'],
      qualifications: [
        { label: 'Technique', score: 7 },
        { label: 'Safety', score: 9 },
        { label: 'Communication', score: 9 },
        { label: 'Patience', score: 10 },
        { label: 'Experience', score: 6 },
      ],
      bio: 'Patient instructor specializing in teaching new climbers from zero to their first 5.10.',
      courseIds: ['course1'],
    },
  ],
  g3: [
    {
      id: 'c6', name: 'Kai', rating: '4.9', specialty: 'Competition', price: '$90/hr',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g3', 'g1'],
      styles: ['Competition', 'Power', 'Bouldering'],
      qualifications: [
        { label: 'Technique', score: 10 },
        { label: 'Safety', score: 7 },
        { label: 'Communication', score: 8 },
        { label: 'Patience', score: 6 },
        { label: 'Experience', score: 9 },
      ],
      bio: 'Former national competition team member. Coaches competitive climbing and projecting techniques.',
      courseIds: ['course2', 'course3'],
    },
    {
      id: 'c7', name: 'Mia', rating: '4.8', specialty: 'Lead Climbing', price: '$80/hr',
      image: 'https://images.unsplash.com/photo-1531727991582-cfd25ce79613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g3'],
      styles: ['Lead Climbing', 'Endurance', 'Route Reading'],
      qualifications: [
        { label: 'Technique', score: 9 },
        { label: 'Safety', score: 8 },
        { label: 'Communication', score: 8 },
        { label: 'Patience', score: 7 },
        { label: 'Experience', score: 8 },
      ],
      bio: 'Lead climbing specialist with experience in both indoor and outdoor settings. Focus on endurance training.',
      courseIds: ['course2'],
    },
    {
      id: 'c8', name: 'Rex', rating: '4.7', specialty: 'Strength', price: '$70/hr',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      frequentGyms: ['g3'],
      styles: ['Strength Training', 'Fingerboard', 'Conditioning'],
      qualifications: [
        { label: 'Technique', score: 7 },
        { label: 'Safety', score: 8 },
        { label: 'Communication', score: 7 },
        { label: 'Patience', score: 8 },
        { label: 'Experience', score: 8 },
      ],
      bio: 'Strength and conditioning specialist. Helps climbers build power and prevent injuries.',
      courseIds: ['course3'],
    },
  ],
};

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'p1', name: 'Alice', level: 'V3–V4',
    hopePartner: 'Looking for a chill regular partner. Safety first, vibes second 🙌',
    image: PORTRAITS.alice, gym: 'Peak Bouldering',
    trustScore: 98, verified: true, age: 24, climbingSince: '2022',
    styles: ['Boulder', 'Top Rope'],
  },
  {
    id: 'p2', name: 'Bob', level: 'V1–V2',
    hopePartner: 'Total beginner, need someone patient to teach me the basics!',
    image: PORTRAITS.bob, gym: 'The Crux Gym',
    trustScore: 91, verified: true, age: 28, climbingSince: '2025',
    styles: ['Boulder'],
  },
  {
    id: 'p3', name: 'Chen', level: 'V5–V6',
    hopePartner: 'Looking to push my limit. Must be serious about projecting.',
    image: PORTRAITS.chen, gym: 'Iron Walls',
    trustScore: 95, verified: true, age: 22, climbingSince: '2020',
    styles: ['Boulder', 'Lead', 'Competition'],
  },
  {
    id: 'p4', name: 'Maya', level: 'V2–V3',
    hopePartner: 'Weekend warrior. Prefer mornings at Peak Bouldering 🧗‍♀️',
    image: PORTRAITS.maya, gym: 'Peak Bouldering',
    trustScore: 87, verified: false, age: 26, climbingSince: '2023',
    styles: ['Boulder', 'Top Rope'],
  },
];

// Partners from chat history - people you've already climbed with
export const PAST_PARTNERS: Partner[] = [
  {
    id: 'past-user-1', name: 'Sophie', level: 'V2–V3',
    hopePartner: 'Love teaching beginners! Always happy to share tips.',
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    gym: 'Peak Bouldering',
    trustScore: 94, verified: true, age: 27, climbingSince: '2021',
    styles: ['Boulder', 'Top Rope'],
  },
  {
    id: 'past-user-2', name: 'Marcus', level: 'V4–V5',
    hopePartner: 'Weekend climber looking for consistent partners.',
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    gym: 'The Crux Gym',
    trustScore: 92, verified: true, age: 29, climbingSince: '2019',
    styles: ['Lead', 'Boulder'],
  },
  {
    id: 'past-user-3', name: 'David', level: 'V3–V4',
    hopePartner: 'Into bouldering and lead climbing. Let\'s send some projects!',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    gym: 'Iron Walls',
    trustScore: 89, verified: true, age: 25, climbingSince: '2022',
    styles: ['Boulder', 'Lead'],
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
  myGender: 'Female',
  wantLevel: 'V1–V4',
  wantStyles: ['Boulder'],
  wantAvailability: ['Weekends'],
  wantGender: ['Any'],
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

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const CHAT_HISTORY: ChatHistoryItem[] = [
  {
    partnerId: 'past-user-1', lastMessage: 'Thanks! Really enjoyed climbing with you 😊', time: 'Yesterday', unread: 0,
    sessionStatus: 'completed_reviewed', sessionDate: daysFromNow(-4),
    sessionGym: 'Peak Bouldering', sessionSlot: '09:00–11:00',
  },
  {
    partnerId: 'past-user-2', lastMessage: 'Sounds good, see you there! 🧗', time: '2 days ago', unread: 0,
    sessionStatus: 'completed_unreviewed', sessionDate: daysFromNow(-2),
    sessionGym: 'The Crux Gym', sessionSlot: '15:00–17:00',
  },
  {
    partnerId: 'past-user-3', lastMessage: 'Can\'t wait, it\'s going to be a great session! 💪', time: '3 days ago', unread: 1,
    sessionStatus: 'upcoming', sessionDate: daysFromNow(2),
    sessionGym: 'Iron Walls', sessionSlot: '17:00–19:00',
  },
];

export const BADGES: Badge[] = [
  { id: 'b1', label: 'First Climb!',  icon: '🧗', unlocked: true, earnedDate: 'Mar 15, 2025',  desc: 'Completed your first climb.' },
  { id: 'b2', label: 'V1 Sent',       icon: '✅', unlocked: true, earnedDate: 'Mar 18, 2025',  desc: 'Sent your first V1 route.' },
  { id: 'b3', label: 'Social Bee',    icon: '🤝', unlocked: true, earnedDate: 'Mar 20, 2025',  desc: 'Matched with a partner.' },
  { id: 'b4', label: '5 Sessions',    icon: '🔥', unlocked: true, earnedDate: 'Apr 5, 2025', desc: 'Log 5 climbing sessions.' },
  { id: 'b5', label: 'V2 Master',     icon: '⭐', unlocked: true, earnedDate: 'Apr 8, 2025', desc: 'Send 5 V2 routes.' },
  { id: 'b6', label: 'V3 Crusher',    icon: '💥', unlocked: false, desc: 'Send a V3 route.' },
  { id: 'b7', label: 'Video Star',    icon: '🎬', unlocked: true, earnedDate: 'Apr 12, 2025', desc: 'Upload a climbing video.' },
  { id: 'b8', label: 'Coach Student', icon: '👨‍🏫', unlocked: true, earnedDate: 'Apr 13, 2025', desc: 'Complete your first coach session.' },
  { id: 'b9', label: '10 Sessions',   icon: '🏆', unlocked: false, desc: 'Log 10 climbing sessions.' },
  { id: 'b10', label: 'Gym Explorer', icon: '🗺️', unlocked: false, desc: 'Visit all 3 partner gyms.' },
  { id: 'b11', label: 'Review Guru',  icon: '✍️', unlocked: true, earnedDate: 'Apr 13, 2025', desc: 'Write 3 venue reviews.' },
  { id: 'b12', label: 'Early Bird',   icon: '🌅', unlocked: false, desc: 'Complete 3 morning sessions (before 10am).' },
];

 

export const COURSES: Course[] = [
  { id: 'crs-warmup',   title: 'Warm-Up Routine',              thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '15 min', type: 'free',                description: 'Gentle warm-up sequence to prep the body',        category: 'Warm-up',   coachId: 'c1' },
  { id: 'crs-stretch',  title: 'Essential Stretching',         thumbnail: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '20 min', type: 'free',                description: 'Full-body stretching for mobility',               category: 'Flexibility', coachId: 'c2' },
  { id: 'crs-breathe',  title: 'Breathing Techniques',         thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '10 min', type: 'free',                description: 'Breath control for performance',                  category: 'Breath',    coachId: 'c3' },
  { id: 'crs-plateau',  title: 'Plateau Breaker: Core Strength', thumbnail: "https://images.unsplash.com/photo-1616803689943-5601631c7fec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '25 min', type: 'paid', price: 9.99,  description: 'Core strength to break plateaus',                 category: 'Strength',  coachId: 'c4' },
  { id: 'crs-finger',   title: 'Finger Strength Training',     thumbnail: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '15 min', type: 'paid', price: 14.99, description: 'Finger strength for advanced climbers',            category: 'Grip',      coachId: 'c5' },
  { id: 'crs-footwork', title: 'Advanced Footwork Drills',     thumbnail: "https://images.unsplash.com/photo-1546872041-03da29ccc3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '20 min', type: 'paid', price: 12.99, description: 'Technique for precise footwork',                  category: 'Technique', coachId: 'c6' },
  { id: 'crs-overhang', title: 'Overhang Mastery',             thumbnail: "https://images.unsplash.com/photo-1522163182402-834f871fd851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '30 min', type: 'paid', price: 19.99, description: 'Master steep angles and roof climbing',           category: 'Technique', coachId: 'c7' },
  { id: 'crs-endurance',title: 'Endurance Circuit',            thumbnail: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '45 min', type: 'paid', price: 15.99, description: 'Build climbing stamina with interval training',   category: 'Endurance', coachId: 'c8' },
  { id: 'crs-beginner', title: 'Beginner Foundations',         thumbnail: "https://images.unsplash.com/photo-1633859023075-fada2199a42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '40 min', type: 'free',                description: 'Essential basics for new climbers',               category: 'Beginner',  coachId: 'c5' },
  { id: 'crs-recovery', title: 'Active Recovery',              thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", duration: '25 min', type: 'free',                description: 'Light movement for rest days',                    category: 'Recovery',  coachId: 'c4' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ev1', date: 'Apr 2', type: 'booking', gymId: 'g1', slot: '09:00', isExpired: true, isReviewed: true },
  { id: 'ev2', date: 'Apr 5', type: 'booking', gymId: 'g2', slot: '14:00', isExpired: true, isReviewed: false },
  { id: 'ev3', date: 'Apr 8', type: 'social', gymId: 'g1', gymName: 'Peak Bouldering', partnerName: 'Alice Chen', slot: '10:00', isExpired: true, isReviewed: true },
  { id: 'ev4', date: 'Apr 12', type: 'coach', gymId: 'g1', gymName: 'Peak Bouldering', coachName: 'Bob', slot: '16:00', isExpired: true, isReviewed: true },
  { id: 'ev5', date: 'Apr 15', type: 'booking', gymId: 'g3', slot: '19:30', isExpired: true, isReviewed: true },
  { id: 'ev6', date: 'Apr 18', type: 'social', gymId: 'g2', gymName: 'The Crux Gym', partnerName: 'Marcus Li', slot: '15:00', isExpired: false, isReviewed: false },
  { id: 'ev7', date: 'Apr 20', type: 'coach', gymId: 'g2', gymName: 'The Crux Gym', coachName: 'Sara', slot: '08:00', isExpired: true, isReviewed: true },
  { id: 'ev8', date: 'Apr 22', type: 'booking', gymId: 'g1', slot: '11:00', isExpired: false, isReviewed: false },
  { id: 'ev9', date: 'Apr 25', type: 'coach', gymId: 'g2', gymName: 'The Crux Gym', coachName: 'Sara', slot: '09:30', isExpired: false, isReviewed: false },
  { id: 'ev10', date: 'Apr 26', type: 'social', gymId: 'g1', gymName: 'Peak Bouldering', partnerName: 'Alice Chen', slot: '14:00', isExpired: false, isReviewed: false },
  { id: 'ev11', date: 'Apr 28', type: 'social', gymId: 'g3', gymName: 'Iron Walls', partnerName: 'David Kim', slot: '14:00', isExpired: false, isReviewed: false },
  { id: 'ev12', date: 'Apr 30', type: 'booking', gymId: 'g1', slot: '17:00', isExpired: false, isReviewed: false },
];

export const VENUE_REVIEWS: VenueReview[] = [
  { id: 'vr1', gymId: 'g1', authorName: 'Alice', date: 'Apr 12', environment: 5, routeDesign: 4, equipment: 4, value: 5, text: 'Great atmosphere and solid routes.' },
  { id: 'vr2', gymId: 'g1', authorName: 'Bob', date: 'Apr 01', environment: 4, routeDesign: 3, equipment: 4, value: 4, text: 'Wide range of holds and clean gym.' },
  { id: 'vr3', gymId: 'g1', authorName: '{userName}', date: 'Apr 03', environment: 5, routeDesign: 5, equipment: 5, value: 5, text: 'Love the cafe and yoga room! Perfect for rest days.' },
  { id: 'vr4', gymId: 'g2', authorName: 'Mika', date: 'Mar 28', environment: 3, routeDesign: 4, equipment: 3, value: 3 },
  { id: 'vr5', gymId: 'g2', authorName: 'Liam', date: 'Apr 06', environment: 5, routeDesign: 5, equipment: 5, value: 5, text: 'Top notch gear and staff.' },
  { id: 'vr6', gymId: 'g2', authorName: '{userName}', date: 'Apr 06', environment: 4, routeDesign: 4, equipment: 3, value: 4, text: 'Good yoga classes but showers need updating.' },
  { id: 'vr7', gymId: 'g3', authorName: 'Marcus', date: 'Apr 15', environment: 4, routeDesign: 5, equipment: 5, value: 4, text: 'Amazing lead walls, great for training.' },
  { id: 'vr8', gymId: 'g3', authorName: '{userName}', date: 'Apr 16', environment: 5, routeDesign: 4, equipment: 5, value: 4, text: 'Pro shop has everything you need. Great routes too.' },
];

export const DAILY_PLAN: DailyTask[] = [
  { id: 'dt1', title: 'Warm-Up Routine', duration: '15 min', type: 'free', courseId: 'crs-warmup', completed: false },
  { id: 'dt4', title: 'Plateau Breaker: Core Strength', duration: '25 min', type: 'paid', courseId: 'crs-plateau', completed: false },
  { id: 'dt6', title: 'Finger Strength Training', duration: '15 min', type: 'paid', courseId: 'crs-finger', completed: false },
  { id: 'dt7', title: 'Breathing Techniques', duration: '10 min', type: 'free', courseId: 'crs-breathe', completed: false },
];

export const COACH_COURSES: CoachCourse[] = [
  { id: 'cc1', coachId: 'c1', courseId: 'crs-plateau' },
  { id: 'cc2', coachId: 'c4', courseId: 'crs-footwork' },
];

export const SESSIONS: SessionLog[] = [
  {
    date: '2025-04-02',
    routes: 3,
    level: 'V1',
    duration: 45,
    heartRate: 135,
    calories: 380,
    notes: 'Easy start to the week',
    fatigueLevel: 2,
  },
  {
    date: '2025-04-05',
    routes: 4,
    level: 'V2',
    duration: 55,
    heartRate: 145,
    calories: 480,
    notes: 'Good progress on overhangs',
    fatigueLevel: 3,
  },
  {
    date: '2025-04-08',
    routes: 5,
    level: 'V2',
    duration: 60,
    heartRate: 148,
    calories: 520,
    notes: 'Climbed with Alice, great session',
    fatigueLevel: 3,
  },
  {
    date: '2025-04-12',
    routes: 2,
    level: 'V2',
    duration: 60,
    heartRate: 142,
    calories: 520,
    notes: 'Coach session with Bob, learned new footwork techniques',
    videoUrl: 'https://example.com/video1.mp4',
    fatigueLevel: 3,
  },
  {
    date: '2025-04-15',
    routes: 6,
    level: 'V3',
    duration: 75,
    heartRate: 155,
    calories: 650,
    notes: 'Strong session at Iron Walls',
    fatigueLevel: 4,
  },
  {
    date: '2025-04-18',
    routes: 3,
    level: 'V3',
    duration: 70,
    heartRate: 150,
    calories: 600,
    notes: 'Pushed hard with Marcus',
    videoUrl: 'https://example.com/video2.mp4',
    fatigueLevel: 4,
  }
];

export const COACH_REVIEWS = [
  {
    id: 'cr1',
    coachId: 'c1',
    authorName: '{userName}',
    date: 'Apr 13',
    professionalism: 5,
    teachingSkill: 5,
    communication: 5,
    valueForMoney: 5,
    text: 'Bob is an amazing coach! Really helped me improve my footwork. Patient and clear explanations.',
  },
  {
    id: 'cr2',
    coachId: 'c1',
    authorName: 'Alice',
    date: 'Mar 28',
    professionalism: 5,
    teachingSkill: 5,
    communication: 5,
    valueForMoney: 5,
    text: 'Great session with Bob. Learned so much about technique.',
  },
  {
    id: 'cr3',
    coachId: 'c4',
    authorName: '{userName}',
    date: 'Apr 20',
    professionalism: 4,
    teachingSkill: 5,
    communication: 4,
    valueForMoney: 4,
    text: 'Sara is wonderful for combining yoga with climbing. Very relaxing and helpful.',
  },
  {
    id: 'cr4',
    coachId: 'c6',
    authorName: 'Marcus',
    date: 'Apr 5',
    professionalism: 5,
    teachingSkill: 5,
    communication: 4,
    valueForMoney: 5,
    text: 'Kai pushed me to try harder routes than I thought possible. Great for competitive climbers.',
  },
  {
    id: 'cr5',
    coachId: 'c2',
    authorName: 'David',
    date: 'Mar 15',
    professionalism: 5,
    teachingSkill: 4,
    communication: 4,
    valueForMoney: 4,
    text: 'Jack knows lead climbing inside out. Feel much safer now.',
  }
];

export const PARTNER_REVIEWS = [
  {
    id: 'pr1',
    partnerId: 'Marcus Li',
    partnerName: 'Marcus Li',
    authorName: '{userName}',
    date: 'Apr 19',
    reliability: 5,
    safety: 5,
    encouragement: 5,
    skillMatch: 4,
    communication: 5,
    text: 'Marcus is always on time and super supportive. Great climbing partner!',
  },
  {
    id: 'pr2',
    partnerId: 'Alice Chen',
    partnerName: 'Alice Chen',
    authorName: '{userName}',
    date: 'Apr 9',
    reliability: 5,
    safety: 5,
    encouragement: 4,
    skillMatch: 5,
    communication: 5,
    text: 'Alice is at a similar level which makes climbing together really fun.',
  },
  {
    id: 'pr3',
    partnerId: 'David Kim',
    partnerName: 'David Kim',
    authorName: '{userName}',
    date: 'Apr 29',
    reliability: 4,
    safety: 5,
    encouragement: 5,
    skillMatch: 3,
    communication: 4,
    text: 'David is very encouraging even though he is more advanced. Patient teacher.',
  }
];

export const PAST_PARTNERS_MESSAGES: Record<string, Message[]> = {
  'partner:past-user-1': [
    { id: 's1-1', text: "Hey! Saw your profile — V2–V3 and Peak Bouldering too 😄 Want to climb together sometime?", fromSelf: true, time: '10:02' },
    { id: 's1-2', text: "Hi {userName}! Yes, would love that! I'm usually there on weekday mornings.", fromSelf: false, time: '10:15' },
    { id: 's1-3', text: "Same! How about we plan something?", fromSelf: true, time: '10:17' },
    { id: 's1-4', text: '', fromSelf: true, time: '10:18', meetingProposal: { gym: 'Peak Bouldering', gymId: 'g1', date: daysFromNow(-4), slot: '09:00–11:00', status: 'accepted' } },
    { id: 's1-5', text: `🎉 I'm in! See you at Peak Bouldering on ${daysFromNow(-4)} (09:00–11:00). Can't wait! 🧗`, fromSelf: false, time: '10:19' },
    { id: 's1-6', text: "That blue slab route was so fun, thanks for showing me the technique!", fromSelf: true, time: '11:50' },
    { id: 's1-7', text: "Thanks! Really enjoyed climbing with you 😊", fromSelf: true, time: '12:05' },
  ],
  'partner:past-user-2': [
    { id: 's2-1', text: "Hey Marcus, you're at The Crux Gym right? I've been wanting to try it.", fromSelf: true, time: '09:30' },
    { id: 's2-2', text: "Yeah it's great! The V4 overhang section is challenging. You should come!", fromSelf: false, time: '09:45' },
    { id: 's2-3', text: "Let's climb together then! I'll send an invite 🧗", fromSelf: true, time: '09:47' },
    { id: 's2-4', text: '', fromSelf: true, time: '09:48', meetingProposal: { gym: 'The Crux Gym', gymId: 'g2', date: daysFromNow(-2), slot: '15:00–17:00', status: 'accepted' } },
    { id: 's2-5', text: `🎉 I'm in! See you at The Crux Gym on ${daysFromNow(-2)} (15:00–17:00). Can't wait! 🧗`, fromSelf: false, time: '09:49' },
    { id: 's2-6', text: "Just finished! You really pushed me on those V4s 🔥", fromSelf: false, time: '17:10' },
    { id: 's2-7', text: "Sounds good, see you there! 🧗", fromSelf: true, time: '17:15' },
  ],
  'partner:past-user-3': [
    { id: 's3-1', text: "Hi David! I've heard Iron Walls has amazing lead walls. Ever been?", fromSelf: true, time: '14:00' },
    { id: 's3-2', text: "It's my home gym! The new routes they set last week are incredible.", fromSelf: false, time: '14:10' },
    { id: 's3-3', text: "We should go together! I'll book a slot.", fromSelf: true, time: '14:12' },
    { id: 's3-4', text: '', fromSelf: true, time: '14:13', meetingProposal: { gym: 'Iron Walls', gymId: 'g3', date: daysFromNow(2), slot: '17:00–19:00', status: 'accepted' } },
    { id: 's3-5', text: `🎉 I'm in! See you at Iron Walls on ${daysFromNow(2)} (17:00–19:00). Can't wait! 🧗`, fromSelf: false, time: '14:14' },
    { id: 's3-6', text: "Should I bring my own harness or does the gym rent them?", fromSelf: true, time: '14:20' },
    { id: 's3-7', text: "They have rentals but bringing your own is more comfortable. See you there!", fromSelf: false, time: '14:25' },
    { id: 's3-8', text: "Can't wait, it's going to be a great session! 💪", fromSelf: true, time: '14:26' },
  ],
};
