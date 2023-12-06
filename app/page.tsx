import React from 'react'
import Link from 'next/link'
import styles from './home.module.scss'

import { prisma } from '@/core/prisma'
import { Sort } from '@/components/sort'
import { HomeProps } from '@/app/home.type'
import { GridCars } from '@/components/grid-cars'
import { Button, Container } from '@mantine/core'

export default async function Home({ searchParams }: HomeProps) {
  const cars = await prisma.car.findMany({
    where: {
      brand: {
        name: {
          contains: searchParams.brand,
        },
      },
    },
    orderBy: {
      [searchParams.sortBy || 'id']: searchParams.orderBy || 'desc',
    },
    include: {
      brand: true,
      equipment: true,
      user: true,
    },
  })

  return (
    <main className={styles.mainContainer}>
      <Container size="md">
        <div className={styles.addCar}>
          <Sort />
          <Link href="/add-car">
            <Button color="green">Добавить авто</Button>
          </Link>
        </div>
        <GridCars items={cars} />
      </Container>
    </main>
  )
}
