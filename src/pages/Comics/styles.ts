import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const WrapperCards = styled.div`
  margin-top: 32px;
  justify-items: center;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

export const ComicCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background: #f2f4f6;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
  padding: 0 15px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  span {
    text-align: center;
    font-size: 20px;
    color: #2e2e2e;
    text-transform: uppercase;
  }

  &:hover {
    transform: scale(1.04);
    transition: 0.4s;
    cursor: pointer;

    span {
      color: #f00;
    }
  }

  @media (max-width: 640px) {
    width: 20rem;
    height: 4rem;
  }
`;
