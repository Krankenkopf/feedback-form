// TODO: need decomposition with base field

import React from 'react';

import { Textarea } from '@components/atoms';

import styles from './TextareaField.module.scss';

type TProps = {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
};

export const TextareaField = (props: TProps) => {
  const { name, label, value, placeholder, maxLength, error, onChange, onBlur } = props;
  const onTextChange = (text: string) => {
    onChange(name, text);
  };

  const onFocusChange = (state: boolean) => {
    !state && onBlur(name);
  };
  return (
    <div className={styles['field']}>
      <div className={styles['field__label']}>{label}</div>
      <div className={styles['field__input']}>
        <Textarea
          className={styles['textarea']}
          name={name}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onTextChange={onTextChange}
          onFocusChange={state => onFocusChange(state)}
        />
      </div>
      <span className={styles['field__error']}>{error}</span>
    </div>
  );
};
