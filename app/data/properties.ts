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
    name: 'Lodha Park - Studio Elite',
    building: 'Lodha Park',
    type: 'apartment',
    price: 600,
    dailyIncome: 300,
    cycleDays: 45,
    totalReturn: 13500,
    area: 650,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Worli, Mumbai',
    description: 'A perfect entry point for smart investors. This 650 sq.ft. studio in Lodha Park offers a high-yield opportunity with steady daily returns.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    amenities: ['Gym', 'Parking', 'Security', 'Clubhouse'],
    available: true,
    vipLevel: 1
  },
  {
    id: '2',
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
    description: 'Strategically located 2BHK designer suite in Upper Thane. Optimized for short-cycle, high-frequency returns for the modern investor.',
    images: [
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Clubhouse'],
    available: true,
    vipLevel: 2
  },
  {
    id: '3',
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
    description: 'Luxury 1200 sq.ft. residence in New Cuffe Parade. A compact investment plan with lightning-fast returns in just 10 days.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Gym', 'Parking', 'Rooftop Garden'],
    available: true,
    vipLevel: 3
  },
  {
    id: '4',
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
    description: 'Expansive 5000 sq.ft. penthouse with panoramic skyline views. High-tier investment for serious wealth compounding.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Elevator', 'Wine Cellar', 'Gym', 'Concierge'],
    available: true,
    vipLevel: 4
  },
  {
    id: '5',
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
    description: 'Prime 1950 sq.ft. 3BHK with breathtaking sea views. A mid-high range plan offering substantial daily cash flow.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Pool', 'Smart Home', 'Security', 'Clubhouse'],
    available: true,
    vipLevel: 5
  },
  {
    id: '6',
    name: 'Belmond Villa Estate',
    building: 'Lodha Amara',
    type: 'villa',
    price: 6000,
    dailyIncome: 4000,
    cycleDays: 15,
    totalReturn: 60000,
    area: 4500,
    bedrooms: 5,
    bathrooms: 5,
    location: 'Banjara Hills, Hyderabad',
    description: 'The ultimate investment asset. A massive 4500 sq.ft. villa estate for elite investors seeking unparalleled daily returns.',
    images: [
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Pool', 'Landscaped Garden', 'Home Theater', 'Home Automation'],
    available: true,
    vipLevel: 6
  }
];
