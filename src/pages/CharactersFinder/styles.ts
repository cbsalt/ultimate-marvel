import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError?: boolean;
}

export const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;

  @media (max-width: 640px) {
    padding: 0 24px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.gray[900]};
  max-width: 450px;
  line-height: 56px;
  margin-top: 32px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: ${({ theme }) => theme.colors.gray[900]};
    border: 2px solid ${({ theme }) => theme.colors.primary.lighter};
    border-right: 0;

    @media (max-width: 640px) {
      font-size: 16px;
    }

    ${(props) =>
      props.hasError &&
      css`
        border-color: ${({ theme }) => theme.colors.danger.light};
      `}

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: ${({ theme }) => theme.colors.danger.dark};
    border-radius: 0 5px 5px 0;
    border: 0;
    color: ${({ theme }) => theme.colors.primary.lighter};
    font-size: 24px;
    font-weight: bold;
    transition: background-color 0.2s;

    @media (max-width: 640px) {
      font-size: 16px;
    }

    &:hover {
      background: ${shade(0.2, '#f63131')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.danger.light};
  margin-top: 8px;
`;

export const Character = styled.div`
  margin-top: 80px;
  max-width: 700px;

  .hero-card {
    background: ${({ theme }) => theme.colors.primary.lighter};
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
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

    svg {
      margin-left: auto;
      color: ${({ theme }) => theme.colors.gray[100]};
    }
  }
`;
