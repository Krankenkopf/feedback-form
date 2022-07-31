import React, { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import styles from './Select.module.scss';

type TDefaultSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type TSelectProps<T> = TDefaultSelectProps & {
  options: Array<string | number>;
  titles?: Array<string>;
  onChangeOption?: (option: T) => void;
};
export const Select = <TValue extends string | number>({
  name,
  titles,
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}: TSelectProps<TValue>) => {
  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value as TValue);
  };

  const mappedOptions = options.map((option, i) => (
    <option key={i} value={option}>
      {titles ? titles[i] : option}
    </option>
  ));

  return (
    <select className={styles['select']} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  );
};
