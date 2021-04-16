import React, {
  ReactElement,
  useState,
  Fragment,
  MouseEvent,
  FormEvent,
  ChangeEvent,
} from 'react';
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
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandLink: {
      margin: theme.spacing(1, 1.5),

      '&:hover': {
        textDecoration: 'none',
      },
    },
    searchForm: {
      display: 'inline-block',
    },
    searchInput: {
      marginLeft: theme.spacing(1),
      width: '15ch',

      '&::-webkit-search-cancel-button,&::-webkit-search-decoration,&::-webkit-search-results-button,&::-webkit-search-results-decoration': {
        '-webkit-appearance': 'none',
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

  const [searchTarget, setSearchTarget] = useState<string>('');
  const search = (event: FormEvent): void => {
    event.preventDefault();

    // TODO
    console.log(searchTarget);
    setSearchTarget('');
  };
  const updateSearchTarget = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTarget(event.currentTarget.value);
  };
  const searchBox = (
    <Paper
      component="form"
      className={styles.searchForm}
      onSubmit={search}
      variant="outlined"
    >
      <InputBase
        value={searchTarget}
        placeholder="search projects"
        onChange={updateSearchTarget}
        type="search"
        classes={{ input: styles.searchInput }}
        endAdornment={null}
      />
      <IconButton type="submit" size="small">
        <SearchIcon />
      </IconButton>
    </Paper>
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
  const accountMenuButton = (
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
          {searchBox}
          {accountMenuButton}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
