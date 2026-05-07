import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
        <Navbar links={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Heroes', href: '/heroes' },
        ]} />
        <main className="container mx-auto p-4">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout