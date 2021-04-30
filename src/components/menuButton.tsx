import React, { ReactElement, ElementType } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    label: {
      textTransform: 'capitalize',
    },
  })
);

export const MenuButton = <C extends ElementType>(
  props: ButtonProps<C, { component?: C }>
): ReactElement => {
  const classes = useStyles();
  const { children, ...otherProps } = props;

  return (
    <Button
      classes={{ label: classes.label }}
      variant="outlined"
      size="small"
      {...otherProps}
    >
      {children}
    </Button>
  );
};
