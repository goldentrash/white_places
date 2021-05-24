import React, { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Alert from 'components/alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 2),
      display: 'flex',
      flexDirection: 'column',

      '& > *': {
        marginTop: theme.spacing(1),
      },
    },
    header: {
      display: 'flex',
    },
    menu: {
      marginLeft: 'auto',

      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export type CommentProps = {
  content: ReactNode;
};
export const Comment = ({ content }: CommentProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />

      <div className={classes.header}>
        <Typography color="textSecondary" variant="subtitle2" component="span">
          <Link component={RouterLink} to="/user/white piano">
            white piano
          </Link>
          가 2021.03.11에 작성
        </Typography>

        <div className={classes.menu}>
          <Button size="small" color="primary">
            수정
          </Button>
          <Alert
            button={
              <Button size="small" color="secondary">
                삭제
              </Button>
            }
            title="정말로 삭제하시겠습니까?"
          />
        </div>
      </div>

      <Paper classes={{ root: classes.paper }} variant="outlined">
        {content}
      </Paper>
    </div>
  );
};
export default Comment;
