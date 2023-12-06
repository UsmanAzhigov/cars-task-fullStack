'use client'

import { Select } from '@mantine/core'
import { useRouter } from 'next/navigation'

export const Sort: React.FC = () => {
  const router = useRouter()

  const handleSortChange = (value: string | null) => {
    if (value === 'reset') {
      router.push('/')
    } else {
      router.push(`/?sortBy=${value}`)
    }
  }

  return (
    <Select
      placeholder="Сортировка"
      onChange={(value: string | null) => handleSortChange(value)}
      data={[
        {
          value: 'price',
          label: 'Цена',
        },
        {
          value: 'year',
          label: 'Год',
        },
        {
          value: 'reset',
          label: 'Сбросить сортировку',
        },
      ]}
    />
  )
}
