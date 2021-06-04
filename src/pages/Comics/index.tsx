import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';

import { Header, WrapperCards, ComicCard } from './styles';

interface RouteParams {
  comic: string;
}

interface ComicDataProps {
  id: number;
  title: string;
  details: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface ResultsProps {
  results: ComicDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

const Comics: React.FC = () => {
  const [comics, setComics] = useState<ComicDataProps[]>([]);
  const { params } = useRouteMatch<RouteParams>();

  useEffect(() => {
    async function getComics(): Promise<void> {
      const response = await api.get<DataProps>(
        `comics/${params.comic}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
      );

      const responseComics = response.data;
      const comicsData = responseComics.data.results.map((item) => item);

      setComics(comicsData);
    }

    getComics();
  }, [params.comic]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiArrowLeft size={16} />
          <h1>Comics</h1>
        </Link>
      </Header>
      <WrapperCards>
        <ComicCard>
          {comics.map((comic) => (
            <>
              <span>{comic.title}</span>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt=""
              />
              <p>{comic.details}</p>
            </>
          ))}
        </ComicCard>
      </WrapperCards>
    </>
  );
};

export default Comics;
