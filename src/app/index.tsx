import React, { ReactElement } from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Path, Url } from './routes';
import { NotFound } from './notFound';
import { Project } from './project';
import { Introduction } from './introduction';
import { SearchBox, PopoverMenu } from 'components';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandLink: {
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

type BrandLinkProps = {
  brandTitle: string;
};
const BrandLink = ({ brandTitle }: BrandLinkProps): ReactElement => {
  const classes = useStyles();

  // will use apollo local variables
  const isLogin = false;

  return (
    <Link
      variant="h6"
      component={RouterLink}
      to={isLogin ? Url.Profile('') : Url.Introduction()}
      classes={{ root: classes.brandLink }}
    >
      {brandTitle}
    </Link>
  );
};

const AccountMenu = (): ReactElement => {
  // will use apollo local variables
  const isLogin = false;

  const userMenu: ReactElement[] = [
    <button disabled key="logOut">
      Log Out
    </button>,
  ];
  const guestMenu: ReactElement[] = [
    <button disabled key="githubLogIng">
      Sign in with GitHub
    </button>,
  ];

  return (
    <PopoverMenu
      button={
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      }
      items={isLogin ? userMenu : guestMenu}
    />
  );
};

export const App = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
          <BrandLink brandTitle="White Places" />
          <div>
            <SearchBox disabled placeholder="search project" />
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path={Path.NotFound} element={<NotFound />} />
        <Route path={Path.Introduction} element={<Introduction />} />
        <Route path={Path.Project} element={<Project />} />
      </Routes>
    </div>
  );
};
