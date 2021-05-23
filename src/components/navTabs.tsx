import React, { ReactElement } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    label: {
      textTransform: 'capitalize',
    },
  })
);

export type NavTabsProps = {
  tabs: { label: string; to: string }[];
};
export const NavTabs = ({ tabs }: NavTabsProps): ReactElement => {
  const classes = useStyles();
  const currLocation = useLocation();

  const negative1ToFalse = (idx: number): number | false => {
    if (idx === -1) {
      return false;
    } else {
      return idx;
    }
  };

  return (
    <Tabs
      value={negative1ToFalse(
        tabs.findIndex(({ to }) => matchPath(`${to}/*`, currLocation.pathname))
      )}
    >
      {tabs.map(({ label, to }, idx) => (
        <Tab
          classes={{ root: classes.label }}
          key={idx}
          label={label}
          component={RouterLink}
          to={to}
        />
      ))}
    </Tabs>
  );
};
export default NavTabs;
