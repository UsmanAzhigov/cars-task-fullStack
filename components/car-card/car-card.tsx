'use client'

import React from 'react'
import Link from 'next/link'
import {
  ActionIcon,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
} from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'

import styles from './car-card.module.scss'

interface Props {
  imageUrl: string
  year: number
  modelName: string
  brandName: string
  price: number
  id: number
}

export const CarCard: React.FC<Props> = ({
  imageUrl,
  year,
  modelName,
  brandName,
  price,
  id,
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
          <Badge color="pink">{price} ₽</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Год выпуска: {year}
        </Text>

        <div className={styles.cardActions}>
          <Link href={`/cars/${id}`} style={{ width: '100%' }}>
            <Button color="blue" fullWidth radius="md">
              Подробнее
            </Button>
          </Link>
          <Link href={`/edit-car/${id}`}>
            <ActionIcon color="green" size="lg" radius="md">
              <IconEdit size={16} />
            </ActionIcon>
          </Link>
        </div>
      </Card>
    </>
  )
}
