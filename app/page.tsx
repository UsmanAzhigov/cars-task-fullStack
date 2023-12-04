import React from 'react'
import Link from 'next/link'
import { prisma } from '@/core/prisma'
import styles from './home.module.scss'

import { Container, Grid } from '@mantine/core'

import { Button } from '@mantine/core'
import { HomeProps } from '@/app/home.type'
import { Filters } from '@/components/filters'
import { GridCars } from '@/components/GridCars'

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
        <div className={styles.authButtons}>
          <Link href="/profile/register">
            <Button>Регистрация</Button>
          </Link>
          <Link href="/profile/login">
            <Button>Авторизация</Button>
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 15,
            borderBottom: '1px solid #ccc',
            paddingBottom: 15,
          }}
        >
          <Filters />
          <Link href="/add-car">
            <Button color="green">Добавить авто</Button>
          </Link>
        </div>

        <GridCars items={cars} />
      </Container>
    </main>
  )
}
