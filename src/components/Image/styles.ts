import styled from 'styled-components';

export const Wrapper = styled.div`
  .img {
    display: block;
    max-width: 100%;
    opacity: 0;
    transition: 0.2s;
  }

  .skeleton {
    grid-area: 1/1;
    height: 100%;
    background-image: linear-gradient(90deg, #eee 0, #fff 50%, #eee 100%);
    background-color: #eee;
    background-size: 200%;
    animation: skeleton 1.5s infinite linear;
  }

  @keyframes skeleton {
    from {
      background-position: 0px;
    }

    to {
      background-position: -200%;
    }
  }
`;
