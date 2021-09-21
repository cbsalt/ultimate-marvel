import React from 'react';

import Search from '../../assets/search-image.svg';

import { Container } from './styles';

type NoContentProps = {
  content: string;
};

const NoContent: React.FC<NoContentProps> = ({ content }: NoContentProps) => {
  return (
    <Container>
      <img src={Search} alt="search" />
      <span>find your new favorite {content}...</span>
    </Container>
  );
};

export default NoContent;
