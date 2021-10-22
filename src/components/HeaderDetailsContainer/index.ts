import styled from 'styled-components';

export default styled.section`
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
