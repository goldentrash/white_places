import React, {
  FunctionComponent,
  useState,
  Fragment,
  MouseEventHandler,
  cloneElement,
  ReactElement,
} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    menu: {
      '& a': { color: 'inherit', textDecoration: 'none' },
    },
  })
);

type PopoverMenuProps = {
  buttonEl: ReactElement;
};

export const PopoverMenu: FunctionComponent<PopoverMenuProps> = (props) => {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      {cloneElement(props.buttonEl, { onClick: handleClick })}
      <Menu
        className={styles.menu}
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={anchorEl !== null}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {props.children}
      </Menu>
    </Fragment>
  );
};
