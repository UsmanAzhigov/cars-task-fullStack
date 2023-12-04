'use client'

import { Select } from '@mantine/core'
import { useRouter } from 'next/navigation'

export const Filters: React.FC = () => {
  const router = useRouter()

  return (
    <Select
      placeholder="Цена"
      onChange={(value) => router.push(`/?sortBy=${value}`)}
      data={[
        {
          value: 'price',
          label: 'Цена',
        },
        {
          value: 'year',
          label: 'Год',
        },
      ]}
    />
  )
}
