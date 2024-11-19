import React from 'react'
import Footer from '../src/components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/pages/Home/Home'
import Header from './components/Header/Header.jsx';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Editor from './components/pages/Editor/Editor.jsx';
import AllDocument from './components/pages/AllDocument.jsx';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {
  
  const LoginWithGoogle = ()=>{
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <Login/>
      </GoogleOAuthProvider>
    )
    
  }

  return (
    <>
    <Router>
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginWithGoogle/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/editor/:docID' element={<Editor/>}/>
          <Route path='/allDocuments' element={<AllDocument/>}/>
        </Routes>
      </div>
      <Footer/>
      </div>
    </Router>
    </>
  )
}

export default App