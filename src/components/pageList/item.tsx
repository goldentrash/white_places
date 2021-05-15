import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1, 0),
    },
  })
);

export type ItemProps = {
  title: string;
  pageUrl: string;
};
export const Item = ({ title, pageUrl }: ItemProps): ReactElement => {
  const classes = useStyles();

  return (
    <Card variant="outlined" classes={{ root: classes.card }}>
      <CardContent>
        <Link variant="subtitle1" component={RouterLink} to={pageUrl}>
          {title}
        </Link>
      </CardContent>
    </Card>
  );
};
