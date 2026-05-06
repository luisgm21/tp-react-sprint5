import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../components/pages/Home'
import About from '../components/pages/About'
import HeroesList from '../components/heroesApp/pages/HeroesList'
import HeroeForm from '../components/heroesApp/components/HeroeForm'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/heroes" element={<HeroesList />} />
            <Route path="/heroes/nuevo" element={<HeroeForm />} />
            <Route path="/heroes/:id/editar" element={<HeroeForm />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes