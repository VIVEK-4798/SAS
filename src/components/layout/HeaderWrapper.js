'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return <Header overlay={isHome} />;
};

export default HeaderWrapper;
