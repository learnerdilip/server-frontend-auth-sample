import React from 'react';

export default function Title({ text }: { text: string }) {
  return <h1 className="text-3xl font-bold text-center mb-2">{text}</h1>;
}
