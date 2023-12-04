'use client';

import React from 'react';
import Link from 'next/link';
import { router } from 'next/client';
import { useForm } from 'react-hook-form';
import { createAuto } from '@/app/actions';

import Button from '@/components/Button';
import styles from './add-car.module.scss';

const equipmentOptions = [
  'регулировка сидений',
  'регулировка руля',
  'бортовой компьютер',
  'камера заднего вида',
  'обогрев руля',
  'обогрев сидений',
  'тонированные стекла',
  'усилитель руля',
  'электростеклоподъемники',
  'темный салон',
  'кондиционер',
  'антипробуксовочная система',
  'подушка безопасности',
  'галогеновые фары',
  'противотуманные фары',
  'центральный замок',
  'штатный иммобилайзер',
];

const AddForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (formData) => {
    try {
      const formattedData = Object.entries(formData);
      await createAuto(formattedData);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
    router.push('/');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      {[
        {
          label: 'Ссылка на изображение',
          name: 'imageUrl',
          defaultValue: 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2023-09/1_3.jpg?itok=JTrbT080',
        },
        { label: 'Бренд', name: 'brand', defaultValue: '1' },
        { label: 'Название модели', name: 'modelName', defaultValue: 'R8' },
        { label: 'Цена', name: 'price', defaultValue: '1000000' },
        { label: 'Год выпуска', name: 'year', defaultValue: '2023' },
        { label: 'Цвет', name: 'color', defaultValue: 'Black' },
        {
          label: 'Тип двигателя',
          name: 'engineType',
          defaultValue: 'DIESEL',
          type: 'select',
          options: ['GAS', 'DIESEL', 'ELECTOR'],
        },
        {
          label: 'Трансмиссия',
          name: 'transmission',
          defaultValue: 'AUTOMATIC',
          type: 'select',
          options: ['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC'],
        },
        { label: 'Запас хода', name: 'powerReserve', defaultValue: '0' },
        { label: 'Комплектация', name: 'equipment', defaultValue: '', type: 'select', options: equipmentOptions },

      ].map(({ label, name, defaultValue, type, options }) => (
        <label key={name} className={styles.formLabel}>
          {label}:
          {type === 'select' ? (
            <select
              className={styles.formInput}
              name={name}
              {...register(name)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={styles.formInput}
              type='text'
              name={name}
              defaultValue={defaultValue}
              {...register(name)}
            />
          )}
        </label>
      ))}
      <Button type='submit'>Создать</Button>
      <Link style={{ marginLeft: '10px' }} href='/'><Button>Назад</Button></Link>
    </form>
  );
};

export default AddForm;