import React, { ReactElement } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import urlBuilder from 'helpers/urlBuilder';
import useDecodedParams from 'hooks/useDecodedParams';
import NavTabs from 'components/navTabs';

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
            <Button variant="outlined">GITHUB</Button>
            <Button variant="outlined">알림 켜기</Button>
          </div>
        </Toolbar>

        <NavTabs
          tabs={[
            { label: '타임라인', to: 'timeline' },
            { label: '의견', to: urlBuilder.opinions(projectTitle) },
            { label: '작업', to: urlBuilder.tasks(projectTitle) },
            {
              label: '문서',
              to: urlBuilder.documents(projectTitle),
            },
            { label: '설정', to: 'setting' },
          ]}
        />
      </AppBar>

      <Outlet />
    </div>
  );
};
export default ProjectRoot;
