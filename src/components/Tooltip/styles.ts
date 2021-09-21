import styled from 'styled-components';

export const Container = styled.span`
  .tooltip {
    position: relative;
    display: inline-block;

    .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: rgba(61, 61, 77, 0.7);
      color: ${({ theme }) => theme.colors.primary.lighter};
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;

      ::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(61, 61, 77, 0.7) transparent transparent transparent;
      }
    }
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;
