import React, { FunctionComponent } from 'react';
import { CssThemeProvider } from './cssThemeProvider';
import { ApolloClientProvider } from './apolloClientProvider';

export const Providers: FunctionComponent = (props) => {
  return (
    <CssThemeProvider>
      <ApolloClientProvider>{props.children}</ApolloClientProvider>
    </CssThemeProvider>
  );
};
