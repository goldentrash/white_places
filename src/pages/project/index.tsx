import React, { ReactElement, useEffect } from 'react';
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
import { useGetProjectInfoLazyQuery } from 'codegen/document-types';
import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';

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

const enum Path {
  Informations = '/informations',
  Opinions = '/opinions',
  Tasks = '/tasks',
  PointShop = '/pointShop',
  Followers = '/followers',
  Timeline = '/timeline',
}

type MatchParams = {
  projectId: string;
};
const ajv = new Ajv();
const matchParamsSchema: JTDSchemaType<MatchParams> = {
  properties: {
    projectId: { type: 'string' },
  },
};
const matchParamsValidator = ajv.compile(matchParamsSchema);

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

const ProjectHeader = (
  props: Pick<RouteComponentProps<MatchParams>, 'match'>
): ReactElement => {
  const classes = useStyles();

  const [getProjectInfo, { data, error }] = useGetProjectInfoLazyQuery();
  const project = data?.project;

  useEffect(() => {
    getProjectInfo({ variables: { id: props.match.params.projectId } });
  }, [getProjectInfo, props.match.params.projectId]);

  if (!project || !project.title) {
    console.log(error);
    return <div>something error</div>;
  }

  return (
    <Toolbar classes={{ root: classes.toolbar }}>
      <div>
        <Typography
          variant="h4"
          display="inline"
          classes={{ root: classes.titleTypography }}
        >
          {project.title}
        </Typography>
        <ActiveStateChip isActive={project.isActive ?? false} />
      </div>

      <div className={classes.topMenu}>
        {project.homepageUrl && (
          <MenuButton
            startIcon={<HomeOutlinedIcon />}
            href={project.homepageUrl}
          >
            Homepage
          </MenuButton>
        )}

        {project.repositoryUrl && (
          <MenuButton
            startIcon={<FileCopyOutlinedIcon />}
            href={project.repositoryUrl}
          >
            Repository
          </MenuButton>
        )}

        {project.numOfFollowers !== null && (
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
        )}

        {project.numOfGeneratedPoint !== null && (
          <ButtonGroup>
            <PopoverMenu
              buttonEl={
                <MenuButton
                  startIcon={<AssessmentOutlinedIcon />}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Points
                </MenuButton>
              }
            >
              <MenuItem>
                <RouterLink to={props.match.url}>Make an Opinion</RouterLink>
              </MenuItem>
              <MenuItem>
                <RouterLink to={props.match.url}>Vote for Opinion</RouterLink>
              </MenuItem>
              <MenuItem>
                <RouterLink to={props.match.url}>
                  Contribute to some Task
                </RouterLink>
              </MenuItem>
            </PopoverMenu>
            <MenuButton
              component={RouterLink}
              to={props.match.url + Path.Timeline}
            >
              {project.numOfGeneratedPoint}
            </MenuButton>
          </ButtonGroup>
        )}
      </div>
    </Toolbar>
  );
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
      value={value}
      component={RouterLink}
      {...otherProps}
    />
  );
};

export type ProjectProps = RouteComponentProps<MatchParams>;

export const Project = (props: ProjectProps): ReactElement => {
  if (!matchParamsValidator(props.match.params)) {
    console.log(matchParamsValidator.errors);
    return <div>URL error!</div>;
  }

  const currTab = evalTabKind(
    matchPath<{ tab: string }>(props.location.pathname, {
      path: props.match.path + '/:tab',
    })?.params.tab
  );

  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <ProjectHeader match={props.match} />
        <Tabs value={currTab ?? false}>
          <NavTab
            label="informations"
            value="informations"
            to={props.match.url + Path.Informations}
          />
          <NavTab
            label={'opinions'}
            value="opinions"
            to={props.match.url + Path.Opinions}
          />
          <NavTab
            label={'tasks'}
            value="tasks"
            to={props.match.url + Path.Tasks}
          />
          <NavTab
            label={'pointShop'}
            value="pointShop"
            disabled={true}
            to={props.match.url + Path.PointShop}
          />
        </Tabs>
      </AppBar>

      <Switch>
        <Route
          path={props.match.path + Path.Informations + '/:title'}
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
