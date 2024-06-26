import React, { useContext } from 'react';
import TopBar from './components/topbar/TopBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import Home from "./pages/home/Home";
import Register from "./pages/register/Register"; 
import Login from "./pages/login/Login"
import Write from "./pages/write/Write"
import Settings from "./pages/settings/Settings"
import Single from "./pages/single/Single"
import { Context } from './context/Context';


function App() {
const { user } =useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={user ? <Home/> : <Register />} />
        <Route path='/login' element={user ? <Home/> :<Login />} />
        <Route path='/write' element={user ? <Write />:<Register/>} />
        <Route path='/settings' element={user ?<Settings />:<Register/>} />
        <Route path='/post/:postId' element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
