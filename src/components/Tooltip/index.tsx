import React from 'react';

import { Container } from './styles';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
}: TooltipProps) => {
  return (
    <Container>
      <div className="tooltip">
        <span className="tooltiptext">{text}</span>
        {children}
      </div>
    </Container>
  );
};

export default Tooltip;
