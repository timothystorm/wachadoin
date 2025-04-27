import React, { ForwardedRef, forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { InputProps } from '@/app/components/ui/InputProps';

export const Password: ForwardRefExoticComponent<InputProps & RefAttributes<any>> = forwardRef(
  (props: InputProps, ref: ForwardedRef<any>) => {
    return (
      <input
        ref={ref}
        type="password"
        autoComplete="current-password"
        placeholder={props.id || 'Password'}
        onChange={props.onChange}
        value={props.value || ''}
        className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
      />
    );
  },
);
Password.displayName = 'Password';
