import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 380px;

  img {
    width: 100%;
    max-width: 400px;
    padding: 16px 0;
  }

  span {
    font-size: 20px;
    font-weight: bold;
  }
`;
