'use client';

import { usePathname } from 'next/navigation';
import SlidingFooter from './SlidingFooter';
import BottomNavigation from './BottomNavigation';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <BottomNavigation />
      <SlidingFooter />
    </>
  );
}
