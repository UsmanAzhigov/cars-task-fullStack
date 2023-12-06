'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './edit.module.scss'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { CreateCartFormValues } from './add-car.types'
import { Input, Select, Button, Title } from '@mantine/core'
import { getEquipmentOptions, updateAuto } from '@/app/actions'

const AddForm: React.FC = ({ params }) => {
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
        equipment: [1],
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
    setValue('equipment', [1])
    setValue('engineType', 'Не выбрано')
    setValue('transmission', 'Не выбрано')
    fetchEquipmentOptions()
  }, [])

  const onSubmit = async (formData: CreateCartFormValues) => {
    try {
      await updateAuto(params.id, formData)
      router.push('/')
    } catch (error) {
      alert('Error creating')
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
        required={true}
        label="Комплектация"
        data={equipmentOptions}
        {...register('equipment')}
        value={[1]}
      />
      <Select
        required={true}
        label="Тип двигателя"
        data={['Не выбрано', 'GAS', 'DIESEL', 'ELECTOR']}
        {...register('engineType')}
        value={getValues('engineType')}
        onChange={(value) => setValue('engineType', value)}
      />
      <Select
        required={true}
        label="Трансмиссия"
        data={['Не выбрано', 'MANUAL', 'AUTOMATIC', 'SEMI_AUTOMATIC']}
        {...register('transmission')}
        value={getValues('transmission')}
        onChange={(value) => setValue('transmission', value)}
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

export default AddForm
