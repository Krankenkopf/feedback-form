// TODO: need decomposition with base field

import React, { ChangeEvent, HTMLInputTypeAttribute, ReactElement } from 'react';

import { Input } from '@components/atoms';

import styles from './MaskField.module.scss';

const InputMask = require('react-input-mask');

type TProps = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  mask: string;
  error?: string;
  icon: ReactElement;
  infoActionIcon?: ReactElement;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
};

export const MaskField = (props: TProps) => {
  const {
    type = 'text',
    name,
    label,
    value,
    placeholder,
    mask,
    icon,
    infoActionIcon,
    error,
    onChange,
    onBlur,
  } = props;
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(e.currentTarget.value);
    e.type !== 'focus' && onChange(name, e.currentTarget.value);
  };
  const onFocusChange = () => {
    onBlur(name);
  };
  return (
    <div className={styles['field']}>
      <div className={styles['field__label']}>{label}</div>
      <div className={styles['field__input']}>
        <div className={styles['field__input-icon']}>{icon}</div>
        <InputMask
          mask={mask}
          placeholder={placeholder}
          value={value}
          onChange={onTextChange}
          onBlur={onFocusChange}>
          {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
            <Input name={name} type={type} className={styles['input']} {...inputProps} />
          )}
        </InputMask>

        <div className={styles['field__input-icon']}>{infoActionIcon}</div>
        <div className={styles['field__dash']} />
      </div>
      <span className={styles['field__error']}>{error}</span>
    </div>
  );
};
