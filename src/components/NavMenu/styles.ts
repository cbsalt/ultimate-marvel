import styled from 'styled-components';

export type NavMenuProps = {
  open?: boolean;
};

export const Container = styled.nav<NavMenuProps>`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 280px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  transform: ${({ open }) => (open ? 'translateX(0%)' : 'translateX(-100%)')};
  box-shadow: ${({ open }) =>
    open ? '#252424 0px 0px 12px -4px' : '#252424 0px 0px 0px 0px'};
  padding: 20px;
  transition: all 0.45s ease-out;
  z-index: 1;

  ul {
    margin: 0;
    padding: 24px;

    li {
      padding: 15px 0px;
      border-top: 1px solid #efefef;
      transition: all 0.25s ease-out;
      border-left: 0px solid #efefef;
      padding-left: 0px;

      &:hover {
        border-left: 10px solid #fff;
        padding-left: 10px;
      }

      &:first-child {
        border-top: 0;
      }

      a {
        color: ${({ theme }) => theme.colors.gray[200]};
        display: block;
        font-weight: lighter;
        font-size: 16px;
      }
    }
  }
`;
