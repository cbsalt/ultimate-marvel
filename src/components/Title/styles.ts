import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray[200]};
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 8px;
    }
  }
`;
