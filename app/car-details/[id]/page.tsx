import React from 'react'
import Link from 'next/link'
import { prisma } from '@/core/prisma'
import { notFound } from 'next/navigation'
import { Button, Image, Text, Title, Badge } from '@mantine/core'
import styles from './car-details.module.scss'

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
      <Image src={data.imageUrl} alt={`${data.brand.name} ${data.modelName}`} />
      <div className={styles.carTitle}>
        <Title order={1} orderMd={2}>
          {data.brand.name} {data.modelName}
        </Title>
        <Badge color="teal" radius="md" style={{ marginBottom: '10px' }}>
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
        <Button style={{ marginTop: '20px' }}>Назад</Button>
      </Link>
    </div>
  )
}
