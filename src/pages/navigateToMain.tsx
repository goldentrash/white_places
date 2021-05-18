import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import urlBuilder from 'helpers/urlBuilder';

export const NavigateToMain = (): ReactElement => {
  return <Navigate to={urlBuilder.introduction()} replace={true} />;
};
export default NavigateToMain;
