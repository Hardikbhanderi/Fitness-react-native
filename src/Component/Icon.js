import React from 'react';
// import { useTheme } from 'src/theme';
import { getIconType } from './getIconType';
import { Props } from './types';

const Icon  = (props) => {
  const { name = '', family = '', size, color = 'black', ...rest } = props;
  // const theme = useTheme();
  const IconInstance = getIconType(family);
  return (
    <IconInstance
      name={name}
      size={size || 20}
      // color={theme.colors[color] || theme.colors.default}
      {...rest}
    />
  );
};

export default Icon;
