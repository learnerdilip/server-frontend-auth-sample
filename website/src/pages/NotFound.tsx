import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center text-center">
      <h1>404</h1>
      <p> &#9940;</p>
      <p>Not Found</p>
      <div className="text-center gap-5 flex justify-center">
        <Link className="underline text-blue-500" to="/register">
          Register
        </Link>
        <Link className="underline text-blue-500" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
