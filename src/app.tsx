import React, { FunctionComponent } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  Link as RouterLink,
} from 'react-router-dom';
import qs from 'qs';
import { IconButton, MenuItem, AppBar, Link, Toolbar } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Search as SearchPage,
  searchPath,
  searchUrl,
  Project as ProjectPage,
  projectPath,
  NotFound as NotFoundPage,
} from './pages';
import { Providers } from './providers';
import { SearchBox, SearchEventHandler, PopoverMenu } from 'components';

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

const programTitle = 'White Places';
const mainPageUrl = '/';

export const App: FunctionComponent = () => {
  const styles = useStyles();

  const history = useHistory();
  const handleSearch: SearchEventHandler = (text) => {
    history.push({
      pathname: searchUrl,
      search: qs.stringify({ text }, { addQueryPrefix: true }),
    });
  };

  return (
    <Providers>
      <BrowserRouter>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar variant="dense" className={styles.toolbar}>
            <Link
              variant="h6"
              component={RouterLink}
              to={mainPageUrl}
              className={styles.brandLink}
            >
              {programTitle}
            </Link>
            <div>
              <SearchBox placeholder="search project" onSearch={handleSearch} />
              <PopoverMenu
                buttonEl={
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                }
              >
                <MenuItem>
                  <a href="/">Sign in with GitHub</a>
                </MenuItem>
              </PopoverMenu>
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path={searchPath} component={SearchPage} />
          <Route path={projectPath} component={ProjectPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Providers>
  );
};
