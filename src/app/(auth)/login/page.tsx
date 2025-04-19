'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { firebaseClientAuth } from '@/app/lib/firebase-client';

const LoginPage: React.FC = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(firebaseClientAuth, email, password);
      const idToken = await user.getIdToken();
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (resp.ok) router.push('/dashboard');
      else setError('Login failed');
    } catch (error) {
      console.error(error);
      setError('Incorrect email or password');
    }
  };

  return (
    <form
      onSubmit={onLogin}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-900"
    >
      <div className="mb-12 w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <input
          type="email"
          autoComplete="email"
          id="email"
          placeholder="Email"
          ref={emailRef}
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
          Login
        </button>
      </div>

      <div className="items-center justify-center">
        Not a member yet?
        <Link href="/signup" id="signup" className="grow pl-2 text-center text-indigo-600">
          Sign up.
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
