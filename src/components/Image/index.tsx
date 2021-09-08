/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

import { Wrapper } from './styles';

type ImageProps = {
  alt: string;
  src: string;
};

const Image: React.FC<ImageProps> = ({ alt, src }: ImageProps) => {
  const [skeleton, setSkeleton] = useState(true);

  function handleLoad({ target }: any) {
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <Wrapper>
      {skeleton && <div className="skeleton" />}
      <img onLoad={handleLoad} className="img" src={src} alt={alt} />
    </Wrapper>
  );
};

export default Image;
