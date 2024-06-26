import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import { auth } from './firebase/config';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import Signuser from './Pages/Signuser';
import DashboardUser from './Pages/DashboardUser';
import { getDatabase, ref, onValue } from "firebase/database";
import { OptionsProvider } from './context/DashbardContext';


function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  console.log(userType)


  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + auth?.currentUser?.uid + '/user');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserType(data);
    });
  }, [auth, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if( user && userType === null) {
    return <div>Loading....</div>
  }


  return (
    <div>
      <OptionsProvider>
      <BrowserRouter>
        <Routes>
          {
            user && <Route path="/" element={userType?.trim() === 'admin' ? 
            <Dashboard /> 
            :
            <DashboardUser />
          } /> 
          }
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Signup />} />
          <Route path="/signuser/:id" element={<Signuser />} />
        </Routes>
      </BrowserRouter>
      </OptionsProvider>
    </div>
  );
}

export default App;
