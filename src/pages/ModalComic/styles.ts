import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px;
`;

export const Header = styled.header`
  justify-content: space-between;
  display: flex;

  h2 {
    color: ${({ theme }) => theme.colors.danger.dark};
  }

  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const AboutComic = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  max-height: 400px;

  @media (max-width: 640px) {
    flex-direction: column;
  }

  img {
    max-height: 380px;
  }

  .wrapper-details {
    flex-direction: column;
    width: 100%;
    padding-left: 24px;
    overflow: scroll;

    @media (max-width: 640px) {
      padding-left: 0px;
    }
  }

  p {
    margin-bottom: 16px;
    color: #6c6c80;

    @media (max-width: 640px) {
      width: 328px;
    }
  }

  li {
    list-style: none;
    & + li {
      margin-top: 20px;
    }

    strong {
      display: block;
      font-size: 32px;
      color: ${({ theme }) => theme.colors.gray[700]};
    }

    span {
      display: block;
      margin-top: 4px;
      color: #6c6c80;
    }
  }
  .wrapper-tooltip {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: center;

    @media (max-width: 640px) {
      justify-content: left;
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
