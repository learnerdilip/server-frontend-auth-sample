import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

function App() {
  const userData = true;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => {
          console.log(route.private, !route.private, userData);

          return (
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
          );
        })}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
