import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
`;

export const Character = styled.section`
  margin-top: 40px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }
    }
  }
`;

export const ComicsList = styled.div`
  margin-top: 40px;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  a {
    text-decoration: none;
  }

  li {
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
    list-style: none;
    cursor: pointer;
  }
`;
