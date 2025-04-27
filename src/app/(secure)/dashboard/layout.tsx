import React from 'react';
import Image from 'next/image';
import globe from 'public/globe.svg';
import { clientAuth } from '@/app/lib/firebase/client';
import AuthStateListener from '@/app/components/headless/AuthStateListener/AuthStateListener';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  console.log(clientAuth.currentUser);
  const displayName = clientAuth.currentUser?.displayName;

  return (
    <AuthStateListener>
      <h3>{displayName}</h3>
      <div className="fixed left-1/2 m-auto mt-6 -translate-x-1/2 opacity-10">
        <Image
          src={globe}
          alt="Wach'aDoin Logo"
          width={200}
          height={200}
          className="text-center"
        ></Image>
      </div>

      {children}
    </AuthStateListener>
  );
}
