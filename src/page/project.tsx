import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      justifyContent: 'space-between',
    },
    projectTitle: {
      margin: theme.spacing(0, 1),
    },
  })
);

const Project = (): ReactElement => {
  const styles = useStyles();
  const project = {
    isActive: true,
    title: 'white places',
  };

  const projectTitle = (
    <Typography variant="h4" display="inline" className={styles.projectTitle}>
      {project.title}
    </Typography>
  );

  const projectState = (
    <Chip
      color="secondary"
      size="small"
      variant="outlined"
      clickable={false}
      icon={project.isActive ? <CheckIcon /> : <WarningIcon />}
      label={project.isActive ? 'active' : 'inactive'}
    />
  );
  return (
    <div>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar className={styles.toolbar}>
          <div>
            {projectTitle}

            {projectState}
            <a href="/">홈페이지</a>
            <a href="/">저장소</a>
          </div>
          <div>
            <div>
              123 point have been generated!
              <button>timeline</button>
              {/**
               * timeline 형식
               * 총 생성된 point의 양
               * 각각의 액션
               */}
            </div>
            <div>
              321 people interested in this project!
              <button>list</button>
            </div>
            <div>
              working for 32th release!
              <button>history</button>
              {/**
               * 패치노트, 현재 준비중인 릴리즈 정보(어떤 테스크가 머지되었는지)
               */}
            </div>
          </div>
        </Toolbar>
        <Tabs value={false}>
          <Tab label="introduction" />
          <Tab label="opinion" />
          <Tab label="task" />
          <Tab label="point shop" />
        </Tabs>
      </AppBar>
      <div>router</div>
    </div>
  );
};

export default Project;
