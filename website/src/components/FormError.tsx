import React from 'react';

export default function FormError({ text }: { text: string | undefined }) {
  return <p className="text-red-400 font-normal text-xs">{text}</p>;
}
