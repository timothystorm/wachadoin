'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@firebase/auth';
import { clientAuth } from '@/app/lib/firebase/client';
import axios from 'axios';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    await signOut(clientAuth)
      .then(() => axios.post('/api/user/logout'))
      .then(() => router.push('/login'))
      .catch((error) => console.error(`Logout error: ${error}`));
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
