/* eslint-disable import/no-extraneous-dependencies */
// TODO: need decomposition with base field

import React, { ReactElement, useState } from 'react';

import { Button, Input, Select } from '@components/atoms';
import cn from 'classnames';
import { getMonth, getYear, format } from 'date-fns';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateField.module.scss';

const range = require('lodash/range');

type TProps = {
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  icon: ReactElement;
  infoActionIcon?: ReactElement;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
};

export const DateField = (props: TProps) => {
  const { name, label, value, placeholder, icon, infoActionIcon, error, onChange, onBlur } = props;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const years = range(1900, getYear(new Date()) + 1, 1) as number[];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const onDateChange = (date: Date) => {
    setStartDate(date);
    onChange(name, format(date, 'dd/MM/yyyy'));
  };
  const onFocusChange = (state: boolean) => {
    !state && onBlur(name);
    setIsFocused(state);
  };

  return (
    <div className={styles['field']}>
      <div className={styles['field__label']}>{label}</div>
      <div className={styles['field__input']}>
        <div className={styles['field__input-icon']}>{icon}</div>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {'<'}
              </Button>
              <Select value={getYear(date)} onChangeOption={changeYear} options={years} />
              <Select
                value={getMonth(date)}
                onChangeOption={changeMonth}
                options={months.map((_, i) => i)}
                titles={months}
              />
              <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {'>'}
              </Button>
            </div>
          )}
          showDisabledMonthNavigation
          selected={startDate}
          minDate={new Date('1900-01-01')}
          maxDate={new Date()}
          value={value}
          name={name}
          dateFormat="dd/MM/yyyy"
          onChange={onDateChange}
          onChangeRaw={e => e.preventDefault()}
          customInput={
            <Input
              value={value}
              className={styles['input']}
              placeholder={placeholder}
              onFocusChange={onFocusChange}
            />
          }
          fixedHeight
        />

        <div className={styles['field__input-icon']}>{infoActionIcon}</div>
        <div className={cn(styles['field__dash'], { [styles['_focused']]: isFocused })} />
      </div>
      <span className={styles['field__error']}>{error}</span>
    </div>
  );
};
