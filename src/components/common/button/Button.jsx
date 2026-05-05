// src/components/ui/Button.jsx
import React, { useState } from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  icon = null,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  isLoading = false
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e) => {
    if (disabled || isLoading) return;
    
    // Add clicked state animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClasses = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ''}
    ${disabled ? styles.disabled : ''}
    ${isLoading ? styles.loading : ''}
    ${isClicked ? styles.clicked : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : (
        icon && <span className={styles.icon}>{icon}</span>
      )}
      <span>{isLoading ? 'Cargando...' : children}</span>
    </button>
  );
};

export default Button;