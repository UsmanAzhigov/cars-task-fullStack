import React, { ReactNode } from 'react';
import styles from '@/components/car-card/car-card.module.scss';

interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.editButton}>{children}</button>;
};

export default Button;
