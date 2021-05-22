import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import urlBuilder from 'helpers/urlBuilder';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
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
  })
);

export const Documents = (): ReactElement => {
  const classes = useStyles();

  const buttonProps: ButtonProps = {
    classes: { label: classes.label },
    color: 'primary',
    variant: 'contained',
    size: 'small',
  };

  const documents = [
    { id: '123123', title: 'introduction' },
    { id: '123ff123', title: 'intrasoduction' },
  ];

  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">{documents.length} Documents!</Typography>
        <Button {...buttonProps}>Write New</Button>
      </div>
      <Divider />

      {documents.map(({ title }, idx) => {
        return (
          <Paper key={idx} variant="outlined" classes={{ root: classes.item }}>
            <Link
              underline="none"
              variant="h5"
              component={RouterLink}
              to={urlBuilder.document('white places', title)}
            >
              {title}
            </Link>
          </Paper>
        );
      })}
    </Container>
  );
};
export default Documents;
