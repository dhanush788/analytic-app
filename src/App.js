import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import { auth } from './firebase/config';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';




function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!auth?.currentUser && <Route path="/signin" element={<SignIn />} />}
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
