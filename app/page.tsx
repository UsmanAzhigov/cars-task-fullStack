'use client';

import React from 'react';
import Link from 'next/link';
import { prisma } from '@/core/prisma';
import styles from './home.module.scss';

import Button from '@/components/Button';
import CarCard from '@/components/car-card/car-card';

interface HomeProps {
  searchParams: {
    brand: string;
  };
}
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

  const handleSort = () => {
    setSortOrder(!sortOrder);
  };

  return (
      <main className={styles.mainContainer}>
        <h2>Автомобили:</h2>
        <button onClick={handleSort}>
          Сортировать по цене
        </button>
        <div className={styles.cardList}>
          {cars.map((car) => (
            <CarCard car={car} />
          ))}
        </div>
        <hr />
        <Link href='/add-car'>
          <Button>Добавить авто</Button>
        </Link>
      </main>
  );
}
