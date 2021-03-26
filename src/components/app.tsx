import React, { ReactElement } from 'react';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';
import '../style/app.css';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export default App;
