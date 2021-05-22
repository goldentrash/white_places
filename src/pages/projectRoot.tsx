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
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import urlBuilder from 'helpers/urlBuilder';
import useDecodedParams from 'hooks/useDecodedParams';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    titleLink: {
      margin: theme.spacing(0, 1),
    },
    menu: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  })
);

type TitleLinkProps = {
  title: string;
};
const TitleLink = ({ title }: TitleLinkProps): ReactElement => {
  const classes = useStyles();

  return (
    <Link
      classes={{ root: classes.titleLink }}
      variant="h4"
      display="inline"
      underline="none"
      component={RouterLink}
      to={urlBuilder.introduction(title)}
    >
      {title}
    </Link>
  );
};

type NavTabsProps = {
  tabs: { label: string; to: string }[];
};
const NavTabs = ({ tabs }: NavTabsProps): ReactElement => {
  const classes = useStyles();
  const currLocation = useLocation();

  const negative1ToFalse = (idx: number): number | false => {
    if (idx === -1) {
      return false;
    } else {
      return idx;
    }
  };

  return (
    <Tabs
      value={negative1ToFalse(
        tabs.findIndex(({ to }) => matchPath(`${to}/*`, currLocation.pathname))
      )}
    >
      {tabs.map(({ label, to }, idx) => (
        <Tab
          classes={{ root: classes.label }}
          key={idx}
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

  const { projectTitle } = useDecodedParams();

  // if project exist!
  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar classes={{ root: classes.toolbar }}>
          <TitleLink title={projectTitle} />

          <div className={classes.menu}>
            <Button classes={{ label: classes.label }} variant="outlined">
              homepage
            </Button>
            <Button classes={{ label: classes.label }} variant="outlined">
              git hub
            </Button>
            <Button classes={{ label: classes.label }} variant="outlined">
              watch
            </Button>
          </div>
        </Toolbar>

        <NavTabs
          tabs={[
            { label: 'Timeline', to: 'timeline' },
            { label: 'Helps', to: 'help' },
            { label: 'Opinions', to: urlBuilder.opinions(projectTitle) },
            { label: 'Tasks', to: 'task' },
            {
              label: 'Documents',
              to: urlBuilder.documents(projectTitle),
            },
            { label: 'point shop', to: 'point shop' },
            { label: 'setting', to: 'setting' },
          ]}
        />
      </AppBar>

      <Outlet />
    </div>
  );
};
export default ProjectRoot;
