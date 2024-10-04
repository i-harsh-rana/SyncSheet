import React from 'react'
import Footer from '../src/components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/pages/Home/Home'
import Header from './components/Header';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';


function App() {
  
  return (
    <>
    <Router>
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
    </>
  )
}

export default App