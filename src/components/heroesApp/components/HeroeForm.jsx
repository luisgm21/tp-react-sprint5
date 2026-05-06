import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const API_URL = "https://69f3887cbd2396bf53102806.mockapi.io/api/v1/Heroe"

const initialForm = {
  name: "",
  avatar: "",
  sex: "male",
  enemiesText: "",
}

const HeroeForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)

  // Si es edición, cargar los datos del héroe
  useEffect(() => {
    if (isEditing) {
      axios
        .get(`${API_URL}/${id}`)
        .then((res) => {
          const hero = res.data
          setForm({
            name: hero.name || "",
            avatar: hero.avatar || "",
            sex: hero.sex || "male",
            enemiesText: Array.isArray(hero.enemies) ? hero.enemies.join(", ") : "",
          })
        })
        .catch((err) => {
          console.error("Error fetching hero:", err)
        })
        .finally(() => setFetching(false))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const enemies = form.enemiesText
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean)

    const payload = {
      createdAt: isEditing ? undefined : new Date().toISOString(),
      name: form.name,
      avatar: form.avatar,
      sex: form.sex,
      enemies,
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, payload)
      } else {
        await axios.post(API_URL, payload)
      }
      navigate("/heroes")
    } catch (error) {
      console.error("Error saving hero:", error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Cargando héroe...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {isEditing ? "Editar Héroe" : "Nuevo Héroe"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
        >
          {/* Nombre */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej: Spider-Man"
              className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition placeholder-gray-400"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              URL del Avatar
            </label>
            <input
              type="url"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              required
              placeholder="https://ejemplo.com/avatar.jpg"
              className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition placeholder-gray-400"
            />
            {form.avatar && (
              <img
                src={form.avatar}
                alt="Preview"
                className="mt-3 w-20 h-20 rounded-lg object-cover border border-gray-600"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            )}
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Sexo
            </label>
            <select
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          {/* Enemigos */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Enemigos
            </label>
            <input
              type="text"
              name="enemiesText"
              value={form.enemiesText}
              onChange={handleChange}
              placeholder="Green Goblin, Doctor Octopus, Venom"
              className="w-full px-4 py-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition placeholder-gray-400"
            />
            <p className="text-gray-500 text-xs mt-1">
              Separados por coma (,)
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/heroes")}
              className="flex-1 px-4 py-2.5 rounded-lg bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Actualizar"
                  : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HeroeForm
