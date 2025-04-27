import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useId,
} from 'react';
import { InputProps } from '@/app/components/ui/InputProps';

export const Email: ForwardRefExoticComponent<InputProps & RefAttributes<any>> = forwardRef(
  (props: InputProps, ref: ForwardedRef<any>) => {
    const uniqueId = useId();
    const componentId = props.id ? `${uniqueId}-${props.id}` : uniqueId;
    return (
      <input
        ref={ref}
        name={props.id}
        autoComplete="email"
        className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-500 outline-none"
        id={componentId}
        onChange={props.onChange}
        placeholder={props.id || 'Email'}
        type="text"
        value={props.value || ''}
      />
    );
  },
);
Email.displayName = 'Email';
