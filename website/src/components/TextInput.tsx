import React from 'react';

import FormError from './FormError';

interface TextInputProps {
  placeholder: string;
  type: string;
  error: string | undefined;
  props: any;
}

export default function TextInput({
  placeholder,
  type,
  error,
  props,
}: TextInputProps) {
  return (
    <>
      <input
        className={'border rounded p-1 my-2' + (error ? ' border-red-400' : '')}
        placeholder={placeholder}
        type={type || 'text'}
        {...props}
      />
      {error !== undefined && <FormError text={error} />}
    </>
  );
}
