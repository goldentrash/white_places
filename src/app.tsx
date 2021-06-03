import React, { ReactElement } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Router from './router';

const App = (): ReactElement => {
  const screenMinWidth = 1440;
  const isDesktop = useMediaQuery(`(min-width:${screenMinWidth}px)`);

  if (!isDesktop) {
    return <div>{screenMinWidth}px 이상의 화면 UI만 제공됩니다</div>;
  }

  return <Router />;
};

export default App;
