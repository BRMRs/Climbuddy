import { Gym, Partner, Coach, Badge, Route, SlotBooker, PartnerRating, MyPreferences, ChatHistoryItem, Course, CalendarEvent, VenueReview, DailyTask, SessionLog, CoachCourse } from '../types';

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
    { 
      id: 'c1', name: 'Bob', rating: '4.9', specialty: 'Footwork Expert',
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
      id: 'c2', name: 'Jack', rating: '4.7', specialty: 'Lead Climbing',
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
      id: 'c3', name: 'John', rating: '4.8', specialty: 'Bouldering',
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
      id: 'c4', name: 'Sara', rating: '4.6', specialty: 'Yoga + Climb',
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
      id: 'c5', name: 'Liam', rating: '4.5', specialty: 'Beginner Expert',
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
      id: 'c6', name: 'Kai', rating: '4.9', specialty: 'Competition',
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
      id: 'c7', name: 'Mia', rating: '4.8', specialty: 'Lead Climbing',
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
      id: 'c8', name: 'Rex', rating: '4.7', specialty: 'Strength',
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
  { id: 'b1', label: 'First Climb!',  icon: '🧗', unlocked: true, earnedDate: 'Mar 15, 2025',  desc: 'Completed your first climb.' },
  { id: 'b2', label: 'V1 Sent',       icon: '✅', unlocked: true, earnedDate: 'Mar 18, 2025',  desc: 'Sent your first V1 route.' },
  { id: 'b3', label: 'Social Bee',    icon: '🤝', unlocked: true, earnedDate: 'Mar 20, 2025',  desc: 'Matched with a partner.' },
  { id: 'b4', label: '5 Sessions',    icon: '🔥', unlocked: false, desc: 'Log 5 climbing sessions.' },
  { id: 'b5', label: 'V3 Crusher',    icon: '💥', unlocked: false, desc: 'Send a V3 route.' },
  { id: 'b6', label: 'Video Star',    icon: '🎬', unlocked: false, desc: 'Upload a climbing video.' },
];

 

export const COURSES: Course[] = [
  { id: 'crs-warmup', title: 'Warm-Up Routine', thumbnail: '🔥', duration: '15 min', type: 'free', description: 'Gentle warm-up sequence to prep the body', category: 'Warm-up', coachId: 'c1' },
  { id: 'crs-stretch', title: 'Essential Stretching', thumbnail: '🧘', duration: '20 min', type: 'free', description: 'Full-body stretching for mobility', category: 'Flexibility', coachId: 'c2' },
  { id: 'crs-breathe', title: 'Breathing Techniques', thumbnail: '💨', duration: '10 min', type: 'free', description: 'Breath control for performance', category: 'Breath', coachId: 'c3' },
  { id: 'crs-plateau', title: 'Plateau Breaker: Core Strength', thumbnail: '💪', duration: '25 min', type: 'paid', price: 9.99, description: 'Core strength to break plateaus', category: 'Strength', coachId: 'c4' },
  { id: 'crs-finger', title: 'Finger Strength Training', thumbnail: '🖐️', duration: '15 min', type: 'paid', price: 14.99, description: 'Finger strength for advanced climbers', category: 'Grip', coachId: 'c5' },
  { id: 'crs-footwork', title: 'Advanced Footwork Drills', thumbnail: '👣', duration: '20 min', type: 'paid', price: 12.99, description: 'Technique for precise footwork', category: 'Technique', coachId: 'c6' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ev1', date: 'Apr 5', type: 'booking', gymId: 'g1', slot: '14:00', isExpired: true, isReviewed: false },
  { id: 'ev2', date: 'Apr 10', type: 'booking', gymId: 'g2', slot: '10:00', isExpired: true, isReviewed: false },
  { id: 'ev3', date: 'Apr 25', type: 'booking', gymId: 'g1', slot: '16:00', isExpired: false, isReviewed: false },
  { id: 'ev4', date: 'Apr 30', type: 'booking', gymId: 'g3', slot: '19:00', isExpired: false, isReviewed: false },
  { id: 'ev5', date: 'Apr 22', type: 'social', gymId: 'g1', gymName: 'Peak Bouldering', partnerName: 'Marcus Li', slot: '15:00', isExpired: false, isReviewed: false },
  { id: 'ev6', date: 'Apr 28', type: 'coach', gymId: 'g1', gymName: 'Peak Bouldering', coachName: 'Bob', slot: '11:00', isExpired: false, isReviewed: false },
];

export const VENUE_REVIEWS: VenueReview[] = [
  { id: 'vr1', gymId: 'g1', authorName: 'Alice', date: 'Apr 12', environment: 5, routeDesign: 4, equipment: 4, value: 5, text: 'Great atmosphere and solid routes.' },
  { id: 'vr2', gymId: 'g1', authorName: 'Bob', date: 'Apr 01', environment: 4, routeDesign: 3, equipment: 4, value: 4, text: 'Wide range of holds and clean gym.' },
  { id: 'vr3', gymId: 'g2', authorName: 'Mika', date: 'Mar 28', environment: 3, routeDesign: 4, equipment: 3, value: 3 },
  { id: 'vr4', gymId: 'g2', authorName: 'Liam', date: 'Apr 06', environment: 5, routeDesign: 5, equipment: 5, value: 5, text: 'Top notch gear and staff.' },
];

export const DAILY_PLAN: DailyTask[] = [
  { id: 'dt1', title: 'Warm-Up Routine', duration: '15 min', type: 'free', courseId: 'crs-warmup', completed: true },
  { id: 'dt2', title: 'Essential Stretching', duration: '20 min', type: 'free', courseId: 'crs-stretch', completed: true },
  { id: 'dt3', title: 'Plateau Breaker: Core Strength', duration: '25 min', type: 'paid', courseId: 'crs-plateau', completed: false },
  { id: 'dt4', title: 'Coach Session: Advanced Footwork', duration: '60 min', type: 'coach', courseId: 'cc2', completed: false },
  { id: 'dt5', title: 'General Training Reminder', duration: '5 min', type: 'free', completed: false },
];

export const COACH_COURSES: CoachCourse[] = [
  { id: 'cc1', coachId: 'c1', courseId: 'crs-plateau' },
  { id: 'cc2', coachId: 'c4', courseId: 'crs-footwork' },
];

export const SESSIONS: SessionLog[] = [
  {
    date: '2025-04-12',
    routes: 2,
    level: 'V2',
    duration: 60,
    heartRate: 142,
    calories: 520,
    notes: 'Nice session',
    videoUrl: 'https://example.com/video1.mp4',
    fatigueLevel: 3,
  },
  {
    date: '2025-04-18',
    routes: 3,
    level: 'V3',
    duration: 70,
    heartRate: 150,
    calories: 600,
    notes: 'Pushed hard',
    videoUrl: 'https://example.com/video2.mp4',
    fatigueLevel: 4,
  }
];
