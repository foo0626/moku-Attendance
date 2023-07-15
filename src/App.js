import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, Navigate, Outlet,} from 'react-router-dom';




import Home from './components/Home';
import UserAttend from './components/UserAttend';
import UserRegistration from './components/UserRegistration';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Navigation from './components/Navigation';


const homeUrl = process.env.PUBLIC_URL;

const ProtectedRoute = ({ user, redirectPath = `${homeUrl}/login` }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};



function App() {
  
  const user = useSelector((state) => state.user)

  return (
      <ChakraProvider>
        <Navigation />
        <Routes>
          <Route path={`${homeUrl}/userregistration`} element={<UserRegistration />} />
          <Route path={`${homeUrl}/login`} element={<Login />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path={`${homeUrl}/`} element={<Home />} />
            <Route path={`${homeUrl}/userattend`} element={<UserAttend />} />
          </Route>
        </Routes>
      </ChakraProvider>
  );
}

export default App;
