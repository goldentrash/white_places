import React, {
  useState,
  Fragment,
  cloneElement,
  ReactElement,
  MouseEvent,
} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    paper: {
      '& a': { color: 'inherit', textDecoration: 'none' },
    },
  })
);

export type PopoverMenuProps = {
  button: ReactElement;
  items: ReactElement[];
};
export const PopoverMenu = ({
  button,
  items,
  ...otherProps
}: PopoverMenuProps): ReactElement => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      {cloneElement(button, { ...otherProps, onClick: handleClick })}
      <Menu
        classes={{ paper: classes.paper }}
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={anchorEl !== null}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {items.map((item) => (
          <MenuItem key={item.key}>{item}</MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
