import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
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
    statistics: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    label: {
      textTransform: 'capitalize',
    },
    document: {
      marginTop: theme.spacing(1),
    },
    link: {
      display: 'inline-block',
      margin: theme.spacing(1, 2),
    },
  })
);

export const Documents = (): ReactElement => {
  const classes = useStyles();

  const documents = [
    { id: '123123', title: 'introduction' },
    { id: '123ff123', title: 'intrasoduction' },
  ];

  return (
    <Container>
      <div className={classes.header}>
        <Typography
          variant="h5"
          component="span"
          classes={{ root: classes.statistics }}
        >
          총 {documents.length}개의 문서
        </Typography>
        <Button
          classes={{ label: classes.label }}
          color="primary"
          variant="contained"
          size="small"
          component={RouterLink}
          to={urlBuilder.writeDocument('white places')}
        >
          문서 작성하기
        </Button>
      </div>
      <Divider />

      {documents.map(({ title }, idx) => {
        return (
          <Paper
            key={idx}
            variant="outlined"
            classes={{ root: classes.document }}
          >
            <Link
              classes={{ root: classes.link }}
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
