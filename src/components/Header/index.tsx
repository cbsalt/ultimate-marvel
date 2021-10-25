import React from 'react';

import Menu from '../ButtonMenu';

import { Container } from './styles';

export const Header: React.FC = () => {
  return (
    <Container>
      <Menu />
    </Container>
  );
};

export default Header;
