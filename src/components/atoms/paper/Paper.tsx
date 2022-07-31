import React, { FC } from 'react';

import styles from './Paper.module.scss';

export const Paper: FC = ({ children }) => <div className={styles['paper']}>{children}</div>;
