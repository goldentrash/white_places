import React, { ReactElement } from 'react';
import {
  Link as RouterLink,
  RouteComponentProps,
  Switch,
  Route,
  matchPath,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  TabProps,
  Typography,
  Chip,
  ChipProps,
  ButtonGroup,
  MenuItem,
} from '@material-ui/core';
import {
  Warning as WarningIcon,
  Check as CheckIcon,
  HomeOutlined as HomeOutlinedIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  AssessmentOutlined as AssessmentOutlinedIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { PopoverMenu, MenuButton } from 'components';
import {
  Opinions as OpinionListPage,
  Informations as InformationListPage,
  Tasks as TaskListPage,
  Information as InformationPage,
} from './pages';

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
    topMenu: {
      display: 'flex',

      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    navTab: {
      textTransform: 'capitalize',
    },
  })
);

type TabKind = 'informations' | 'opinions' | 'tasks' | 'pointShop';
const evalTabKind = (tab: unknown): TabKind | undefined => {
  switch (tab) {
    case 'informations':
    case 'opinions':
    case 'tasks':
    case 'pointShop':
      return tab;
    default:
      return undefined;
  }
};
const NavTab = (
  props: Omit<TabProps<RouterLink>, 'value'> & {
    value: TabKind;
  }
): ReactElement => {
  const classes = useStyles();
  const { value, ...otherProps } = props;

  return (
    <Tab
      classes={{ root: classes.navTab }}
      label={value}
      value={value}
      component={RouterLink}
      {...otherProps}
    />
  );
};

const ActiveStateChip = (
  props: Omit<ChipProps, 'isActive'> & { isActive: boolean }
): ReactElement => {
  const classes = useStyles();
  const { isActive, ...otherProps } = props;

  return (
    <Chip
      classes={{ root: classes.statusChip }}
      color="secondary"
      size="small"
      variant="outlined"
      clickable={false}
      icon={isActive ? <CheckIcon /> : <WarningIcon />}
      label={isActive ? 'active' : 'inactive'}
      {...otherProps}
    />
  );
};

const enum Path {
  Information = '/informations/:title',
  Informations = '/informations',
  Opinions = '/opinions',
  Tasks = '/tasks',
  PointShop = '/pointShop',
  Followers = '/followers',
  Timeline = '/timeline',
}
type MatchParams = {
  projectId?: string;
};

export const Project = (
  props: RouteComponentProps<MatchParams>
): ReactElement => {
  const classes = useStyles();

  // we will get project using lazyGraphqlQuery
  const project = {
    isActive: true,
    title: 'white places',
    generatedPoint: 123,
    homepageUrl: '/',
    reposUrl: '/',
    isFollowed: true,
    numOfFollowers: 123,
  };

  const currTab = evalTabKind(
    matchPath<MatchParams & { tab?: string }>(props.location.pathname, {
      path: props.match.path + '/:tab',
    })?.params?.tab
  );

  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar classes={{ root: classes.toolbar }}>
          <div>
            <Typography
              variant="h4"
              display="inline"
              classes={{ root: classes.titleTypography }}
            >
              {project.title}
            </Typography>
            <ActiveStateChip isActive={project.isActive} />
          </div>

          <div className={classes.topMenu}>
            <MenuButton
              startIcon={<HomeOutlinedIcon />}
              href={project.homepageUrl}
            >
              Homepage
            </MenuButton>
            <MenuButton
              startIcon={<FileCopyOutlinedIcon />}
              href={project.reposUrl}
            >
              Repository
            </MenuButton>
            <ButtonGroup>
              <MenuButton
                startIcon={
                  project.isFollowed ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
              >
                Follow
              </MenuButton>
              <MenuButton
                component={RouterLink}
                to={props.match.url + Path.Followers}
              >
                {project.numOfFollowers}
              </MenuButton>
            </ButtonGroup>
            <ButtonGroup>
              <PopoverMenu
                buttonEl={
                  <MenuButton
                    startIcon={<AssessmentOutlinedIcon />}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Contributings
                  </MenuButton>
                }
              >
                <MenuItem>
                  <RouterLink to={props.match.url}>Make an Opinion</RouterLink>
                  <RouterLink to={props.match.url}>Vote for Opinion</RouterLink>
                  <RouterLink to={props.match.url}>Submit some Task</RouterLink>
                </MenuItem>
              </PopoverMenu>
              <MenuButton
                component={RouterLink}
                to={props.match.url + Path.Timeline}
              >
                {project.generatedPoint}
              </MenuButton>
            </ButtonGroup>
          </div>
        </Toolbar>

        <Tabs value={currTab ?? false}>
          <NavTab
            value={'informations'}
            to={props.match.url + Path.Informations}
          />
          <NavTab value={'opinions'} to={props.match.url + Path.Opinions} />
          <NavTab value={'tasks'} to={props.match.url + Path.Tasks} />
          <NavTab
            value={'pointShop'}
            disabled={true}
            to={props.match.url + Path.PointShop}
          />
        </Tabs>
      </AppBar>

      <Switch>
        <Route
          path={props.match.path + Path.Information}
          component={InformationPage}
        />
        <Route
          path={props.match.path + Path.Informations}
          component={InformationListPage}
        />
        <Route
          path={props.match.path + Path.Opinions}
          component={OpinionListPage}
        />
        <Route path={props.match.path + Path.Tasks} component={TaskListPage} />
      </Switch>
    </div>
  );
};
