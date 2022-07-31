import React, {
  ChangeEvent,
  FocusEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
} from 'react';

import styles from './Input.module.scss';

type TDefaultInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
/* type TDefaultLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> */

type TProps = TDefaultInputProps & {
  onTextChange?: (value: string) => void;
  onFocusChange?: (value: boolean) => void;
  onEnter?: () => void;
};

export const Input = forwardRef<HTMLInputElement, TProps>(
  (
    {
      type = 'text',
      onChange,
      onFocusChange,
      onFocus,
      onBlur,
      onTextChange,
      onEnter,
      className,
      ...restProps
    },
    ref,
  ) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter();
    };

    const onFocusCallback = (e: FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(e);
      onFocusChange && onFocusChange(true);
    };
    const onBlurCallback = (e: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);
      onFocusChange && onFocusChange(false);
    };

    return (
      <input
        ref={ref}
        type={type}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={`${styles['input']} ${className}`}
        {...restProps}
      />
    );
  },
);
