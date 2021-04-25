import React, { ReactElement, ElementType } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export const MenuButton = <C extends ElementType>(
  props: ButtonProps<C, { component?: C }>
): ReactElement => {
  const { children, ...otherProps } = props;

  return (
    <Button variant="outlined" size="small" {...otherProps}>
      {children}
    </Button>
  );
};
