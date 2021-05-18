import React, { ReactElement, ReactNode, ElementType } from 'react';
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
export default Menu;

import Item, { ItemProps } from './item';
export type MenuItemProps<Component extends ElementType> = ItemProps<Component>;
Menu.Item = Item;
