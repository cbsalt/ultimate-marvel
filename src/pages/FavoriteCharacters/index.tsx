import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const [characters, setCharacters] = useState<CharactersDataProps[]>(() => {
    const storagedCharacter = localStorage.getItem('@Marvel:characters');

    if (storagedCharacter) {
      return JSON.parse(storagedCharacter);
    }
    return [];
  });

  useEffect(() => {
    setCharacters([...characters]);
  }, []);

  const handleRemoveFavorite = useCallback(
    (id: string) => {
      const filtered = characters.filter(
        (filteredItem) => filteredItem.uuid !== id,
      );

      setCharacters(filtered);
      localStorage.setItem('@Marvel:characters', JSON.stringify(filtered));
      toast.success('favorite character successfully deleted! 👍');
    },
    [characters],
  );

  return (
    <Container>
      <Title to="" title="_favorite characters" />
      {characters.map((item) => (
        <Character key={item.uuid}>
          <>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.name}
            />
            <div>
              <Link to={`/character/${item.id}`}>
                <strong>{item.name}</strong>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFavorite(item.uuid)}
            >
              <FaTrash size={28} color="#ffffff" />
            </button>
          </>
        </Character>
      ))}
    </Container>
  );
};

export default FavoriteCharacters;
