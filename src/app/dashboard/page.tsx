'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@firebase/auth';
import { firebaseClientAuth } from '@/app/lib/firebase-client';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(firebaseClientAuth);
      const resp = await fetch('/api/logout', { method: 'POST' });

      if (resp.ok) router.push('/login');
      else console.error('Logout failed:', await resp.text());
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-3xl">WachaDoin Dashboard</h1>
      <p className="mb-4">Welcome! This is a protected route.</p>
      <button onClick={handleLogout} className="rounded bg-red-500 p-2 text-white hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
