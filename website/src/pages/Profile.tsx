import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import UserProfileDetails from '../components/UserProfileDetails';
import { UserContextType } from '../context/types';

export default function Profile() {
  const { token, logoutUser, user, getMeDetails } =
    useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  // If there is no token, redirect to login page
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // If there is a token, get user details
    getMeDetails();
  }, [token]);

  return (
    <div>
      <div className="absolute top-3 right-3">
        <button className="border rounded p-2" onClick={() => logoutUser()}>
          Logout
        </button>
      </div>
      <UserProfileDetails {...user} />
    </div>
  );
}
