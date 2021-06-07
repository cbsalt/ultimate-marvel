/* eslint-disable react/require-default-props */
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/marvel-logo.svg';

import { Header } from './styles';

type TitleProps = {
  title: string;
  to?: string;
};

export const Title: React.FC<TitleProps> = ({ title, to }: TitleProps) => {
  return (
    <>
      <img src={logoImg} alt="Marvel Logo" />
      <Header>
        <Link to={`/${to}`}>
          <FiArrowLeft size={16} />
          <h1>{title}</h1>
        </Link>
      </Header>
    </>
  );
};

export default Title;
