'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from '@firebase/auth';
import { clientAuth } from '@/app/lib/firebase/client';

const AuthStateListener = ({ children }: any) => {
  const [, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading....</div>;
  return <>{children}</>;
};
export default AuthStateListener;
