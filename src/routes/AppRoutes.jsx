import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../components/pages/Home'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes