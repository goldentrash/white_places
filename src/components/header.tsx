import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';

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
  })
);

const NavLink = (): ReactElement => {
  const { brandLink } = useStyles();

  return (
    <Link variant="h6" component={RouterLink} to="/" className={brandLink}>
      White Places
    </Link>
  );
};

const NavIcons = (): ReactElement => {
  return (
    <div>
      <IconButton component={RouterLink} to="/search">
        <SearchIcon />
      </IconButton>
      <IconButton component="a" href="/">
        <AccountCircleIcon />
      </IconButton>
    </div>
  );
};

const Header = (): ReactElement => {
  const { toolbar } = useStyles();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar variant="dense" className={toolbar}>
        <NavLink />
        <NavIcons />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
