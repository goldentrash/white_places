import React, { ReactElement } from 'react';
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  matchPath,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Menu from 'components/menu';
import urlBuilder from 'helpers/urlBuilder';

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

      <Menu.Item>Point Shop</Menu.Item>
      <Menu.Item>Follow</Menu.Item>
    </Menu>
  );
};

const NavTabs = (): ReactElement => {
  const currLocation = useLocation();

  const tabs = [
    {
      label: 'Documents',
      to: urlBuilder.documents('white_places'),
      value: 0,
    },
    { label: 'Followers', to: 'tt', value: 1 },
    { label: 'Timeline', to: '', value: 2 },
    { label: 'setting', to: 'dd', value: 3 },
  ];

  return (
    <Tabs
      value={
        tabs.find(({ to }) => matchPath(`${to}/*`, currLocation.pathname))
          ?.value ?? false
      }
    >
      {tabs.map(({ label, to, value }) => (
        <Tab
          key={value}
          value={value}
          label={label}
          component={RouterLink}
          to={to}
        />
      ))}
    </Tabs>
  );
};

export const ProjectRoot = (): ReactElement => {
  const classes = useStyles();

  // if project exist!
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
export default ProjectRoot;
