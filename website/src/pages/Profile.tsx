import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext, UserContextType } from '../context/user';

export default function Profile() {
  const { token, logoutUser } = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <div className="absolute top-3 right-3">
        <button className="border rounded p-2" onClick={() => logoutUser()}>
          Logout
        </button>
      </div>
      <div className="flex flex-col">
        <h1 className="text-center font-bold text-xl">User Profile</h1>
        <p></p>
      </div>
    </div>
  );
}
