import { EngineType, Transmisison } from '@prisma/client'

export interface CreateCartFormValues {
  imageUrl: string
  brand: string
  modelName: string
  price: string
  year: string
  equipment: string
  color: string
  engineType: EngineType
  transmission: Transmisison
  powerReserve: string
}
export interface UserData {
  password: string
  fullName: string
  email: string
}
