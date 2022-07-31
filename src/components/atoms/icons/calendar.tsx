import React, { CSSProperties } from 'react';

import Icon from '@icons/calendar.svg';

type TProps = {
  style?: CSSProperties;
  className?: string;
};

export default ({ style, className }: TProps): React.ReactElement => (
  <Icon className={className} style={style} />
);
