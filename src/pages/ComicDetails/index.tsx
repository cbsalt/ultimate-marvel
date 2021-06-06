/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import Image from '../../components/Image';
import Loader from '../../components/Loader';
import api from '../../services/api';

import { Wrapper, Header, AboutComic } from './styles';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getComics(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get<DataProps>(
          `comics/${id}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
        );

        const responseComics = response.data;
        const comicsData = responseComics.data.results.map((item) => item);

        setComics(comicsData);
      } catch (err) {
        toast.error('😥 whoops! there was an error! try again later.');

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getComics();
  }, [id]);

  return (
    <Wrapper>
      <Header>
        <h2>_comic details</h2>
        <MdClose size={24} onClick={handleCloseModal} />
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {comics.map((comic) => (
            <AboutComic key={comic.id}>
              <Image
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
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Comics;
