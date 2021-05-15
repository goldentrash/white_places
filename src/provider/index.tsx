import { ReactNode } from 'react';
export type ProviderProps = {
  children: ReactNode;
};

import { CssThemeProvider } from './cssThemeProvider';
import { ApolloClientProvider } from './apolloClientProvider';
import { BrowserRouter as ReactRouterProvider } from 'react-router-dom';

export default {
  ApolloClient: ApolloClientProvider,
  CssTheme: CssThemeProvider,
  ReactRouter: ReactRouterProvider,
};
