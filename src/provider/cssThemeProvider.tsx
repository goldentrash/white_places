import React, { ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProviderProps } from './index';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
  },
});

export const CssThemeProvider = ({ children }: ProviderProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
