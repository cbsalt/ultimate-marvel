import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
`;

export const ComicHeader = styled.section`
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
        color: ${({ theme }) => theme.colors.gray[700]};
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
        background: ${({ theme }) => theme.colors.danger.dark};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

        &:hover {
          transform: scale(1.04);
          transition: 0.2s;
        }
      }
    }
  }
`;

export const DetailsContainer = styled.section`
  margin-top: 40px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-top: 40px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: ${({ theme }) => theme.colors.gray[700]};
      }

      span {
        display: block;
        margin-top: 4px;
        color: ${({ theme }) => theme.colors.gray[300]};
      }
    }
  }
`;
