import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../components/pages/Home'
import About from '../components/pages/About'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes