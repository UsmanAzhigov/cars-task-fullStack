import React from 'react'

import Link from 'next/link'
import { prisma } from '@/core/prisma'
import { notFound } from 'next/navigation'

import { Button } from '@mantine/core'
import styles from './card-details.module.scss'

export default async function CarDetails({
  params,
}: {
  params: { id: number }
}) {
  const data = await prisma.car.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      brand: true,
      equipment: true,
      user: true,
    },
  })

  if (!data) {
    notFound()
  }

  console.log(data)

  return (
    <main className={styles.carDetailsContainer}>
      <img
        className={styles.carImage}
        src={data.imageUrl}
        alt={`${data.brand.name} ${data.modelName}`}
      />
      <h1 className={styles.carTitle}>
        <div className={styles.carBrand}>
          {data.brand.name} {data.modelName}
        </div>
        <div className={styles.carPrice}>Стоимость: {data.price}</div>
        <div className={styles.carInfo}>Цвет: {data.color}</div>
        <div className={styles.carInfo}>Тип двигателя: {data.engineType}</div>
        <div className={styles.carInfo}>Трансмиссия: {data.transmission}</div>
        <div className={styles.carInfo}>Запас хода: {data.powerReserve}</div>
        <ul className={styles.carFeatureList}>
          <p className={styles.carEquipment}>
            Комплектация: {data.equipment.map((e) => e.name).join(', ')}
          </p>
        </ul>
      </h1>
      <h3 className={styles.carPrice}>Цена: {data.price}</h3>
      <hr />
      <Link href="/">
        <Button>Назад</Button>
      </Link>
    </main>
  )
}
