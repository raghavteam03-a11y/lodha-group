'use client';

import { usePathname } from 'next/navigation';
import SlidingFooter from './SlidingFooter';
import BottomNavigation from './BottomNavigation';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAuthPage || isAdminPage) {
    return null;
  }

  return (
    <>
      <BottomNavigation />
      <SlidingFooter />
    </>
  );
}
