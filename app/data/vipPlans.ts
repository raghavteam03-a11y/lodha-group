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
    price: 5000,
    daily: 7000,
    total: 35000,
    days: 5,
    limit: 5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    description: 'High-stability long-term growth plan. Perfect for building a solid foundation.'
  },
  {
    id: '2',
    name: 'VIP Silver - Designer Suite',
    price: 8000,
    daily: 10000,
    total: 80000,
    days: 8,
    limit: 5,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
    description: 'Balanced investment with optimized cycle for frequent payouts.'
  },
  {
    id: '3',
    name: 'VIP Gold - Skyline View',
    price: 13000,
    daily: 15000,
    total: 90000,
    days: 6,
    limit: 3,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    description: 'Elite speed plan. Maximize your returns in just 10 days.'
  },
  {
    id: '4',
    name: 'VIP Platinum - Terrace Penthouse',
    price: 15000,
    daily: 16000,
    total: 32000,
    days: 2,
    limit: 2,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    description: 'Tier-A asset investment with high-yield daily dividends.'
  },
  {
    id: '5',
    name: 'VIP Sapphire - Sea Face Estate',
    price: 18000,
    daily: 20000,
    total: 40000,
    days: 2,
    limit: 2,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Premium luxury plan offering unprecedented daily income levels.'
  },
  {
    id: '6',
    name: 'VIP Emerald - Belmond Villa',
    price: 20000,
    daily: 22000,
    total: 132000,
    days: 6,
    limit: 1,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    description: 'The pinnacle of Lodha Group investment. For the most ambitious portfolios.'
  }
];
