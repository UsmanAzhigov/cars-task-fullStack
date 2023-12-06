import React from 'react'
import Link from 'next/link'
import styles from './car-details.module.scss'

import { prisma } from '@/core/prisma'
import { notFound } from 'next/navigation'
import { Button, Image, Text, Title, Badge } from '@mantine/core'

export default async function CarDetails({
  params,
}: {
  params: {
    id: number
  }
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

  return (
    <div className={styles.carDetailsContainer}>
      <Image
        radius="md"
        src={data.imageUrl}
        alt={`${data.brand.name} ${data.modelName}`}
      />
      <div className={styles.carTitle}>
        <Title order={1} orderMd={2}>
          {data.brand.name} {data.modelName}
        </Title>
        <Badge color="teal" radius="md">
          Стоимость: {data.price}
        </Badge>
        <Text>Цвет: {data.color}</Text>
        <Text>Год выпуска: {data.year}</Text>
        <Text>Тип двигателя: {data.engineType}</Text>
        <Text>Трансмиссия: {data.transmission}</Text>
        <Text>Запас хода: {data.powerReserve}</Text>
        <ul className={styles.carFeatureList}>
          <Text>
            Комплектация: {data.equipment.map((e: any) => e.name).join(', ')}
          </Text>
        </ul>
      </div>
      <Link href="/">
        <Button>Назад</Button>
      </Link>
    </div>
  )
}
