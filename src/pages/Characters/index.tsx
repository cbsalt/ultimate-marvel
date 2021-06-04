import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Error, Heroes } from './styles';

import logoImg from '../../assets/marvel-logo.svg';
import api from '../../services/api';

interface ComicsProps {
  resourceURI: string;
  name: string;
}

interface UrlProps {
  type: string;
  url: string;
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

  async function handleSearchHeroe(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!newHero) {
      setInputError('type here first, please! 🤓');
      return;
    }

    try {
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
      console.log(err, 'there was an error in the request');
    }
  }

  return (
    <>
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
      <Heroes>
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
                <p>{characterItem.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </>
        ))}
      </Heroes>
    </>
  );
};

export default Characters;
