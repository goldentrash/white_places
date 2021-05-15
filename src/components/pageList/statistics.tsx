import React, { ReactElement, Fragment } from 'react';
import Divider from '@material-ui/core/Divider'; // 이건 그냥 index에서 구분하도록 하는게 낫지 않나?
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(2, 0, 1, 0),
    },
  })
);

export type StatisticsProps = {
  numberOfResult: number;
  type: string;
};
export const Statistics = ({
  numberOfResult,
  type,
}: StatisticsProps): ReactElement => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography classes={{ root: classes.typography }} variant="h5">
        {numberOfResult} {type}
      </Typography>
      <Divider />
    </Fragment>
  );
};
