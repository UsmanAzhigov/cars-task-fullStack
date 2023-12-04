export interface Car {
  id: number;
  imageUrl: string;
  brand: {
    name: string;
  };
  modelName: string;
  price: number;
  year: number;
}

export interface CarCardProps {
  car: Car;
}