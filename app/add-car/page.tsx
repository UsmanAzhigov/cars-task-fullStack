'use client'

import Link from 'next/link'
import { message } from 'antd'
import { useForm } from 'react-hook-form'
import styles from './add-car.module.scss'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CreateCartFormValues } from './add-car.types'
import { createAuto, getEquipmentOptions } from '@/app/actions'
import { Input, Select, Button, Title } from '@mantine/core'

const AddForm: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateCartFormValues>({
      defaultValues: {
        imageUrl: '',
        brand: '',
        modelName: '',
        price: '',
        year: '',
        color: '',
        equipment: [1, 2, 3, 4, 5],
        engineType: '',
        transmission: '',
      },
    })

  const [equipmentOptions, setEquipmentOptions] = useState<string[]>([])

  useEffect(() => {
    async function fetchEquipmentOptions() {
      const options = await getEquipmentOptions()
      setEquipmentOptions(options)
    }
    setValue('equipment', [1])
    setValue('engineType', '')
    setValue('transmission', '')
    fetchEquipmentOptions()
  }, [])

  const onSubmit = async (formData: CreateCartFormValues) => {
    try {
      await createAuto(formData)
      message.succes('Авто добавлено')
      router.push('/')
    } catch (error) {
      message.error('Не удалось создать')
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Title>Добавить авто:</Title>
      <Input placeholder="Ссылка на картинку" {...register('imageUrl')} />
      <Input placeholder="Бренд" {...register('brand')} />
      <Input placeholder="Название модели" {...register('modelName')} />
      <Input placeholder="Цена" {...register('price')} />
      <Input placeholder="Год выпуска" {...register('year')} />
      <Input placeholder="Цвет" {...register('color')} />
      <Input placeholder="Запас хода" {...register('powerReserve')} />
      <Select
        label="Комплектация"
        data={equipmentOptions}
        {...register('equipment')}
        value={getValues('equipment')}
        onChange={(value) => setValue('equipment', value)}
      />
      <Select
        label="Тип двигателя"
        data={['GAS', 'DIESEL', 'ELECTOR']}
        {...register('engineType')}
        value={getValues('engineType')}
        onChange={(value) => setValue('engineType', value)}
      />
      <Select
        label="Трансмиссия"
        data={['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC']}
        {...register('transmission')}
        value={getValues('transmission')}
        onChange={(value) => setValue('transmission', value)}
      />
      <div className={styles.btnGroup}>
        <Button color="green" type="submit">
          Создать
        </Button>
        <Link href="/">
          <Button>Назад</Button>
        </Link>
      </div>
    </form>
  )
}

export default AddForm
