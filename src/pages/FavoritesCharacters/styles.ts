import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
`;

export const Character = styled.div`
  margin-top: 80px;
  max-width: 700px;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  text-decoration: none;
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
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
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
    background: #f00;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.04);
      transition: 0.2s;
    }
  }
`;
