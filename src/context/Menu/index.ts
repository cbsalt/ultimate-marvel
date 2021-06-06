/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface NavMenuContextValue {
  open: boolean;
  handleOpenNavMenu(e: boolean): void;
}

export const MenuContext = createContext<NavMenuContextValue>({
  open: false,
  handleOpenNavMenu() {},
});
