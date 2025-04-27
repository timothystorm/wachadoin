'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { clientAuth } from '@/app/lib/firebase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Email } from '@/app/components/ui/Email/Email';
import { Password } from '@/app/components/ui/Password/Password';

const SignUpPage: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => emailRef.current?.focus(), []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // signUp and store token server side
    if (email?.length && password?.length) {
      await createUserWithEmailAndPassword(clientAuth, email, password)
        .then(async ({ user }) =>
          updateProfile(user, { displayName }).then(() => user.getIdToken()),
        )
        .then((idToken) => axios.post('/api/user/login', { idToken }))
        .then(() => router.push('/dashboard'))
        .catch((err) => setError(`Could not signup: ${err}`));
    } else {
      setEmail('Email and password required');
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex min-h-screen flex-col items-center justify-center bg-gray-900"
    >
      <div className="mb-12 w-96 rounded-lg bg-gray-800 p-10 shadow-xl">
        <input
          name="displayName"
          className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          type="text"
          value={displayName}
        />
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
