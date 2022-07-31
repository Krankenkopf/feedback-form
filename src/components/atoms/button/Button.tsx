import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styles from './Button.module.scss';
import { ButtonPreloader } from './ButtonPreloader';

type TDefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type TProps = TDefaultButtonProps & {
  mode?: 'text' | 'icon';
  backgroundImage?: boolean;
  isLoading?: boolean;
};

export const Button: React.FC<TProps> = props => {
  const { type = 'button', backgroundImage, className, isLoading, children, ...restProps } = props;
  let finalClassName = className || '';
  finalClassName = `${styles.button} ${finalClassName}`;

  if (backgroundImage) {
    finalClassName = `${'backgroundImage'} ${finalClassName}`;
  }

  return (
    <button type={type} className={finalClassName} {...restProps}>
      {isLoading ? <ButtonPreloader /> : children}
    </button>
  );
};
