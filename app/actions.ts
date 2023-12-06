'use server'

import bcrypt from 'bcrypt'
import { prisma } from '@/core/prisma'
import { revalidatePath } from 'next/cache'
import { CreateCartFormValues, UserData } from './add-car/add-cart.types'

export const createUser = async (formData: UserData) => {
  const data = Object.fromEntries(Object.entries(formData)) as UserData
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
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
      imageUrl: data.imageUrl,
      modelName: data.modelName,
      price: Number(data.price),
      year: Number(data.year),
      color: data.color,
      equipment: {
        connect: [{ id: 1 }],
      },
      user: {
        connect: {
          id: 1,
        },
      },
      engineType: data.engineType,
      transmission: data.transmission,
      powerReserve: Number(data.powerReserve),
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

export const updateAuto = async (carId: string, formData: FormData) => {
  const data = Object.fromEntries(formData)
  await prisma.car.update({
    where: {
      id: Number(carId),
    },
    data: {
      imageUrl: data.imageUrl,
      modelName: data.modelName,
      price: Number(data.price),
      year: Number(data.year),
      color: data.color,
      equipment: {
        connect: [{ id: 1 }],
      },
      user: {
        connect: {
          id: 1,
        },
      },
      engineType: data.engineType,
      transmission: data.transmission,
      powerReserve: Number(data.powerReserve),
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

export async function getEquipmentOptions() {
  const equipment = await prisma.equipment.findMany()
  return equipment.map((e: any) => e.name)
}

export const deleteAuto = async (carId: number) => {
  await prisma.car.delete({
    where: {
      id: carId,
    },
  })

  revalidatePath('/')
}
