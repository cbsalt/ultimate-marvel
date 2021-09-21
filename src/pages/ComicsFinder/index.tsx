import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';

import { truncateText } from '../../utils/truncateText';
import ComicsServices from '../../services/ComicsServices';

import logoImg from '../../assets/marvel-logo.svg';

import { Container, Title, Form, Error, Comic } from './styles';

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

const ComicsFinder: React.FC = () => {
  const [newComic, setNewComic] = useState('');
  const [inputError, setInputError] = useState('');
  const [comics, setComics] = useState<ComicsDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);

  async function handleSearchComic(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!newComic) {
      setInputError('type here first, please! 🤓');
      return;
    }

    try {
      setLoading(true);

      const fetchComicsData = await ComicsServices.listComics(newComic);

      const response = fetchComicsData.data;

      const listComics = response.results.map((item: ResultsProps) => item);

      if (listComics.length === 0) {
        setInputError(`looks like this comic doesn't exist! 😥`);
        setComics([]);
        return;
      }

      setComics(listComics);
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
      <Form hasError={!!inputError} onSubmit={handleSearchComic}>
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
            <Link
              className="comic-card"
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
          ))}
        </Comic>
      )}
    </Container>
  );
};

export default ComicsFinder;
