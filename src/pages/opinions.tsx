import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import urlBuilder from 'helpers/urlBuilder';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(2, 0, 1, 0),
    },
    label: {
      textTransform: 'capitalize',
    },
    item: {
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

export const Opinions = (): ReactElement => {
  const classes = useStyles();

  const buttonProps: ButtonProps = {
    classes: { label: classes.label },
    color: 'primary',
    variant: 'contained',
    size: 'small',
  };

  const opinions = [
    { id: '123123', title: 'introduction', likes: 1, status: 'pendding' },
    {
      id: '1231f23',
      title: 'introdfsdfasduction',
      likes: 122,
      status: 'pdendding',
    },
  ];

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">{opinions.length} Opinions!</Typography>
        <Button {...buttonProps}>Opiniate New</Button>
      </div>
      <Divider />

      {opinions.map(({ title, status, likes }, idx) => {
        return (
          <Paper key={idx} variant="outlined" classes={{ root: classes.item }}>
            <Link
              underline="none"
              variant="h5"
              component={RouterLink}
              to={urlBuilder.document('white places', document.title)}
            >
              {title}
            </Link>

            <div className={classes.status}>
              <Chip label={status} size="small" />
              <Typography color="textSecondary" variant="subtitle1">
                <b>{likes}</b> people likes this opinion
              </Typography>
            </div>
          </Paper>
        );
      })}
    </Container>
  );
};
export default Opinions;
