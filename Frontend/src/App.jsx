import React from 'react'
import Navbar from './Components/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import PlaceOrders from './Pages/PlaceOrders'
import Product from './Pages/Product'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Orders' element={<Orders/>} />
        <Route path='/PlaceOrders' element={<PlaceOrders/>} />
        <Route path='/Product/:ProductID' element={<Product/>} />
      </Routes>
    </div>
  )
}

export default App