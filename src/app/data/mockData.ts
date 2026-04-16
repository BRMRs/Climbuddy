import { Gym, Partner, Coach, Badge } from '../types';

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

export const BADGES: Badge[] = [
  { id: 'b1', label: 'First Climb!',  icon: '🧗', unlocked: true,  desc: 'Completed your first climb.' },
  { id: 'b2', label: 'V1 Sent',       icon: '✅', unlocked: true,  desc: 'Sent your first V1 route.' },
  { id: 'b3', label: 'Social Bee',    icon: '🤝', unlocked: true,  desc: 'Matched with a partner.' },
  { id: 'b4', label: '5 Sessions',    icon: '🔥', unlocked: false, desc: 'Log 5 climbing sessions.' },
  { id: 'b5', label: 'V3 Crusher',    icon: '💥', unlocked: false, desc: 'Send a V3 route.' },
  { id: 'b6', label: 'Video Star',    icon: '🎬', unlocked: false, desc: 'Upload a climbing video.' },
];
