import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//file imports
import Registerpage from './pages/Registerpage';
import Loginpage from './pages/Loginpage';
import Header from './components/Header';


function App() {
  

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
       <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </Router>
      <ToastContainer />
    </>
  )
}

export default App
