import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту

const ProtectedRoute = ({ component: Component, handleOpenLoginPopup, ...props }) => {
  useEffect(() => {
    if (!localStorage.getItem('login')) {
      handleOpenLoginPopup();
    }
  });

  return (
    <Route>
      {
        () => (
          localStorage.getItem('login')
            ? <Component {...props} />
            : <Redirect to="./"/>
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
