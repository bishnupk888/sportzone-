// // src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.    '

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={user ? <Component /> : <Navigate to='/user/login' />}
//     />
//   );
// };

// export default PrivateRoute;
