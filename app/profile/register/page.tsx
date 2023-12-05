'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button, Title } from '@mantine/core'

import styles from './register.module.scss'
import { createUser } from '@/app/actions'

interface FormValues {
  fullName: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const router = useRouter()

  const handleRegister = async (data: FormValues) => {
    try {
      const token = await createUser(data)
      localStorage.setItem('token', token)
      router.push('/')
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Title order={1}>Регистрация</Title>
      <form className={styles.formContainer} onSubmit={handleRegister}>
        <Input
          label="Имя"
          placeholder="Введите полное имя"
          required
          id="fullName"
          name="fullName"
          autoComplete="off"
        />
        <Input
          type="email"
          label="Email"
          placeholder="Введите ваш email"
          required
          id="email"
          name="email"
          autoComplete="off"
          validations={[
            {
              rule: 'required',
              message: 'Email обязателен',
            },
            {
              rule: 'email',
              message: 'Некорректный email',
            },
          ]}
        />
        <Input
          type="password"
          label="Пароль"
          placeholder="Введите ваш пароль"
          required
          id="password"
          name="password"
          autoComplete="new-password"
          validations={[
            {
              rule: 'required',
              message: 'Пароль обязателен',
            },
            {
              rule: 'minLength',
              value: 6,
              message: 'Минимальная длина пароля - 6 символов',
            },
          ]}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit" color="green">
            Регистрация
          </Button>
          <Link href="/">
            <Button>Назад</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
