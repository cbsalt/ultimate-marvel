import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../context/Menu';
import useClickOutside from '../../hooks/useClickOutside';

import { Container } from './styles';

export const NavMenu: React.FC = () => {
  const { open, handleOpenNavMenu } = useContext(MenuContext);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (open) handleOpenNavMenu(open);
  });

  return (
    <Container ref={ref} open={open}>
      <ul>
        <li>
          <Link
            to="/"
            onClick={() => handleOpenNavMenu(open)}
            aria-hidden="true"
          >
            _characters finder
          </Link>
        </li>
        <li>
          <Link
            to="/comics"
            onClick={() => handleOpenNavMenu(open)}
            aria-hidden="true"
          >
            _comics finder
          </Link>
        </li>
        <li>
          <Link
            to="/favorites/characters"
            onClick={() => handleOpenNavMenu(open)}
            aria-hidden="true"
          >
            _favorite characters
          </Link>
        </li>
        <li>
          <Link
            to="/favorites/comics"
            onClick={() => handleOpenNavMenu(open)}
            aria-hidden="true"
          >
            _favorite comics
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default NavMenu;
