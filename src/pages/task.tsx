import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Commentor from 'components/commentor';
import Button from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import CodeIcon from '@material-ui/icons/Code';
import Alert from 'components/alert';
import Comment from 'components/comment';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2, 0, 1, 0),
    },
    title: {
      display: 'inline-block',
    },
    typeChip: {
      marginLeft: theme.spacing(1),
    },
    subHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
    },
    menu: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    status: {
      display: 'flex',
      alignItems: 'center',

      '& > * ': {
        marginRight: theme.spacing(1),
      },
    },
    content: {
      padding: theme.spacing(1, 0),
    },
    fabsAnchor: {
      position: 'relative',
      left: '100%',
      marginLeft: theme.spacing(3),
    },
    fabsBox: {
      position: 'fixed',
      top: '35%',
      display: 'flex',
      flexDirection: 'column',

      '& > button': {
        marginBottom: theme.spacing(1),
        border: '1px solid',
      },
    },
  })
);

const RightFabs = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.fabsAnchor}>
      <div className={classes.fabsBox}>
        <Alert
          button={
            <IconButton color="primary">
              <CodeIcon />
            </IconButton>
          }
          title="작업에 참여하시겠습니까?"
        />
      </div>
    </div>
  );
};

export const Task = (): ReactElement => {
  const classes = useStyles();

  const { taskTitle } = useDecodedParams();

  const comments = [
    'comment1',
    'comment2',
    '아 정말 이짓을 얼마나 해야되는거라고 생각해?',
    'last',
  ];

  return (
    <Container>
      <RightFabs />

      <div className={classes.header}>
        <div>
          <Typography
            classes={{ root: classes.title }}
            variant="h4"
            component="h1"
          >
            {taskTitle}
          </Typography>
          <Chip
            classes={{ root: classes.typeChip }}
            label="신기능"
            size="small"
          />
        </div>

        <div className={classes.subHeader}>
          <div className={classes.status}>
            <Chip label="완료" size="small" />
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="span"
            >
              <b>white piano</b>의 PR이 수용되었습니다!
            </Typography>
          </div>

          <div className={classes.menu}>
            <Button variant="contained" size="small" color="primary">
              수정
            </Button>
            <Alert
              button={
                <Button variant="contained" size="small" color="secondary">
                  종료
                </Button>
              }
              title="정말로 종료하시겠습니까?"
            />
          </div>
        </div>
      </div>

      <div className={classes.content}>
        <Markdown>
          {'**동기**  역시 마크다운이 최고다! `code`란 말이야'}
        </Markdown>
      </div>

      {comments.map((comment, idx) => {
        return <Comment key={idx} content={comment} />;
      })}
      <Commentor />
    </Container>
  );
};
export default Task;
