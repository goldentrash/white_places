import React, { Fragment, ReactElement } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  })
);

export type SearchStatisticsProps = {
  numberOfResult: number;
  type: string;
};

export const SearchStatistics = (
  props: SearchStatisticsProps
): ReactElement => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography classes={{ root: classes.typography }} variant="h5">
        {props.numberOfResult} {props.type}
      </Typography>
      <Divider />
    </Fragment>
  );
};
