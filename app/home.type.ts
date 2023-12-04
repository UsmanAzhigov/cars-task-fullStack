export interface HomeProps {
  searchParams: {
    brand: string;
  };
  user: {
    id: number;
    fullName: string;
    email: string;
  } | null;
}