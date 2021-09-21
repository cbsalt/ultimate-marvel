import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
`;

export const CharacterDescription = styled.section`
  margin-top: 40px;

  header {
    display: flex;
    align-items: center;

    @media (max-width: 640px) {
      flex-direction: column;
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      display: flex;
      align-items: center;

      @media (max-width: 640px) {
        flex-direction: column;
        text-align: center;
      }

      strong {
        font-size: 36px;
        color: ${({ theme }) => theme.colors.gray[700]};
        margin: 0px 24px;

        @media (max-width: 640px) {
          margin: 8px 0;
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
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: ${({ theme }) => theme.colors.gray[900]};
      }

      span {
        display: block;
        margin-top: 4px;
        color: ${({ theme }) => theme.colors.gray[300]};
      }
    }
  }
`;

export const ComicsList = styled.div`
  margin-top: 40px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  position: relative;

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  li {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 4px;
    list-style: none;
    cursor: pointer;
  }

  .skeleton-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .skeleton-loader {
    width: 100%;
    max-width: 560px;
    height: 18px;
    margin-top: 6px;
    display: block;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      lightgray;
    background-repeat: repeat-y;
    background-size: 50px 500px;
    animation: shine 1s infinite;
  }

  @keyframes shine {
    to {
      background-position: 100% 0;
    }
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

    :hover {
      color: ${shade(0.2, 'rgba(0, 0, 0, 0.38)')};
      transition: 0.4s;
    }
  }
`;
