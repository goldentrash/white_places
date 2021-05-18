import React, { ReactElement, ReactNode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
  },
});

export type CssThemeProviderProps = {
  children: ReactNode;
};
export const CssThemeProvider = ({
  children,
}: CssThemeProviderProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default CssThemeProvider;
