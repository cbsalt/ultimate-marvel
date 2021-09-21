import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Title, Form, Error, Character } from './styles';

import logoImg from '../../assets/marvel-logo.svg';
import Loader from '../../components/Loader';
import { truncateText } from '../../utils/truncateText';
import CharactersService from '../../services/CharactersService';

interface ComicsProps {
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

const Characters: React.FC = () => {
  const [newCharacter, setNewCharacter] = useState('');
  const [inputError, setInputError] = useState('');
  const [characters, setCharacters] = useState<CharactersDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);

  async function handleSearchCharacter(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!newCharacter) {
      setInputError('type here first, please! 🤓');
      return;
    }

    try {
      setLoading(true);

      const fetchCharactersData = await CharactersService.listCharacters(
        newCharacter,
      );

      const response = fetchCharactersData.data;

      const charactersList = response.results.map((item: ResultsProps) => item);

      if (charactersList.length === 0) {
        setInputError(`looks like this character is busy or doesn't exist! 😥`);
        setCharacters([]);
        return;
      }

      setCharacters(charactersList);
      setNewCharacter('');
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
      <Title>Characters finder</Title>
      <Form hasError={!!inputError} onSubmit={handleSearchCharacter}>
        <input
          value={newCharacter}
          placeholder="Search for your character"
          onChange={(e) => setNewCharacter(e.target.value)}
        />
        <button type="submit">Assemble!</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      {loading ? (
        <Loader />
      ) : (
        <Character>
          {characters.map((characterItem) => (
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
                    😯 sorry! there&apos;s no description for this character yet
                  </p>
                )}
              </div>
              <FiChevronRight size={20} />
            </Link>
          ))}
        </Character>
      )}
    </Container>
  );
};

export default Characters;
