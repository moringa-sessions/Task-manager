import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Navbar />

        <div className='container mx-auto'>
                  <Outlet />
        </div>

        <Footer />
    </div>
  )
}
