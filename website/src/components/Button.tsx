import React from 'react';

export default function Button({
  text,
  type = 'submit',
  props,
}: {
  text: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  props?: any;
}) {
  return (
    <button
      className="border rounded my-2 p-2 bg-slate-300"
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}
