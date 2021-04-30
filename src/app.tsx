import React, { ReactElement } from 'react';
import {
  Switch,
  Route,
  useHistory,
  Link as RouterLink,
} from 'react-router-dom';
import qs from 'qs';
import {
  IconButton,
  MenuItem,
  AppBar,
  Link,
  LinkProps,
  Toolbar,
} from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Search as SearchPage,
  Project as ProjectPage,
  NotFound as NotFoundPage,
} from './pages';
import { SearchBox, PopoverMenu } from 'components';

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

const enum Path {
  Main = '/',
  Search = '/search',
  Project = '/project/:projectId',
}

const BrandLink = (
  props: Omit<LinkProps, 'children' | 'title'> & { title: string }
) => {
  const classes = useStyles();

  const { title, ...otherProps } = props;

  return (
    <Link
      variant="h6"
      component={RouterLink}
      to={Path.Main}
      classes={{ root: classes.brandLink }}
      {...otherProps}
    >
      {title}
    </Link>
  );
};

export const App = (): ReactElement => {
  const classes = useStyles();

  const history = useHistory();
  const handleSearch = (text: string): void => {
    history.push({
      pathname: Path.Search,
      search: qs.stringify({ text }, { addQueryPrefix: true }),
    });
  };

  return (
    <div>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
          <BrandLink title="White Palces" />
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
        <Route path={Path.Search} component={SearchPage} />
        <Route path={Path.Project} component={ProjectPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};
