import React, { ReactElement } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import SearchBox from 'components/searchBox';
import PopoverMenu from 'components/popoverMenu';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import urlBuilder from 'helpers/urlBuilder';

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

type BrandLinkProps = {
  brandTitle: string;
};
const BrandLink = ({ brandTitle }: BrandLinkProps): ReactElement => {
  const classes = useStyles();

  return (
    <Link
      classes={{ root: classes.brandLink }}
      variant="h6"
      underline="none"
      component={RouterLink}
      to={urlBuilder.introduction()}
    >
      {brandTitle}
    </Link>
  );
};

const AccountMenu = (): ReactElement => {
  const guestMenu: {
    text: string;
    onClick?: () => void;
  }[] = [{ text: 'GitHub으로 로그인' }];

  return (
    <PopoverMenu
      button={
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      }
      items={guestMenu}
    />
  );
};

export const AppRoot = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar variant="dense" classes={{ root: classes.toolbar }}>
          <BrandLink brandTitle="White Places" />
          <div>
            <SearchBox placeholder="프로젝트 검색" />
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>

      <Outlet />
    </div>
  );
};
export default AppRoot;
