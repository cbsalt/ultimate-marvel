import React from 'react';

import { Container } from './styles';

export const Loader: React.FC = () => {
  return (
    <Container>
      <div className="loading-spinner-rolling">
        <div className="spinner">
          <div />
        </div>
      </div>
    </Container>
  );
};

export default Loader;
