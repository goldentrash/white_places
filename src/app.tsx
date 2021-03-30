import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from 'components/header';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export default App;
