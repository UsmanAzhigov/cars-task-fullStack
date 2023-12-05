import React from 'react'
import Link from 'next/link'
import { prisma } from '@/core/prisma'
import styles from './home.module.scss'

import { Button, Container, Title } from '@mantine/core'
import { HomeProps } from '@/app/home.type'
import { Filters } from '@/components/filters'
import { GridCars } from '@/components/grid-cars'

export default async function Home({ searchParams }: HomeProps) {
  // const userEmail = localStorage.getItem('email') || 'use client'
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
        <div className={styles.headerContainer}>
          <Title order={3}>azigovusman@gmail.com</Title>
          <span className={styles.authButtons}>
            <Link href="/profile/register">
              <Button>Регистрация</Button>
            </Link>
            <Link href="/profile/login">
              <Button>Авторизация</Button>
            </Link>
          </span>
        </div>
        <div className={styles.addCar}>
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
