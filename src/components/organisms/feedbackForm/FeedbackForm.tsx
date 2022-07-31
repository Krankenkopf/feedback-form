import React, { useState } from 'react';

import { Button } from '@components/atoms';
import {
  CalendarIcon,
  CheckIcon,
  CircleIcon,
  EnvelopeIcon,
  ExclamationIcon,
  PhoneIcon,
  UserIcon,
} from '@components/atoms/icons';
import { DateField } from '@components/molecules/dateField/DateField';
import { MaskField } from '@components/molecules/maskField/MaskField';
import { TextareaField } from '@components/molecules/textareaField/TextareaField';
import { TextField } from '@components/molecules/textField/TextField';
import { Nullable } from '@types';

import styles from './FeedbackForm.module.scss';

enum FieldName {
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
  BIRTH_DATE = 'birthDate',
  MESSAGE = 'message',
}

enum FieldError {
  REQUIRED = 'Field is required',
  MINMAX_NAME = 'Name and lastName must be between 3 and 30 chars',
  INVALID_EMAIL = 'Invalid email address',
  INVALID_PHONE_NUMBER = 'Some digits in phone number are missed',
  MINMAX_MESSAGE = 'Message must be between 10 and 300 chars',
}

enum FormMessage {
  REQUIRED = 'All fields are required',
  INVALID_FIELD = 'Fill all the fields correctly',
  SERVER_ERROR = 'Error, try again',
  SERVER_SUCCESS = 'Success',
}

const formatters = {
  [FieldName.NAME]: (value: string) => {
    let formatted = value
      .toUpperCase()
      .trimStart()
      .replace(/[^a-z\s]/gi, '')
      .replace(/ {2}/, ' ');
    const splitted = formatted.split(' ');
    if (splitted.length > 2) {
      formatted = `${splitted[0]} ${splitted[1]}`;
    }
    return formatted;
  },
  [FieldName.EMAIL]: (value: string) => value.replace(/^\./, '').replace(/\.{2}/, '.'),
} as Record<FieldName, (value: string) => string>;

const validators = {
  [FieldName.NAME]: (value: string) => {
    const isValid = /^.{3,30} .{3,30}$/.test(value);
    return isValid ? null : FieldError.MINMAX_NAME;
  },
  [FieldName.EMAIL]: (value: string) => {
    const isValid = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]+$/.test(value);
    return isValid ? null : FieldError.INVALID_EMAIL;
  },
  [FieldName.PHONE]: (value: string) => {
    const isValid = /^\+7 [(]{1}[0-9]{3}[)]{0,1} [0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(value);
    return isValid ? null : FieldError.INVALID_PHONE_NUMBER;
  },
  [FieldName.BIRTH_DATE]: () => null,
  [FieldName.MESSAGE]: (value: string) => {
    const isValid = value.length >= 10 && value.length <= 300;
    return isValid ? null : FieldError.MINMAX_MESSAGE;
  },
};

const initialValues = {
  [FieldName.NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.PHONE]: '',
  [FieldName.BIRTH_DATE]: '',
  [FieldName.MESSAGE]: '',
};

export const FeedbackForm = () => {
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState<{ [key: string]: Nullable<FieldError> }>({});
  const [formError, setFormError] = useState<Nullable<FormMessage>>(null);
  const [formMessage, setFormMessage] = useState<Nullable<FormMessage>>(null);
  const [isSending, setIsSending] = useState(false);

  const [dirtyFields, setDirtyFields] = useState<{ [key: string]: true | undefined }>({});
  const [visitedFields, setVisitedFields] = useState<{ [key: string]: true | undefined }>({});

  const onFieldChange = (name: FieldName, value: string) => {
    const formatted = formatters[name] ? formatters[name](value) : value;
    if (values[name] !== formatted) {
      setValues({ ...values, [name]: formatted });
      if (!dirtyFields[name] && visitedFields[name]) {
        setDirtyFields({ ...dirtyFields, [name]: true });
      }
      if (formatted && dirtyFields[name]) {
        setErrors({ ...errors, [name]: validators[name](formatted) });
      }
      if (!formatted && errors[name] !== FieldError.REQUIRED) {
        setErrors({ ...errors, [name]: FieldError.REQUIRED });
      }
    }
  };

  const onFieldBlur = (name: FieldName) => {
    if (!values[name] && dirtyFields[name]) {
      setErrors({ ...errors, [name]: FieldError.REQUIRED });
    }
    if (!visitedFields[name] && values[name]) {
      setVisitedFields({ ...visitedFields, [name]: true });
    }
    if (values[name]) {
      setErrors({ ...errors, [name]: validators[name](values[name]) });
      setDirtyFields({ ...dirtyFields, [name]: true });
    }
  };

  const getFieldError = (name: FieldName) => dirtyFields[name] && (errors[name] ?? undefined);
  const getFieldSuccess = (name: FieldName) => dirtyFields[name] && (!errors[name] || undefined);

  const errorIcon = (
    <>
      <CircleIcon className="icon form-icon _full _error" />
      <ExclamationIcon className="icon form-icon _error" />
    </>
  );

  return (
    <form className={styles['form']}>
      <TextField
        label="Name"
        name={FieldName.NAME}
        value={values[FieldName.NAME]}
        error={getFieldError(FieldName.NAME)}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
        icon={
          getFieldError(FieldName.NAME) ? (
            <>
              <UserIcon className="icon form-icon _faded" />
              {errorIcon}
            </>
          ) : (
            <UserIcon className="icon form-icon" />
          )
        }
        infoActionIcon={
          getFieldSuccess(FieldName.NAME) && <CheckIcon className="icon form-icon _success" />
        }
      />
      <TextField
        label="Email"
        name={FieldName.EMAIL}
        value={values[FieldName.EMAIL]}
        error={getFieldError(FieldName.EMAIL)}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
        icon={
          getFieldError(FieldName.EMAIL) ? (
            <>
              <EnvelopeIcon className="icon form-icon _faded" />
              {errorIcon}
            </>
          ) : (
            <EnvelopeIcon className="icon form-icon" />
          )
        }
        infoActionIcon={
          getFieldSuccess(FieldName.EMAIL) && <CheckIcon className="icon form-icon _success" />
        }
      />
      <MaskField
        label="Phone"
        name={FieldName.PHONE}
        value={values[FieldName.PHONE]}
        type={'tel'}
        mask={'+7 (999) 999-99-99'}
        placeholder={'+7 (123) 456-78-90'}
        error={getFieldError(FieldName.PHONE)}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
        icon={
          getFieldError(FieldName.PHONE) ? (
            <>
              <PhoneIcon className="icon form-icon _faded" />
              {errorIcon}
            </>
          ) : (
            <PhoneIcon className="icon form-icon" />
          )
        }
        infoActionIcon={
          getFieldSuccess(FieldName.PHONE) && <CheckIcon className="icon form-icon _success" />
        }
      />
      <DateField
        label="Birth Date"
        name={FieldName.BIRTH_DATE}
        value={values[FieldName.BIRTH_DATE]}
        error={getFieldError(FieldName.BIRTH_DATE)}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
        icon={
          getFieldError(FieldName.BIRTH_DATE) ? (
            <>
              <CalendarIcon className="icon form-icon _faded" />
              {errorIcon}
            </>
          ) : (
            <CalendarIcon className="icon form-icon" />
          )
        }
        infoActionIcon={
          getFieldSuccess(FieldName.BIRTH_DATE) && <CheckIcon className="icon form-icon _success" />
        }
      />
      <TextareaField
        label="Message"
        name={FieldName.MESSAGE}
        value={values[FieldName.MESSAGE]}
        error={getFieldError(FieldName.MESSAGE)}
        maxLength={300}
        onChange={onFieldChange}
        onBlur={onFieldBlur}
      />
      <Button type="submit" isLoading={isSending} disabled={isSending}>
        Send
      </Button>
      {formError && <div className={styles['form__error']}>{formError}</div>}
      {formMessage && <div className={styles['form__message']}>{formMessage}</div>}
    </form>
  );
};
