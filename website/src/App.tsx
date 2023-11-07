import React, { Suspense, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import NotFound from './pages/NotFound';

function App() {
  const [hasUserToken, setHasUserToken] = useState<boolean>(false); // TODO: user state should come from global state

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
