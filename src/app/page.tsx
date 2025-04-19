import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = ({}) => {
  return (
    <Link href="/login" id="login" className="grow pl-2 text-center text-indigo-600">
      Login.
    </Link>
  );
};

export default HomePage;
