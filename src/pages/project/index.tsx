import React, { FunctionComponent } from 'react';
import {
  Link as RouterLink,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  Chip,
  Button,
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
import { PopoverMenu } from 'components';
import {
  FollowerList as OpinionListPage,
  opinionListUrl,
  opinionListPath,
  timelineUrl,
  followerListUrl,
  introductionUrl,
  taskListUrl,
} from './pages';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    projectTitle: {
      margin: theme.spacing(0, 1),
    },
    projectStateChip: {
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

export const projectPath = '/project/:id/:tab';
type ProjectPathParams = {
  id: string;
  tab: string;
};

export const Project: FunctionComponent<
  RouteComponentProps<ProjectPathParams>
> = (props) => {
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
            <Chip
              className={styles.projectStateChip}
              color="secondary"
              size="small"
              variant="outlined"
              clickable={false}
              icon={project.isActive ? <CheckIcon /> : <WarningIcon />}
              label={project.isActive ? 'active' : 'inactive'}
            />
          </div>

          <div className={styles.topMenu}>
            <Button
              startIcon={<HomeOutlinedIcon />}
              href="/"
              variant="outlined"
              size="small"
            >
              Homepage
            </Button>
            <Button
              startIcon={<FileCopyOutlinedIcon />}
              href="/"
              variant="outlined"
              size="small"
            >
              Repository
            </Button>
            <ButtonGroup variant="outlined" size="small">
              <Button
                startIcon={
                  project.followers.includes(user) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )
                }
              >
                Follow
              </Button>
              <Button
                component={RouterLink}
                to={props.match.url + followerListUrl}
              >
                {project.followers.length}
              </Button>
            </ButtonGroup>
            <ButtonGroup variant="outlined" size="small">
              <PopoverMenu
                buttonEl={
                  <Button
                    startIcon={<AssessmentOutlinedIcon />}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Contributings
                  </Button>
                }
              >
                <MenuItem>
                  <RouterLink to={props.match.url}>Make an Opinion</RouterLink>
                  <RouterLink to={props.match.url}>Vote for Opinion</RouterLink>
                  <RouterLink to={props.match.url}>Submit some Task</RouterLink>
                </MenuItem>
              </PopoverMenu>
              <Button component={RouterLink} to={timelineUrl}>
                {project.generatedPoint}
              </Button>
            </ButtonGroup>
          </div>
        </Toolbar>

        <Tabs value={props.match.params.tab}>
          <Tab
            label="introduction"
            value="introduction"
            component={RouterLink}
            to={props.match.url + introductionUrl}
          />
          <Tab
            label="opinion"
            value="opinion"
            component={RouterLink}
            to={props.match.url + opinionListUrl}
          />
          <Tab
            label="task"
            value="task"
            component={RouterLink}
            to={props.match.url + taskListUrl}
          />
          <Tab label="point shop" value="point shop" disabled={true} />
        </Tabs>
      </AppBar>
      <Switch>
        <Route
          path={props.match.path + opinionListPath}
          component={OpinionListPage}
        />
      </Switch>
    </div>
  );
};
