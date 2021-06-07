import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Title, Form, Error, Comic } from './styles';

import logoImg from '../../assets/marvel-logo.svg';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { truncateText } from '../../utils/truncateText';

interface ComicsDataProps {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface ResultsProps {
  results: ComicsDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

const Comics: React.FC = () => {
  const [newComic, setNewComic] = useState('');
  const [inputError, setInputError] = useState('');
  const [comics, setComics] = useState<ComicsDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSearchHeroe(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!newComic) {
      setInputError('type here first, please! 🤓');
      return;
    }

    try {
      setLoading(true);

      const response = await api.get<DataProps>(
        `comics?titleStartsWith=${newComic}&ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
      );

      const comic = response.data;

      const dataComic = comic.data.results.map((item) => item);

      if (dataComic.length === 0) {
        setInputError(`looks like this comic doesn't exist! 😥`);
        setComics([]);
        return;
      }

      setComics(dataComic);
      setNewComic('');
      setInputError('');
    } catch (err) {
      toast.error('😥 whoops! there was an error! try again later.');

      setError(true);
      setNewComic('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <img src={logoImg} alt="Marvel Logo" />
      <Title>Comics finder</Title>
      <Form hasError={!!inputError} onSubmit={handleSearchHeroe}>
        <input
          value={newComic}
          placeholder="Search for comics"
          onChange={(e) => setNewComic(e.target.value)}
        />
        <button type="submit">Assemble!</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      {loading ? (
        <Loader />
      ) : (
        <Comic>
          {comics.map((comicItem) => (
            <>
              <Link
                className="hero-card"
                to={`/comic/${comicItem.id}`}
                key={comicItem.id}
              >
                <img
                  src={`${comicItem.thumbnail.path}.${comicItem.thumbnail.extension}`}
                  alt={comicItem.title}
                />
                <div>
                  <strong>{comicItem.title}</strong>
                  {comicItem.description ? (
                    <p>{truncateText(`${comicItem.description}`, 190)}</p>
                  ) : (
                    <p>there&apos;s no description for this comic</p>
                  )}
                </div>
                <FiChevronRight size={20} />
              </Link>
            </>
          ))}
        </Comic>
      )}
    </Container>
  );
};

export default Comics;
