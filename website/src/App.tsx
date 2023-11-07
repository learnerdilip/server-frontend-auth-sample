import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import NotFound from './pages/NotFound';

function App() {
  const [hasUserToken, setHasUserToken] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setHasUserToken(!!token);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !route.private || hasUserToken ? (
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
