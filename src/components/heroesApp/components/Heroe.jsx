import React from 'react'
import { Link } from 'react-router-dom'

const sexLabel = {
  male: "Masculino",
  female: "Femenino",
}

const Heroe = ({ hero }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <Link to={`/heroes/${hero.id}/editar`}>
        <div className="h-56 overflow-hidden">
          <img
            src={hero.avatar}
            alt={hero.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x400/374151/ffffff?text=Hero"
            }}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/heroes/${hero.id}/editar`}>
          <h2 className="text-xl font-semibold text-white hover:text-indigo-400 transition-colors">{hero.name}</h2>
        </Link>
        <p className="text-gray-400 text-sm mt-1">
          {sexLabel[hero.sex]} · {hero.enemies.length} enemigo{hero.enemies.length !== 1 ? "s" : ""}
        </p>
        {hero.enemies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {hero.enemies.map((enemy) => (
              <span
                key={enemy}
                className="px-2 py-0.5 text-xs rounded-full bg-red-900/50 text-red-300"
              >
                {enemy}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/heroes/${hero.id}/editar`}
          className="mt-4 inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Editar
        </Link>
      </div>
    </div>
  )
}

export default Heroe