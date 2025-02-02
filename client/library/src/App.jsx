import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Home from './Home'


function App() {
  return (
    <div>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App
