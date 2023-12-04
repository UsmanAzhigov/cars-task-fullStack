'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { Button } from '@mantine/core'
import styles from './login.module.scss'
import { loginUser } from '@/app/actions'

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async () => {
    const formattedData = Object.entries({ email, password })
    try {
      //@ts-ignore
      await loginUser(formattedData)
      router.push('/')
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Авторизация</h1>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Введите ваш email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          placeholder="Введите ваш пароль"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.buttonGroup}>
        <Button onClick={handleLogin}>Авторизация</Button>
        <Link href="/">
          <Button>Назад</Button>
        </Link>
      </div>
    </div>
  )
}

export default Login
