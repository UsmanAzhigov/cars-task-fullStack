import React from 'react';
import Link from 'next/link';
import styles from './car-card.module.scss';
import Button from '@/components/Button';


interface Car {
  id: number;
  imageUrl: string;
  brand: {
    name: string;
  };
  modelName: string;
  price: number;
  year: number;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({car}) => {
    return (
        <>
            <div className={styles.carCard} key={car.id}>
                    <Link href={`/cars/${car.id}`} key={car.id} prefetch>
                        <img className={styles.carImage} src={car.imageUrl} alt={car.brand.name}  />
                        <div className={styles.carDetails}>
                            <div className={styles.carBrand}>{car.brand.name}</div>
                            <div className={styles.carModel}>{car.modelName}</div>
                            <div className={styles.carPrice}>Стоимость: {car.price}</div>
                            <div className={styles.carYear}>Год выпуска: {car.year}</div>
                        </div>
                    </Link>
              <Link href={`/edit-car/${car.id}`}>
                <Button>Изменить</Button>
              </Link>
                </div>
           </>
    );
};

export default CarCard;
