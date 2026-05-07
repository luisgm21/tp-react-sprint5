import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { API_CONFIG } from "../../../config/env"
import Heroe from "../components/Heroe"

import axios from "axios"

const API_URL = API_CONFIG.API_URL

const HeroesList = () => {
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setHeroes(response.data)
      })
      .catch((error) => {
        console.error("Error fetching heroes:", error)
      })
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setHeroes((prev) => prev.filter((hero) => hero.id !== id))
    } catch (error) {
      console.error("Error deleting hero:", error)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">
            Héroes
          </h1>
          <Link
            to="/heroes/nuevo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-600/25"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Héroe
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroes.map((hero) => (
            <Heroe key={hero.id} hero={hero} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroesList
