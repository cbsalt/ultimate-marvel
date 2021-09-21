import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;

  @media (max-width: 640px) {
    padding: 0 24px;
  }
`;

export const Character = styled.div`
  margin-top: 80px;
  max-width: 700px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  & + div {
    margin-top: 40px;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  div {
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.gray[700]};
    }

    p {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.gray[200]};
      margin-top: 4px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    border: none;
    background: ${({ theme }) => theme.colors.danger.dark};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.04);
      transition: 0.2s;
    }
  }
`;
