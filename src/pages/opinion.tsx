import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Alert from 'components/alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2, 0, 1, 0),
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
    floatingButtonsAnchor: {
      position: 'relative',
      left: '100%',
      marginLeft: theme.spacing(3),
    },
    floatingButtons: {
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

export const Opinion = (): ReactElement => {
  const classes = useStyles();

  const { opinionTitle } = useDecodedParams();

  const statusLine = (
    <Typography color="textSecondary" variant="subtitle1">
      <b>#aa124adffd</b>
    </Typography>
  );

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h4">{opinionTitle}</Typography>

        <div className={classes.subHeader}>
          <div className={classes.status}>
            <Chip label={status} size="small" />
            {statusLine}
          </div>

          <div className={classes.menu}>
            <Button variant="contained" size="small" color="primary">
              수정
            </Button>
            <Alert
              button={
                <Button variant="contained" size="small" color="secondary">
                  삭제
                </Button>
              }
              title="정말로 삭제하시겠습니까?"
            />
          </div>
        </div>
      </div>

      <Divider classes={{ root: classes.divider }} />
      <Markdown>{'**동기**  역시 마크다운이 최고다! `code`란 말이야'}</Markdown>

      <div className={classes.floatingButtonsAnchor}>
        <div className={classes.floatingButtons}>
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
    </Container>
  );
};
export default Opinion;
