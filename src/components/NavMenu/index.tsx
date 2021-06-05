import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../context/Menu';

import { Container } from './styles';

export const NavMenu: React.FC = () => {
  const { open, handleOpenNavMenu } = useContext(MenuContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOpenNavMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Container ref={ref} open={open}>
      <ul>
        <li>
          <Link to="/">_home</Link>
        </li>
        <li>
          <Link to="/favorites/characters">_favorites characters</Link>
        </li>
        <li>
          <Link to="/favorites/comics">_favorites comics</Link>
        </li>
      </ul>
    </Container>
  );
};

export default NavMenu;
