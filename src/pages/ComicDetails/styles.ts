import styled from 'styled-components';

export const WrapperCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 15;
`;

export const Container = styled.section`
  padding: 24px;
  position: absolute;
  width: 800px;
  height: 500px;
  border-radius: 4px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 5px 5px - 3px rgba(0, 0, 0, 0.2),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14);
`;

export const Header = styled.header`
  justify-content: space-between;
  display: flex;

  h2 {
    color: #f00;
  }

  svg {
    cursor: pointer;
  }
`;

export const AboutComic = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  height: 400px;

  div {
    flex-direction: column;
    margin-left: 24px;
  }

  p {
    margin-bottom: 16px;
    color: #6c6c80;
  }

  li {
    list-style: none;
    & + li {
      margin-top: 20px;
    }

    strong {
      display: block;
      font-size: 32px;
      color: #3d3d4d;
    }

    span {
      display: block;
      margin-top: 4px;
      color: #6c6c80;
    }
  }
`;
