import React, { ReactElement, ElementType, HTMLAttributes } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 'auto',
      display: 'flex',

      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

export type MenuProps = HTMLAttributes<HTMLDivElement>;
export const Menu = ({
  children,
  className,
  ...otherProps
}: MenuProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)} {...otherProps}>
      {children}
    </div>
  );
};
export default Menu;

import Item, { ItemProps } from './item';
export type MenuItemProps<Component extends ElementType> = ItemProps<Component>;
Menu.Item = Item;
