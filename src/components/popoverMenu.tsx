import React, {
  ReactNode,
  useState,
  Fragment,
  cloneElement,
  ReactElement,
  MouseEvent,
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
  children?: ReactNode;
};

export const PopoverMenu = (props: PopoverMenuProps): ReactElement => {
  const styles = useStyles();

  const { buttonEl, children, ...otherProps } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      {cloneElement(buttonEl, { ...otherProps, onClick: handleClick })}
      <Menu
        className={styles.menu}
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={anchorEl !== null}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {children}
      </Menu>
    </Fragment>
  );
};
