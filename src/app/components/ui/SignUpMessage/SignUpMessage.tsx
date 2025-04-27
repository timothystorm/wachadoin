import React from 'react';
import Link from 'next/link';

const SignUpMessage: React.FC = (): React.JSX.Element => {
  return (
    <div className="items-center justify-center">
      Not a member yet?
      <Link href="/signup" id="signup" className="grow pl-2 text-center text-indigo-600">
        Sign up.
      </Link>
    </div>
  );
};
export default SignUpMessage;
