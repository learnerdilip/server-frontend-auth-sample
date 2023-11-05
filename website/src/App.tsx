import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

function App() {
  const userData = true; // TODO: get user data

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              !route.private || userData ? (
                route.component
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        ))}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
