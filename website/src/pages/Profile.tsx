import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';
import UserProfileDetails from '../components/UserProfileDetails';
import { UserContextType } from '../context/types';

export default function Profile() {
  const { token, logoutUser, user, getMeDetails } =
    useContext<UserContextType>(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

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
