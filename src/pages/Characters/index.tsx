import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Title, Form, Error, Character } from './styles';

import logoImg from '../../assets/marvel-logo.svg';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { truncateText } from '../../utils/truncateText';

interface ComicsProps {
  resourceURI: string;
  name: string;
}

interface CharactersDataProps {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: {
    items: ComicsProps[];
  };
}

interface ResultsProps {
  results: CharactersDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

const Characters: React.FC = () => {
  const [newHero, setNewHero] = useState('');
  const [inputError, setInputError] = useState('');
  const [characters, setCharacters] = useState<CharactersDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSearchHeroe(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!newHero) {
      setInputError('type here first, please! 🤓');
      return;
    }

    try {
      setLoading(true);

      const response = await api.get<DataProps>(
        `characters?name=${newHero}&ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
      );

      const character = response.data;

      const dataHero = character.data.results.map((item) => item);

      if (dataHero.length === 0) {
        setInputError(`looks like this character is busy or doesn't exist! 😥`);
        setCharacters([]);
        return;
      }

      setCharacters(dataHero);
      setNewHero('');
      setInputError('');
    } catch (err) {
      toast.error('😥 whoops! there was an error! try again later.');

      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <img src={logoImg} alt="Marvel Logo" />
      <Title>Marvel finder</Title>
      <Form hasError={!!inputError} onSubmit={handleSearchHeroe}>
        <input
          value={newHero}
          placeholder="Search for your character"
          onChange={(e) => setNewHero(e.target.value)}
        />
        <button type="submit">Assemble!</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      {loading ? (
        <Loader />
      ) : (
        <Character>
          {characters.map((characterItem) => (
            <>
              <Link
                className="hero-card"
                to={`/character/${characterItem.id}`}
                key={characterItem.id}
              >
                <img
                  src={`${characterItem.thumbnail.path}.${characterItem.thumbnail.extension}`}
                  alt={characterItem.name}
                />
                <div>
                  <strong>{characterItem.name}</strong>
                  {characterItem.description ? (
                    <p>{truncateText(`${characterItem.description}`, 190)}</p>
                  ) : (
                    <p>
                      😯 sorry! there&apos;s no description for this character
                      yet
                    </p>
                  )}
                </div>
                <FiChevronRight size={20} />
              </Link>
            </>
          ))}
        </Character>
      )}
    </Container>
  );
};

export default Characters;
