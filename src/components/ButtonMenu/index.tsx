import React, { useContext } from 'react';

import { MenuContext } from '../../context/Menu';

import { StyledBurger } from './styles';

const Menu: React.FC = () => {
  const { open, handleOpenNavMenu } = useContext(MenuContext);

  return (
    <StyledBurger open={open} onClick={() => handleOpenNavMenu(open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Menu;
