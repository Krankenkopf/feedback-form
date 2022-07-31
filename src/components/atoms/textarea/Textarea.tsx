import React, {
  ChangeEvent,
  FocusEvent,
  DetailedHTMLProps,
  KeyboardEvent,
  TextareaHTMLAttributes,
  useRef,
  useEffect,
} from 'react';

import cn from 'classnames';

import styles from './Textarea.module.scss';

type TDefaultTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
/* type TDefaultLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> */

type TProps = TDefaultTextareaProps & {
  onTextChange?: (value: string) => void;
  onFocusChange?: (value: boolean) => void;
  onEnter?: () => void;
};

export const Textarea = (props: TProps) => {
  const {
    value,
    onChange,
    onFocusChange,
    onFocus,
    onBlur,
    onTextChange,
    onKeyDown,
    onEnter,
    name,
    className,
    maxLength,
    placeholder,
    ...restProps
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `calc(${scrollHeight}px + 1em)`;
    }
  }, [value]);

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
    onTextChange && onTextChange(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown && onKeyDown(e);
    onEnter && e.key === 'Enter' && onEnter();
  };

  const onFocusCallback = (e: FocusEvent<HTMLTextAreaElement>) => {
    onFocus && onFocus(e);
    onFocusChange && onFocusChange(true);
  };
  const onBlurCallback = (e: FocusEvent<HTMLTextAreaElement>) => {
    onBlur && onBlur(e);
    onFocusChange && onFocusChange(false);
  };

  const currentLength = textareaRef.current?.value.length || 0;

  const symbolInfo = (
    <div
      className={cn(styles['symbols-info'], {
        [styles['_limit']]: currentLength === maxLength,
      })}>{`${currentLength}${maxLength ? `/${maxLength}` : ''}`}</div>
  );

  return (
    <div className={styles['container']}>
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        name={name}
        value={value}
        maxLength={maxLength}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={className}
        style={{ width: '100%' }}
        {...restProps}
      />
      {symbolInfo}
    </div>
  );
};
