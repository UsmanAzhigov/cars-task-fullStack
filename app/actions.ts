'use server';

import { prisma } from '@/core/prisma';
import { EngineType, Transmisison } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createAuto = async (formData: FormData) => {
  revalidatePath('/');

  const data = Object.fromEntries(formData);

  await prisma.car.create({
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
  });

  revalidatePath('/');
};

export const updateAuto = async (carId: number, formData: FormData) => {
  revalidatePath('/');

  const data = Object.fromEntries(formData);

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
      engineType: data.engineType as EngineType,
      transmission: data.transmission as Transmisison,
      brand: {
        connect: {
          id: Number(data.brand),
        },
      },
    },
  });

  revalidatePath('/');
};
