import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Products from './Products'
import Users from './Users'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </>
  )
}

export default App
