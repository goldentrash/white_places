import React, { ReactElement, ReactNode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
  },
});

export const CssThemeProvider = (props: {
  children: ReactNode;
}): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
