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
import MyAccount from './pages/MyAccount'
import ProductInfo from './pages/ProductInfo'
import MyCart from './pages/MyCart'
import SearchResults from './pages/SearchResults'
import Orders from './pages/Orders'
import Footer from './components/Footer'


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
          <Route path='/my-account' element={<MyAccount/>}/>
          <Route path='/product' element={<ProductInfo/>} />
          <Route path='/my-cart' element={<MyCart/>}/>
          <Route path='/search' element={<SearchResults/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App
