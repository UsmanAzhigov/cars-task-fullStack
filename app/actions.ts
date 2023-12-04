'use server'

import { prisma } from '@/core/prisma'
import { EngineType, Transmisison } from '@prisma/client'
import { revalidatePath } from 'next/cache'

//@ts-ignore
import bcrypt from 'bcrypt'
import { CreateCartFormValues } from './add-car/add-cart.types'

export const createUser = async (formData: {
  password: string
  fullName: string
  email: string
}) => {
  const data = Object.fromEntries(formData)
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await prisma.user.create({
    data: {
      fullName: data.username as string,
      email: data.email as string,
      password: hashedPassword,
    },
  })
  return newUser
}

export const loginUser = async (fullName: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      fullName,
    },
  })

  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  } else {
    return null
  }
}

export const createAuto = async (data: CreateCartFormValues) => {
  await prisma.car.create({
    data: {
      imageUrl: data.imageUrl as string,
      modelName: data.modelName as string,
      price: Number(data.price),
      year: Number(data.year),
      color: data.color as string,
      equipment: {
        connect: [{ id: 1 }],
      },
      user: {
        connect: {
          id: 1,
        },
      },
      engineType: data.engineType as EngineType,
      transmission: data.transmission as Transmisison,
      powerReserve: 0,
      published: true,
      brand: {
        connect: {
          id: Number(data.brand),
        },
      },
    },
  })

  revalidatePath('/')
}

export const updateAuto = async (carId: number, formData: FormData) => {
  const data = Object.fromEntries(formData)

  await prisma.car.update({
    where: {
      id: carId,
    },
    data: {
      imageUrl: data.imageUrl as string,
      modelName: data.modelName as string,
      price: Number(data.price),
      year: Number(data.year),
      color: data.color as string,
      equipment: {
        connect: [],
      },
      user: {
        connect: {
          id: 1,
        },
      },
      engineType: data.engineType as EngineType,
      transmission: data.transmission as Transmisison,
      powerReserve: 0,
      published: true,
      brand: {
        connect: {
          id: Number(data.brand),
        },
      },
    },
  })

  revalidatePath('/')
}
