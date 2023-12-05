'use client'

import { message } from 'antd'
import { Grid } from '@mantine/core'
import { Brand, Car } from '@prisma/client'
import { CarCard } from './car-card/car-card'
import { deleteAuto } from '@/app/actions'

interface Props {
  items: Array<Car & { brand: Brand }>
}

export const GridCars: React.FC<Props> = ({ items }) => {
  const handleDeleteCar = async (carId: number) => {
    console.log(carId)
    try {
      await deleteAuto(carId)
      message.success(`Удаление завершено`)
    } catch (error) {
      message.error('Удаление не завершено')
    }
  }

  return (
    <Grid>
      {items.map((car) => (
        <Grid.Col key={car.id} span={6}>
          <CarCard
            handleDeleteCar={handleDeleteCar}
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
