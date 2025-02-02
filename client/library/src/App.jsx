import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Products from './pages/Products'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'


function App() {
  return (
    <div>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
