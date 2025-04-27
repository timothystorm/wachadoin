import React, { FormEventHandler } from 'react';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  // Extension of HTMLAttributes
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: FormEventHandler<HTMLInputElement>;
}
