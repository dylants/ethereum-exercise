'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { TextSearchIcon, UserSearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const pathname = usePathname();

  return (
    <Link href={path} className="h-[50px] flex items-center">
      <Button
        variant="ghost"
        className={clsx(
          'flex items-center gap-2 py-0 h-8',
          pathname.includes(path) && 'bg-white text-slate-900 hover:bg-white',
        )}
      >
        {children}
      </Button>
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="flex justify-center items-center gap-4 text-xl w-full h-[50px] px-4 bg-slate-500 text-white">
      <NavLink path="/ens-lookup">
        <TextSearchIcon size={14} />
        ENS Lookup
      </NavLink>
      <NavLink path="/user-lookup">
        <UserSearchIcon size={14} />
        User Lookup
      </NavLink>
    </nav>
  );
}
