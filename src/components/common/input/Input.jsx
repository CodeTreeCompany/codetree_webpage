// src/components/ui/Input.jsx
import React from 'react';
import styles from '../../../styles/components/ui/input.css';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon = null,
  helperText,
  className = '',
  ...props
}) => {
  const inputClasses = `
    ${styles.input}
    ${error ? styles.error : ''}
    ${icon ? styles.hasIcon : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && <span className={styles.iconLeft}>{icon}</span>}
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className={styles.helperText}>{helperText}</p>
      )}
      {error && (
        <p className={styles.errorText}>{error}</p>
      )}
    </div>
  );
};

export default Input;