import React, { ReactElement } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Menu } from 'components';
import { urlBuilder } from 'helper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    titleTypography: {
      margin: theme.spacing(0, 1),
    },
    statusChip: {
      marginLeft: theme.spacing(1),
    },
    navTab: {
      textTransform: 'capitalize',
    },
  })
);

const TitleAndBadges = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h4"
        display="inline"
        classes={{ root: classes.titleTypography }}
      >
        Sample Project Title
      </Typography>
      <Chip
        classes={{ root: classes.statusChip }}
        color="secondary"
        size="small"
        variant="outlined"
        clickable={false}
        label={'active'}
      />
    </div>
  );
};

const LinksAndMenu = (): ReactElement => {
  const links = [
    { name: 'homepages', href: '/' },
    { name: 'github', href: '/' },
  ];

  return (
    <Menu>
      {links.map(({ name, href }) => {
        return (
          <Menu.Item key={name} href={href}>
            {name}
          </Menu.Item>
        );
      })}

      <Menu.Item>Follow</Menu.Item>
      <Menu.Item>Point Shop</Menu.Item>
    </Menu>
  );
};

const NavTabs = (): ReactElement => {
  return (
    <Tabs value={false}>
      <Tab
        label="Documents"
        // activeClassName={}
        component={NavLink}
        to={urlBuilder.documents('asdf')}
      />
      <Tab label="Followers" component={NavLink} to="" />
      <Tab label="Timeline" component={NavLink} to="" />
    </Tabs>
  );
};

export const ProjectRoot = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar classes={{ root: classes.toolbar }}>
          <TitleAndBadges />
          <LinksAndMenu />
        </Toolbar>
        <NavTabs />
      </AppBar>

      <Outlet />
    </div>
  );
};
