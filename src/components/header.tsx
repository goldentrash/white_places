import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import '../style/header.css';

const Header = (): ReactElement => {
  return (
    <header>
      <BrandLink />
      <SearchBox />
    </header>
  );
};

const BrandLink = (): ReactElement => {
  return <Link to="/">White Places</Link>;
};

export default Header;
