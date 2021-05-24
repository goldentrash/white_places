import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import urlBuilder from 'helpers/urlBuilder';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Selector from 'components/selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0, 1, 0),
    },
    statistics: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    typeChip: {
      marginLeft: theme.spacing(1),
    },
    label: {
      textTransform: 'capitalize',
    },
    menu: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    task: {
      marginTop: theme.spacing(1),

      '& > *': {
        margin: theme.spacing(1, 2),
      },
    },
    status: {
      display: 'flex',
      alignItems: 'center',

      '& > * ': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

export const Tasks = (): ReactElement => {
  const classes = useStyles();

  const tasks = [
    { id: '123123', title: 'introduction', status: '진행중' },
    {
      id: '1231f23',
      title: 'introdfsdfasduction',
      status: '진행중',
    },
  ];

  return (
    <Container>
      <div className={classes.header}>
        <Typography
          variant="h5"
          component="span"
          classes={{ root: classes.statistics }}
        >
          진행중인 {tasks.length}개의 작업
        </Typography>

        <div className={classes.menu}>
          <Selector defaultItem="진행중" items={['진행중', '완료']} />
        </div>
      </div>
      <Divider />

      {tasks.map(({ title, status }, idx) => {
        return (
          <Paper key={idx} variant="outlined" classes={{ root: classes.task }}>
            <div>
              <Link
                underline="none"
                variant="h5"
                component={RouterLink}
                to={urlBuilder.task('white places', title)}
              >
                {title}
              </Link>
              <Chip
                classes={{ root: classes.typeChip }}
                label="버그"
                size="small"
              />
            </div>

            <div className={classes.status}>
              <Chip label={status} size="small" />
              <Typography
                color="textSecondary"
                variant="subtitle1"
                component="span"
              >
                <b>13</b>개의 PR이 대기중입니다
              </Typography>
            </div>
          </Paper>
        );
      })}
    </Container>
  );
};
export default Tasks;
