import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Commentor from 'components/commentor';
import Markdown from 'components/markdown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
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
    divider: {
      margin: theme.spacing(2, 0, 4, 0),
    },
    status: {
      display: 'flex',
      alignItems: 'center',

      '& > * ': {
        marginRight: theme.spacing(1),
      },
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
        <IconButton color="primary">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton color="primary">
          <AssignmentTurnedInIcon />
        </IconButton>
        <Alert
          button={
            <IconButton color="secondary">
              <NotInterestedIcon />
            </IconButton>
          }
          title="정말로 기각하시겠습니까?"
        />
      </div>
    </div>
  );
};

export const Opinion = (): ReactElement => {
  const classes = useStyles();

  const { opinionTitle } = useDecodedParams();

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
            {opinionTitle}
          </Typography>
          <Chip
            classes={{ root: classes.typeChip }}
            label="신기능"
            size="small"
          />
        </div>

        <div className={classes.subHeader}>
          <div className={classes.status}>
            <Chip label="수용됨" size="small" />
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="span"
            >
              <b>#aa124adffd</b> 작업을 확인하세요!
            </Typography>
          </div>
        </div>
      </div>

      <Comment
        content={
          <Markdown>
            {'**동기**  역시 마크다운이 최고다! `code`란 말이야'}
          </Markdown>
        }
      />

      {comments.map((comment, idx) => {
        return <Comment key={idx} content={comment} />;
      })}
      <Commentor />
    </Container>
  );
};
export default Opinion;