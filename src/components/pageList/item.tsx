import React, { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),

      '& > *': {
        margin: theme.spacing(1, 2),
      },
    },
  })
);

export type ItemProps = {
  pageUrl: string;
  title: string;
  contents?: ReactNode;
};
export const Item = ({ title, pageUrl, contents }: ItemProps): ReactElement => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" classes={{ root: classes.root }}>
      <Typography variant="h5">
        <Link component={RouterLink} to={pageUrl} underline="none">
          {title}
        </Link>
      </Typography>
      {contents}
    </Paper>
  );
};
export default Item;
