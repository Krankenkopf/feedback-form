// TODO: need decomposition with base field

import React, { HTMLInputTypeAttribute, ReactElement } from 'react';

import { Input } from '@components/atoms';

import styles from './TextField.module.scss';

type TProps = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  mask?: string;
  error?: string;
  icon: ReactElement;
  infoActionIcon?: ReactElement;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
};

export const TextField = (props: TProps) => {
  const {
    type = 'text',
    name,
    label,
    value,
    placeholder,
    icon,
    infoActionIcon,
    error,
    onChange,
    onBlur,
  } = props;
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
        <div className={styles['field__input-icon']}>{icon}</div>
        <Input
          type={type}
          name={name}
          className={styles['input']}
          value={value}
          placeholder={placeholder}
          onTextChange={onTextChange}
          onFocusChange={onFocusChange}
        />
        <div className={styles['field__input-icon']}>{infoActionIcon}</div>
        <div className={styles['field__dash']} />
      </div>
      <span className={styles['field__error']}>{error}</span>
    </div>
  );
};
