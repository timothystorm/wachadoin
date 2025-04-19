'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { firebaseClientAuth } from '@/app/lib/firebase-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSignUp = async (): Promise<void> => {
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseClientAuth, email, password);
      const idToken = await user.getIdToken();
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (resp.ok) router.push('/dashboard');
      else setError('Login failed');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-900"
    >
      <div className="mb-12 w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <input
          type="email"
          autoComplete="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
        ></input>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
        />

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 p-3 text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </div>

      <div className="items-center justify-center">
        Already a Member?
        <Link href="/login" id="login" className="grow pl-2 text-center text-indigo-600">
          Login.
        </Link>
      </div>
    </form>
  );
};

export default SignUpPage;
