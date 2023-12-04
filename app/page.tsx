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
  const cars = await prisma.car.findMany({
    where: {
      brand: {
        name: {
          contains: searchParams.brand,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
    include: {
      brand: true,
      equipment: true,
      user: true,
    },
  });


  return (
      <main className={styles.mainContainer}>
        <h2>Автомобили:</h2>
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
