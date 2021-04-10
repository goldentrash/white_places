import React, { ReactElement, useState, Fragment, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandLink: {
      flex: 'none',
      margin: theme.spacing(1, 1.5),
      '&:hover': {
        textDecoration: 'none',
      },
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    popover: {
      '& a': { color: 'inherit', textDecoration: 'none' },
    },
  })
);

const Header = (): ReactElement => {
  const styles = useStyles();

  const brandLink = (
    <Link
      variant="h6"
      component={RouterLink}
      to="/"
      className={styles.brandLink}
    >
      White Places
    </Link>
  );

  const searchIconButton = (
    <IconButton component={RouterLink} to="/search">
      <SearchIcon />
    </IconButton>
  );

  const [
    accountMenuAnchor,
    setAccountMenuAnchor,
  ] = useState<HTMLButtonElement | null>(null);
  const openAccountMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAccountMenuAnchor(event.currentTarget);
  };
  const closeAccountMenu = (): void => {
    setAccountMenuAnchor(null);
  };
  const accountIconButton = (
    <Fragment>
      <IconButton onClick={openAccountMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        className={styles.popover}
        keepMounted
        anchorEl={accountMenuAnchor}
        getContentAnchorEl={null}
        open={accountMenuAnchor !== null}
        onClose={closeAccountMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem>
          <a href="/">Sign in with GitHub</a>
        </MenuItem>
      </Menu>
    </Fragment>
  );

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar variant="dense" className={styles.toolbar}>
        <div>{brandLink}</div>
        <div>
          {searchIconButton}
          {accountIconButton}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
