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
  OpinionList as OpinionListPage,
  Introduction as IntroductionPage,
  TaskList as TaskListPage,
} from './pages';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    projectTitle: {
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
  })
);

const enum Path {
  Introduction = '/introduction',
  OpinionList = '/opinionList',
  TaskList = '/taskList',
  PointShop = '/pointShop',
  FollowerList = '/followerList',
  Timeline = '/timeline',
}

type TabKind = 'introduction' | 'opinionList' | 'taskList' | 'pointShop';
const evalTabKind = (tab: unknown): TabKind | undefined => {
  switch (tab) {
    case 'introduction':
    case 'opinionList':
    case 'taskList':
    case 'pointShop':
      return tab;
    default:
      return undefined;
  }
};

const ActiveStateChip = (
  props: Omit<ChipProps, 'isActive'> & { isActive: boolean }
): ReactElement => {
  const styles = useStyles();

  const { isActive, ...otherProps } = props;

  return (
    <Chip
      className={styles.statusChip}
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

const NavTab = (
  props: Omit<TabProps<RouterLink>, 'value'> & {
    value: TabKind;
  }
): ReactElement => {
  const { value, ...otherProps } = props;

  return (
    <Tab label={value} value={value} component={RouterLink} {...otherProps} />
  );
};

type MatchParams = {
  projectId?: string;
};

export const Project = (
  props: RouteComponentProps<MatchParams>
): ReactElement => {
  const styles = useStyles();

  // we will get project using lazyGraphqlQuery
  const project = {
    isActive: true,
    title: 'white places',
    generatedPoint: 123,
    followers: [] as Record<string, unknown>[],
  };

  // we will get user using apollo cache
  const user = {
    name: 'guest',
  };

  const tab =
    evalTabKind(
      matchPath<MatchParams & { tab?: string }>(props.location.pathname, {
        path: props.match.path + '/:tab',
      })?.params?.tab
    ) ?? false;

  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar className={styles.toolbar}>
          <div>
            <Typography
              variant="h4"
              display="inline"
              className={styles.projectTitle}
            >
              {project.title}
            </Typography>
            <ActiveStateChip isActive={project.isActive} />
          </div>

          <div className={styles.topMenu}>
            <MenuButton startIcon={<HomeOutlinedIcon />} href="/">
              Homepage
            </MenuButton>
            <MenuButton startIcon={<FileCopyOutlinedIcon />} href="/">
              Repository
            </MenuButton>
            <ButtonGroup>
              <MenuButton
                startIcon={
                  project.followers.includes(user) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
              >
                Follow
              </MenuButton>
              <MenuButton
                component={RouterLink}
                to={props.match.url + Path.FollowerList}
              >
                {project.followers.length}
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

        <Tabs value={tab}>
          <NavTab
            value={'introduction'}
            to={props.match.url + Path.Introduction}
          />
          <NavTab
            value={'opinionList'}
            to={props.match.url + Path.OpinionList}
          />
          <NavTab value={'taskList'} to={props.match.url + Path.TaskList} />
          <NavTab
            value={'pointShop'}
            disabled={true}
            to={props.match.url + Path.PointShop}
          />
        </Tabs>
      </AppBar>

      <Switch>
        <Route
          path={props.match.path + Path.Introduction}
          component={IntroductionPage}
        />
        <Route
          path={props.match.path + Path.OpinionList}
          component={OpinionListPage}
        />
        <Route
          path={props.match.path + Path.TaskList}
          component={TaskListPage}
        />
      </Switch>
    </div>
  );
};
