import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import ProductsAdmin from './ProductsAdmin'
import UserAdmin from './UserAdmin'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ProductsAdmin/>}/>
        <Route path='/users' element={<UserAdmin/>}/>
      </Routes>
    </>
  )
}

export default App
