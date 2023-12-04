import React, { MouseEvent, ReactNode } from 'react';
import styles from '@/components/car-card/car-card.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?:'submit' | 'reset' | 'button' | undefined,
}

const Button: React.FC<ButtonProps> = ({ children, type,onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.editButton}>
      {children}
    </button>
  );
};

export default Button;
