'use client';

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import Link from 'next/link';

const DashboardSidebar = ({ user }: { user: User }) => {
  const links = [
    { href: `/${user.id}`, label: 'Dashboard' },
    { href: `/${user.id}/mypage`, label: 'Mypage' },
    { href: `/`, label: 'Server' }
  ];

  return (
    <div className="h-full w-[300px] bg-red-950 p-4">
      <div className="w-full text-center">
        <Button variant="outline" className="w-full rounded-xl border-2 bg-transparent py-6">
          <span className="text-lg">+ New Server</span>
        </Button>
      </div>
      <div>
        {links.map((link) => (
          <div key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
