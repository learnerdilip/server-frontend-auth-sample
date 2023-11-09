import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterSuccess() {
  return (
    <div className="flex flex-col text-center">
      <h1>Success</h1>
      <p>&#9989;</p>
      <p>You have successfully registered! </p>
      <Link className="underline text-blue-500" to="/login">
        Login
      </Link>
    </div>
  );
}
