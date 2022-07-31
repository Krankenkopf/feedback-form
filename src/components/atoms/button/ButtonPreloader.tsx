import React from 'react';

import styles from './ButtonPreloader.module.scss';

export const ButtonPreloader = () => (
  <div className={styles['container']}>
    <div className={styles['ball-1']} />
    <div className={styles['ball-2']} />
    <div className={styles['ball-3']} />
  </div>
);
