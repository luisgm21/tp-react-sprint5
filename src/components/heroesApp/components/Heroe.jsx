import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const sexLabel = {
  male: "Masculino",
  female: "Femenino",
}

const Heroe = ({ hero, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar héroe?",
      text: `¿Estás seguro de eliminar a ${hero.name}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(hero.id)
        Swal.fire({
          title: "Eliminado",
          text: `${hero.name} ha sido eliminado correctamente.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }

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

        {/* Acciones */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/heroes/${hero.id}/editar`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-red-800/50 text-red-300 hover:bg-red-600 hover:text-white transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Heroe