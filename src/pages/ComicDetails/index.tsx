/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import api from '../../services/api';

import { WrapperCard, Header, Container, AboutComic } from './styles';

interface ComponentProps {
  id: number;
  handleCloseModal?: () => void;
}

interface ComicDataProps {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  series: {
    name: string;
  };
  pageCount: number;
}

interface ResultsProps {
  results: ComicDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

const Comics: React.FC<ComponentProps> = ({ id, handleCloseModal }) => {
  const [comics, setComics] = useState<ComicDataProps[]>([]);

  useEffect(() => {
    async function getComics(): Promise<void> {
      const response = await api.get<DataProps>(
        `comics/${id}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
      );

      const responseComics = response.data;
      const comicsData = responseComics.data.results.map((item) => item);

      setComics(comicsData);
    }

    getComics();
  }, [id]);

  return (
    <>
      <WrapperCard>
        <Container>
          <Header>
            <h2>_comic details</h2>
            <MdClose size={24} onClick={handleCloseModal} />
          </Header>
          {comics.map((comic) => (
            <>
              <AboutComic key={comic.id}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <div>
                  <p>{comic.description}</p>
                  <ul>
                    <li>
                      <strong>Serie</strong>
                      <span>{comic.series.name}</span>
                    </li>
                    <li>
                      <strong>Pages</strong>
                      <span>{comic.pageCount}</span>
                    </li>
                  </ul>
                </div>
              </AboutComic>
            </>
          ))}
        </Container>
      </WrapperCard>
    </>
  );
};

export default Comics;
