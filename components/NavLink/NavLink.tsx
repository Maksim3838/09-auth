'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  prefetch?: boolean;
};

export default function NavLink({
  href,
  children,
  className = '',
  activeClassName = '',
  exact = false,
  prefetch,
}: Props) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const finalClassName = `${className} ${
    isActive ? activeClassName : ''
  }`.trim();

  return (
    <Link
      href={href}
      className={finalClassName}
      prefetch={prefetch}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
