import React, { ReactElement } from 'react';
import useDecodedParams from 'hooks/useDecodedParams';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Markdown from 'components/markdown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
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
    fabsBox: {
      position: 'relative',
      left: '100%',
      marginLeft: theme.spacing(3),

      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '35%',

        '& > button': {
          marginBottom: theme.spacing(1),
          border: '1px solid',
        },
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

  const buttonOptions: ButtonProps = {
    color: 'primary',
    variant: 'contained',
    size: 'small',
  };

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
            <Button {...buttonOptions}>수정</Button>
            <Button {...buttonOptions}>삭제</Button>
          </div>
        </div>
      </div>

      <Divider classes={{ root: classes.divider }} />
      <Markdown>{'**동기**  역시 마크다운이 최고다! `code`란 말이야'}</Markdown>

      <div className={classes.fabsBox}>
        <div>
          <IconButton color="primary">
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton color="primary">
            <AssignmentTurnedInIcon />
          </IconButton>
          <IconButton color="secondary">
            <NotInterestedIcon />
          </IconButton>
        </div>
      </div>
    </Container>
  );
};
export default Opinion;
