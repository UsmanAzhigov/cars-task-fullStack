'use client'

import { Grid } from '@mantine/core'
import { CarCard } from './car-card/car-card'
import { Brand, Car } from '@prisma/client'

interface Props {
  items: Array<Car & { brand: Brand }>
}

export const GridCars: React.FC<Props> = ({ items }) => {
  return (
    <Grid>
      {items.map((car) => (
        <Grid.Col key={car.id} span={4}>
          <CarCard
            imageUrl={car.imageUrl}
            year={car.year}
            modelName={car.modelName}
            brandName={car.brand.name}
            price={car.price}
            id={car.id}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}
