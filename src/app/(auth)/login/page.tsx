'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { clientAuth } from '@/app/lib/firebase/client';
import axios from 'axios';
import { Password } from '@/app/components/ui/Password/Password';
import { Email } from '@/app/components/ui/Email/Email';
import SignUpMessage from '@/app/components/ui/SignUpMessage/SignUpMessage';

const LoginPage: React.FC = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => emailRef.current?.focus(), []);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // signIn and store token server side
    return await signInWithEmailAndPassword(clientAuth, email, password)
      .then(({ user }) => user.getIdToken())
      .then((idToken) => axios.post('/api/user/login', { idToken }))
      .then(() => router.push('/dashboard'))
      .catch((err) => setError(`Could not log in: ${err}`));
  };

  return (
    <form
      onSubmit={onLogin}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-900"
    >
      <div className="mb-12 w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <Email
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
          ref={emailRef}
        ></Email>
        <Password
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 p-3 text-white hover:bg-indigo-500"
        >
          Login
        </button>
      </div>

      <SignUpMessage></SignUpMessage>
    </form>
  );
};

export default LoginPage;
