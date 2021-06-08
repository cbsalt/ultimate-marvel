import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
`;

export const Details = styled.section`
  margin-top: 40px;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
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
      display: flex;
      align-items: center;

      strong {
        font-size: 36px;
        color: #3d3d4d;
        margin: 0px 24px;
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
    }
  }
`;

export const ComicsList = styled.div`
  margin-top: 40px;
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  position: relative;

  .prev-page {
    position: absolute;
    left: 0;
    right: 0;
  }

  .next-page {
    position: absolute;
    top: 0;
    right: 0;
  }

  strong {
    font-size: 24px;
    color: #3d3d4d;
  }

  li {
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
    list-style: none;
    cursor: pointer;
  }
`;

export const TotalPages = styled.div`
  display: flex;
  margin: 16px 0;
  justify-content: center;
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

  span {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.38);
    font-weight: 700;
    letter-spacing: 0.25px;
    margin: 0 16px;
  }
`;
