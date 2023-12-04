'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { Button } from '@mantine/core'
import { createUser } from '@/app/actions'
import styles from './register.module.scss'

const Register: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const handleRegister = async () => {
    const formattedData = Object.entries({ fullName, email, password })
    try {
      //@ts-ignore
      await createUser(formattedData)
      router.push('/')
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Регистрация</h1>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Полное Имя</label>
        <input
          type="text"
          placeholder="Введите полное имя"
          className={styles.input}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Email</label>
        <input
          type="e-mail"
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
        <Button onClick={handleRegister}>Регистрация</Button>
        <Link href="/">
          <Button>Назад</Button>
        </Link>
      </div>
    </div>
  )
}

export default Register
