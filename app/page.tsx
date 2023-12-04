'use client';

import React from 'react';
import Link from 'next/link';
import { prisma } from '@/core/prisma';
import styles from './home.module.scss';

import Button from '@/components/Button';
import Page from '@/components/car-card/page';
import { HomeProps } from '@/app/home.type';


export default async function Home({ searchParams }: HomeProps) {
  const [sortOrder, setSortOrder] = React.useState<boolean>(true);
  const cars = await prisma.car.findMany({
    where: {
      brand: {
        name: {
          contains: searchParams.brand,
        },
      },
    },
    orderBy: [
      {
        price: sortOrder ? 'desc' : 'asc',
      },
      {
        year: sortOrder ? 'desc' : 'asc',
      },
    ],
    include: {
      brand: true,
      equipment: true,
      user: true,
    },
  });

  // const handleSort = () => {
  //   setSortOrder(!sortOrder);
  //   console.log(sortOrder);
  // };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Автомобили:</h2>
        <div className={styles.authButtons}>
          <>
            <Link href='/profile/register'>
              <Button>Регистрация</Button>
            </Link>
            <Link href='/profile/login'>
              <Button>Авторизация</Button>
            </Link>
          </>
        </div>
      </div>
      <div className={styles.cardList}>
        {cars.map((car) => (
          <Page car={car} key={car.id} />
        ))}
      </div>
      <hr />
      <Link href='/add-car'>
        <Button>Добавить авто</Button>
      </Link>
    </main>
  );
}
