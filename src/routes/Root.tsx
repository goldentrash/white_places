import React, { ReactElement } from 'react';
import AppHeader from 'src/components/AppHeader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { SCREEN_MIN_WIDTH_DESKTOP } from 'src/constants';
import useGoTrue from 'src/hooks/useGoTrue';

const Root = (): ReactElement => {
  const isDesktop = useMediaQuery(`(min-width:${SCREEN_MIN_WIDTH_DESKTOP}px)`);

  const goTrue = useGoTrue();
  const user = goTrue.currentUser();

  return (
    <div>
      <AppHeader user={user} />

      {isDesktop ? (
        <div>desktop page</div>
      ) : (
        <div>Sorry, mobile page is not yet implemented</div>
      )}

      <footer>footer</footer>
    </div>
  );
};

export default Root;
