import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoContent from '../../components/NoContent';

import Title from '../../components/Title';

import { Container, Character } from './styles';

interface CharactersDataProps {
  uuid: string;
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

const FavoriteCharacters: React.FC = () => {
  const [charactersList, setCharactersList] = useState<CharactersDataProps[]>(
    () => {
      const storagedCharacter = localStorage.getItem('@Marvel:characters');

      if (storagedCharacter) {
        return JSON.parse(storagedCharacter);
      }
      return [];
    },
  );

  useEffect(() => {
    setCharactersList((prevState) => [...prevState]);
  }, []);

  const handleRemoveFavoriteCharacter = useCallback(
    (id: string) => {
      const filtered = charactersList.filter(
        (filteredItem) => filteredItem.uuid !== id,
      );

      setCharactersList(filtered);
      localStorage.setItem('@Marvel:characters', JSON.stringify(filtered));
      toast.success('favorite character successfully deleted! 👍');
    },
    [charactersList],
  );

  return (
    <Container>
      <Title to="" title="_favorite characters" />
      {charactersList.length < 1 ? (
        <NoContent content="character" />
      ) : (
        <>
          {charactersList.map((character) => (
            <Character key={character.uuid}>
              <>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
                <div>
                  <Link to={`/character/${character.id}`}>
                    <strong>{character.name}</strong>
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFavoriteCharacter(character.uuid)}
                >
                  <FaTrash size={28} color="#ffffff" />
                </button>
              </>
            </Character>
          ))}
        </>
      )}
    </Container>
  );
};

export default FavoriteCharacters;
