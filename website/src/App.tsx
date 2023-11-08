import React, { Suspense, useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import NotFound from './pages/NotFound';
import { UserContext, UserContextType } from './context/user';

function App() {
  const { token } = useContext<UserContextType>(UserContext);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !route.private || token ? (
                route.component
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
