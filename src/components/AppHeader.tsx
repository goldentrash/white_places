import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import SearchBox from 'src/components/searchBox';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import urlBuilder from 'src/helpers/urlBuilder';
import { APP_NAME } from 'src/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brandLink: {
      margin: theme.spacing(1, 1.5),
    },
    toolbar: {
      justifyContent: 'space-between',
    },
  })
);

type AppHeaderProps = {
  user: { id: string } | null;
};
export const AppHeader = ({ user }: AppHeaderProps): ReactElement => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
        <Link
          classes={{ root: classes.brandLink }}
          variant="h6"
          underline="none"
          component={RouterLink}
          to={urlBuilder.main()}
        >
          {APP_NAME}
        </Link>
        <div>
          <SearchBox placeholder="프로젝트 검색" />
          {user ? (
            <Button
              variant="contained"
              component={RouterLink}
              to={urlBuilder.profile({ userID: user.id })}
            >
              프로필
            </Button>
          ) : (
            <Button
              variant="contained"
              component={RouterLink}
              to={urlBuilder.auth()}
            >
              로그인
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default AppHeader;
