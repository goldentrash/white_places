import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    brandLink: {
      flex: 'none',
      margin: theme.spacing(1, 1.5),
      '&:hover': {
        textDecoration: 'none',
      },
    },
    menuLink: {
      padding: theme.spacing(0.5, 1.5),
    },
  })
);

const Header = (): ReactElement => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Link
          variant="h6"
          component={RouterLink}
          to="/"
          className={classes.brandLink}
        >
          White Places
        </Link>
        <ButtonGroup color="primary" disableElevation variant="outlined">
          <Button
            component={RouterLink}
            to="/search"
            className={classes.menuLink}
          >
            Search
          </Button>
          <Button href="/" className={classes.menuLink}>
            Log In
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
