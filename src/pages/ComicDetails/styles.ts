import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px;
`;

export const Header = styled.header`
  justify-content: space-between;
  display: flex;

  h2 {
    color: #f00;
  }

  svg {
    &:hover {
      cursor: pointer;
    }
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
