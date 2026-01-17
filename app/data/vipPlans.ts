export interface VIPPlan {
  id: string;
  name: string;
  price: number;
  daily: number;
  total: number;
  days: number;
  limit: number;
  image: string;
  description: string;
}

export const vipPlans: VIPPlan[] = [
  {
    id: '1',
    name: 'VIP Bronze - Park Studio',
    price: 600,
    daily: 300,
    total: 13500,
    days: 45,
    limit: 10,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    description: 'High-stability long-term growth plan. Perfect for building a solid foundation.'
  },
  {
    id: '2',
    name: 'VIP Silver - Designer Suite',
    price: 850,
    daily: 500,
    total: 12500,
    days: 25,
    limit: 5,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
    description: 'Balanced investment with optimized cycle for frequent payouts.'
  },
  {
    id: '3',
    name: 'VIP Gold - Skyline View',
    price: 1000,
    daily: 600,
    total: 6000,
    days: 10,
    limit: 3,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    description: 'Elite speed plan. Maximize your returns in just 10 days.'
  },
  {
    id: '4',
    name: 'VIP Platinum - Terrace Penthouse',
    price: 1800,
    daily: 1000,
    total: 15000,
    days: 15,
    limit: 2,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    description: 'Tier-A asset investment with high-yield daily dividends.'
  },
  {
    id: '5',
    name: 'VIP Sapphire - Sea Face Estate',
    price: 3400,
    daily: 2600,
    total: 52000,
    days: 20,
    limit: 2,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Premium luxury plan offering unprecedented daily income levels.'
  },
  {
    id: '6',
    name: 'VIP Emerald - Belmond Villa',
    price: 6000,
    daily: 4000,
    total: 60000,
    days: 15,
    limit: 1,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
    description: 'The pinnacle of Lodha Group investment. For the most ambitious portfolios.'
  }
];
