import styled from 'styled-components';

export default styled.section`
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
