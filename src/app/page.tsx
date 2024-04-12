'use client';

import { Button } from '@/components/ui/button';
import { TextSearchIcon, UserSearchIcon } from 'lucide-react';
import Link from 'next/link';

function NavLink({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return (
    <Link href={path} className="h-[50px] flex items-center">
      <Button variant="outline" className="flex items-center gap-2 py-0 h-8">
        {children}
      </Button>
    </Link>
  );
}

export default function App() {
  return (
    <>
      <div className="flex flex-col w-full items-center mt-12 gap-4">
        <h2>Welcome!</h2>
        <div className="flex flex-col items-center gap-1">
          <p>Please select your journey</p>
          <div className="flex gap-4">
            <NavLink path="/ens-lookup">
              <TextSearchIcon size={14} />
              ENS Lookup
            </NavLink>
            <NavLink path="/user-lookup">
              <UserSearchIcon size={14} />
              User Lookup
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
