import styled from 'styled-components';

export type ModalStyledProps = {
  width?: number;
  height?: number;
};

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 15;
`;

export const Container = styled.section<ModalStyledProps>`
  padding: 24px;
  position: absolute;
  width: ${({ width }) => width && `widht: ${width}px`};
  height: ${({ height }) => height && `height: ${height}px`};
  border-radius: 4px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 5px 5px - 3px rgba(0, 0, 0, 0.2),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14);
`;
