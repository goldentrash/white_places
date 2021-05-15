import React, { ReactElement } from 'react';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import StoreIcon from '@material-ui/icons/Store';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Menu } from 'components';
import { Path } from './routes';
import { Document } from './document';
import { Documents } from './documents';

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

  const { projectId } = useParams();
  const states = ['active'];

  return (
    <div>
      <Typography
        variant="h4"
        display="inline"
        classes={{ root: classes.titleTypography }}
      >
        Sample Project Title (ID: {projectId})
      </Typography>
      <Chip
        classes={{ root: classes.statusChip }}
        color="secondary"
        size="small"
        variant="outlined"
        clickable={false}
        icon={states.includes('active') ? <CheckIcon /> : <WarningIcon />}
        label={states.includes('active') ? 'active' : 'inactive'}
      />
    </div>
  );
};

const LinksAndMenu = (): ReactElement => {
  const links = [
    { name: 'homepages', href: '/' },
    { name: 'github', href: '/' },
  ];
  // will calcuateated by user query?
  const isFollowed = true;

  return (
    <Menu>
      {links.map(({ name, href }) => {
        return (
          <Menu.Item key={name} href={href}>
            {name}
          </Menu.Item>
        );
      })}

      <Menu.Item
        startIcon={isFollowed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      >
        Follow
      </Menu.Item>
      <Menu.Item startIcon={<StoreIcon />}>Point Shop</Menu.Item>
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
        to={Path.Documents}
      />
      <Tab label="Followers" component={NavLink} to={Path.Followers} />
      <Tab label="Timeline" component={NavLink} to={Path.Timeline} />
    </Tabs>
  );
};

export const Project = (): ReactElement => {
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

      <Routes>
        <Route path={Path.Document} element={<Document />} />
        <Route path={Path.Documents} element={<Documents />} />
      </Routes>
    </div>
  );
};
