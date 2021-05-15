import React, { ReactElement, ReactNode } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

export type MenuProps = {
  children?: ReactNode;
};
export const Menu = ({ children }: MenuProps): ReactElement => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export { ItemProps as MenuItemProps } from './item';
import { Item } from './item';
Menu.Item = Item;

export { ButtonGroupProps as MenuItemGroupProps } from '@material-ui/core/ButtonGroup';
import ButtonGroup from '@material-ui/core/ButtonGroup';
Menu.ItemGroup = ButtonGroup;
