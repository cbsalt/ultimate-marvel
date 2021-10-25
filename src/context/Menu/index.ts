import { createContext } from 'react';

interface NavMenuContextValue {
  open: boolean;
  handleOpenNavMenu(e: boolean): void;
}

export const MenuContext = createContext<NavMenuContextValue>({
  open: false,
  handleOpenNavMenu() {
    // do nothing
  },
});
