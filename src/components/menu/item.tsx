import React, { ReactElement, ElementType } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    label: {
      textTransform: 'capitalize',
    },
  })
);

export type ItemProps<Component extends ElementType> = Omit<
  ButtonProps<Component>,
  'classes'
>;
export const Item = <Component extends ElementType>({
  children,
  ...otherProps
}: ItemProps<Component>): ReactElement => {
  const classes = useStyles();

  return (
    <Button
      classes={{ label: classes.label }}
      variant="outlined"
      {...otherProps}
    >
      {children}
    </Button>
  );
};
export default Item;
