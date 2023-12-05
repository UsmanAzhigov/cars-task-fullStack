'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button, Title } from '@mantine/core'

import styles from './login.module.scss'
import { loginUser } from '@/app/actions'

interface FormValues {
  email: string
  password: string
}

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async (data: FormValues) => {
    try {
      const token = await loginUser(data.email, data.password)
      localStorage.setItem('token', token)
      router.push('/')
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Title order={1}>Авторизация</Title>
      <form className={styles.formContainer} onSubmit={handleLogin}>
        <Input
          type="email"
          label="Email"
          placeholder="Введите ваш email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          type="password"
          label="Пароль"
          placeholder="Введите ваш пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit" color="green">
            Авторизация
          </Button>
          <Link href="/">
            <Button>Назад</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
