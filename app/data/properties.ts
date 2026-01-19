export interface Property {
  id: string;
  name: string;
  building: string;
  type: string;
  price: number; // Investment Amount
  dailyIncome: number;
  cycleDays: number;
  totalReturn: number;
  area: number; // in sqft
  bedrooms: number;
  bathrooms: number;
  location: string;
  description: string;
  images: string[];
  amenities: string[];
  available: boolean;
  vipLevel?: number;
  externalLink?: string;
}

export const buildings = [
  {
    id: '1',
    name: 'Lodha Park',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop',
    description: 'Luxury residential complex in the heart of the city'
  },
  {
    id: '2',
    name: 'Lodha Upper Thane',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=600&fit=crop',
    description: 'Premium apartments with world-class amenities'
  },
  {
    id: '3',
    name: 'Lodha Evoq',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=600&fit=crop',
    description: 'Modern living spaces with stunning city views'
  },
  {
    id: '4',
    name: 'Lodha Amara',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=600&fit=crop',
    description: 'Elegant homes in a serene environment'
  }
];

export const properties: Property[] = [
  {
    id: '1',
    name: 'VIP Starter - Urban Loft',
    building: 'Lodha Urban',
    type: 'apartment',
    price: 200,
    dailyIncome: 300,
    cycleDays: 10,
    totalReturn: 3000,
    area: 500,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Lodha City',
    description: 'Entry-level wealth building. Your gateway to exclusive property investments.',
    images: ['/images/vip-starter.png'],
    amenities: ['Basic Security', 'Water Supply', 'Parking'],
    available: true,
    vipLevel: 1
  },
  {
    id: '2',
    name: 'Lodha Crown - 3500 Sqft Estate',
    building: 'Lodha Crown',
    type: 'apartment',
    price: 550,
    dailyIncome: 350,
    cycleDays: 45,
    totalReturn: 15750,
    area: 3500,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Majiwada, Thane',
    description: 'A spacious 3500 sqft designer home at an entry-level investment price. Highly stable returns over 45 days.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
    amenities: ['Gym', 'Security', 'Clubhouse'],
    available: true,
    vipLevel: 1,
    externalLink: 'https://onetapay.com/pp/MTU5Nw=='
  },
  {
    id: '3',
    name: 'Lodha Vista - 1850 Sqft Loft',
    building: 'Lodha Vista',
    type: 'apartment',
    price: 800,
    dailyIncome: 2000,
    cycleDays: 5,
    totalReturn: 10000,
    area: 1850,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Lower Parel, Mumbai',
    description: 'A high-yield short-cycle investment in the heart of Mumbai. Massive daily returns in just 5 days.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
    ],
    amenities: ['Rooftop Pool', 'Luxury Lobby', 'Concierge'],
    available: true,
    vipLevel: 2
  },
  {
    id: '4',
    name: 'Upper Thane - Designer Suite',
    building: 'Lodha Upper Thane',
    type: 'apartment',
    price: 850,
    dailyIncome: 500,
    cycleDays: 25,
    totalReturn: 12500,
    area: 1350,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Thane, Mumbai',
    description: 'Strategically located 2BHK designer suite in Upper Thane. Optimized for short-cycle returns.',
    images: [
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Garden', 'Security'],
    available: true,
    vipLevel: 3
  },
  {
    id: '5',
    name: 'Lodha Evoq - Premium Living',
    building: 'Lodha Evoq',
    type: 'apartment',
    price: 1000,
    dailyIncome: 600,
    cycleDays: 10,
    totalReturn: 6000,
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    location: 'New Cuffe Parade, Mumbai',
    description: 'Luxury residence in New Cuffe Parade. A compact investment plan with fast returns.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536376074432-8d2a3d76359c?w=800&h=600&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Gym', 'Parking'],
    available: true,
    vipLevel: 4
  },
  {
    id: '6',
    name: 'Penthouse Skyline View',
    building: 'Lodha Amara',
    type: 'penthouse',
    price: 1800,
    dailyIncome: 1000,
    cycleDays: 15,
    totalReturn: 15000,
    area: 5000,
    bedrooms: 5,
    bathrooms: 4,
    location: 'Kolshet, Thane',
    description: 'Expansive penthouse with panoramic skyline views. High-tier investment for serious wealth.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Elevator', 'Wine Cellar', 'Gym'],
    available: true,
    vipLevel: 5
  },
  {
    id: '7',
    name: 'Worli Sea Face Premium',
    building: 'Lodha Park',
    type: 'apartment',
    price: 3400,
    dailyIncome: 2600,
    cycleDays: 20,
    totalReturn: 52000,
    area: 1950,
    bedrooms: 3,
    bathrooms: 3,
    location: 'Worli, Mumbai',
    description: 'Prime 3BHK with breathtaking sea views. Mid-high range plan with substantial daily cash flow.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Pool', 'Smart Home', 'Security'],
    available: true,
    vipLevel: 6
  },
  {
    id: '8',
    name: 'Belmond Villa Estate',
    building: 'Lodha Belmondo',
    type: 'villa',
    price: 6000,
    dailyIncome: 4500,
    cycleDays: 20,
    totalReturn: 90000,
    area: 4500,
    bedrooms: 5,
    bathrooms: 5,
    location: 'Pune-Mumbai Expressway',
    description: 'The ultimate investment asset. A massive villa estate for elite investors seeking peak returns.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop'
    ],
    amenities: ['Golf Course', 'Private Pool', 'Helipad Access'],
    available: true,
    vipLevel: 7
  },
  {
    id: '9',
    name: 'The World Towers Executive',
    building: 'World One',
    type: 'penthouse',
    price: 15000,
    dailyIncome: 12000,
    cycleDays: 30,
    totalReturn: 360000,
    area: 8000,
    bedrooms: 6,
    bathrooms: 7,
    location: 'Upper Worli, Mumbai',
    description: 'The pinnacle of global living. Own a part of the world\'s tallest residential tower with unmatched returns.',
    images: [
      'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop'
    ],
    amenities: ['Sky Garden', 'Spa', 'Butler Service', 'Private Cinema'],
    available: true,
    vipLevel: 8
  },
  {
    id: 'vip-1',
    name: 'VIP Bronze - Park Studio',
    building: 'Lodha Park',
    type: 'apartment',
    price: 5000,
    dailyIncome: 7000,
    cycleDays: 5,
    totalReturn: 35000,
    area: 3500,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Majiwada, Thane',
    description: 'High-stability long-term growth plan. Perfect for building a solid foundation.',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    amenities: ['Gym', 'Security', 'Clubhouse'],
    available: true,
    vipLevel: 1
  },
  {
    id: 'vip-2',
    name: 'VIP Silver - Designer Suite',
    building: 'Lodha Vista',
    type: 'apartment',
    price: 8000,
    dailyIncome: 10000,
    cycleDays: 8,
    totalReturn: 80000,
    area: 1850,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Lower Parel, Mumbai',
    description: 'Balanced investment with optimized cycle for frequent payouts.',
    images: ['https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop'],
    amenities: ['Rooftop Pool', 'Luxury Lobby', 'Concierge'],
    available: true,
    vipLevel: 2
  },
  {
    id: 'vip-3',
    name: 'VIP Gold - Skyline View',
    building: 'Lodha Upper Thane',
    type: 'apartment',
    price: 13000,
    dailyIncome: 15000,
    cycleDays: 6,
    totalReturn: 90000,
    area: 1350,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Thane, Mumbai',
    description: 'Strategically located 2BHK designer suite in Upper Thane. Optimized for short-cycle returns.',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
    amenities: ['Swimming Pool', 'Garden', 'Security'],
    available: true,
    vipLevel: 3
  },
  {
    id: 'vip-4',
    name: 'VIP Platinum - Terrace Penthouse',
    building: 'Lodha Evoq',
    type: 'apartment',
    price: 15000,
    dailyIncome: 16000,
    cycleDays: 2,
    totalReturn: 32000,
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    location: 'New Cuffe Parade, Mumbai',
    description: 'Luxury residence in New Cuffe Parade. A compact investment plan with fast returns.',
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'],
    amenities: ['Swimming Pool', 'Gym', 'Parking'],
    available: true,
    vipLevel: 4
  },
  {
    id: 'vip-5',
    name: 'VIP Sapphire - Sea Face Estate',
    building: 'Lodha Amara',
    type: 'penthouse',
    price: 18000,
    dailyIncome: 20000,
    cycleDays: 2,
    totalReturn: 40000,
    area: 5000,
    bedrooms: 5,
    bathrooms: 4,
    location: 'Kolshet, Thane',
    description: 'Expansive penthouse with panoramic skyline views. High-tier investment for serious wealth.',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
    amenities: ['Private Elevator', 'Wine Cellar', 'Gym'],
    available: true,
    vipLevel: 5
  },
  {
    id: 'vip-6',
    name: 'VIP Emerald - Belmond Villa',
    building: 'Lodha Belmondo',
    type: 'villa',
    price: 20000,
    dailyIncome: 22000,
    cycleDays: 6,
    totalReturn: 132000,
    area: 4500,
    bedrooms: 5,
    bathrooms: 5,
    location: 'Pune-Mumbai Expressway',
    description: 'The pinnacle of Lodha Group investment. For the most ambitious portfolios.',
    images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'],
    amenities: ['Golf Course', 'Private Pool', 'Helipad Access'],
    available: true,
    vipLevel: 6
  }
];
