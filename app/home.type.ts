export interface HomeProps {
  searchParams: {
    brand: string
    orderBy: 'asc' | 'desc'
    sortBy: string
  }
  user: {
    id: number
    fullName: string
    email: string
  } | null
}
