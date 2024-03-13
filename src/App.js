import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import { auth } from './firebase/config';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import Signuser from './Pages/Signuser';
import DashboardUser from './Pages/DashboardUser';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? (auth.currentUser.phoneNumber ? <Dashboard /> : (<DashboardUser/>) ): <Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/signuser/:id" element={<Signuser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
