import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

  span {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
    letter-spacing: 0.25px;
    margin: 0 16px;

    &:hover {
      color: ${shade(0.2, '#f00')};
    }

    &.selected {
      color: #f00;
      font-weight: 700;
    }

    &.side-link {
      color: rgba(0, 0, 0, 0.38);
      margin: 0 25px;
      font-weight: 700;
    }
  }
`;
