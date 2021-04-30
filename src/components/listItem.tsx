import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Link } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1, 0),
    },
  })
);

type ListItemProps = {
  title: string;
  pageUrl: string;
};

export const ListItem = (props: ListItemProps): ReactElement => {
  const classes = useStyles();

  return (
    <Card variant="outlined" classes={{ root: classes.card }}>
      <CardContent>
        <Link variant="subtitle1" component={RouterLink} to={props.pageUrl}>
          {props.title}
        </Link>
      </CardContent>
    </Card>
  );
};
