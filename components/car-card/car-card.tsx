'use client'

import React from 'react'
import Link from 'next/link'
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Text,
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'

import styles from './car-card.module.scss'

interface Props {
  imageUrl: string
  year: number
  modelName: string
  brandName: string
  price: number
  id: number
  handleDeleteCar: (carId: number) => Promise<void>
}

const formatPrice = (price: number): string => {
  if (price > 1000000) {
    return `${(price / 1000000).toFixed(2)} млн ₽`
  } else {
    return `${price} ₽`
  }
}

export const CarCard: React.FC<Props> = ({
  imageUrl,
  year,
  modelName,
  brandName,
  price,
  id,
  handleDeleteCar,
}) => {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={imageUrl} height={160} alt="Norway" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Box w={160}>
            <Text fw={500} truncate="end">
              {brandName} {modelName}
            </Text>
          </Box>
          <Badge color="pink">{formatPrice(price)}</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Год выпуска: {year}
        </Text>
        <div className={styles.cardActions}>
          <Link href={`/car-details/${id}`}>
            <Button color="blue" fullWidth radius="md">
              Подробнее
            </Button>
          </Link>
          <span className={styles.btnActions}>
            <Link href={`/edit-car/${id}`}>
              <ActionIcon color="green" size="lg" radius="md">
                <IconEdit size={16} />
              </ActionIcon>
            </Link>
            <ActionIcon
              onClick={() => handleDeleteCar(id)}
              color="red"
              size="lg"
              radius="md"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </span>
        </div>
      </Card>
    </>
  )
}
