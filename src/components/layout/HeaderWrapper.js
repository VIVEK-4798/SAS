'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isOverlayRoute = ['/', '/login', '/register'].includes(pathname); // Add more if needed

  return <Header overlay={isOverlayRoute} />;
};

export default HeaderWrapper;
