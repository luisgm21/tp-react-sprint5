import { z } from "zod"

export const heroeFormSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  avatar: z
    .string({ required_error: "La URL del avatar es obligatoria" })
    .min(1, "La URL del avatar es obligatoria")
    .url("Debe ingresar una URL válida"),
  sex: z.enum(["male", "female"], {
    required_error: "El sexo es obligatorio",
    invalid_type_error: "El sexo debe ser masculino o femenino",
  }),
  enemiesText: z.string().optional().default(""),
})
