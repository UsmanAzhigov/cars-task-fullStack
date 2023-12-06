'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './edit.module.scss'

import { message } from 'antd'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input, Select, Button, Title } from '@mantine/core'
import { getEquipmentOptions, updateAuto } from '@/app/actions'
import { CreateCartFormValues } from '../.././add-car/add-cart.types'
interface AddFormProps {
  params: {
    id: string
  }
}
const EditCar: React.FC<AddFormProps> = ({ params }) => {
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
        equipment: [],
        engineType: '',
        transmission: '',
      },
    })

  const [equipmentOptions, setEquipmentOptions] = React.useState<string[]>([])

  useEffect(() => {
    async function fetchEquipmentOptions() {
      const options = await getEquipmentOptions()
      setEquipmentOptions(options)
    }
    setValue('equipment', [])
    setValue('engineType', '')
    setValue('transmission', '')

    fetchEquipmentOptions()
  }, [])

  const onSubmit = async (formData: CreateCartFormValues) => {
    try {
      await updateAuto(params.id, formData)
      router.push('/')
      message.succes('Изменение прошло успешно')
    } catch (error) {
      message.error('Не удалось изменить')
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Title>Изменить авто:</Title>
      <Input
        required={true}
        placeholder="Ссылка на картинку"
        {...register('imageUrl')}
      />
      <Input required={true} placeholder="Бренд" {...register('brand')} />
      <Input
        required={true}
        placeholder="Название модели"
        {...register('modelName')}
      />
      <Input required={true} placeholder="Цена" {...register('price')} />
      <Input required={true} placeholder="Год выпуска" {...register('year')} />
      <Input required={true} placeholder="Цвет" {...register('color')} />
      <Input
        required={true}
        placeholder="Запас хода"
        {...register('powerReserve')}
      />
      <Select
        label="Комплектация"
        data={equipmentOptions}
        {...register('equipment')}
        value={getValues('equipment')}
        onChange={(value: string | null) => setValue('equipment', value)}
      />
      <Select
        label="Тип двигателя"
        data={['GAS', 'DIESEL', 'ELECTOR']}
        {...register('engineType')}
        value={getValues('engineType')}
        onChange={(value: string | null) => setValue('engineType', value)}
      />
      <Select
        label="Трансмиссия"
        data={['MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC']}
        {...register('transmission')}
        value={getValues('transmission')}
        onChange={(value: string | null) => setValue('transmission', value)}
      />
      <div className={styles.btnGroup}>
        <Button color="green" type="submit">
          Изменить
        </Button>
        <Link href="/">
          <Button>Назад</Button>
        </Link>
      </div>
    </form>
  )
}

export default EditCar
