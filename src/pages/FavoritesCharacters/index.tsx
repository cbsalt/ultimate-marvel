import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Title from '../../components/Title';

import { Container, Character } from './styles';

interface CharactersDataProps {
  uuid: string;
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

const FavoritesCharacters: React.FC = () => {
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
      toast.success('👍 favorite character successfully deleted!');
    },
    [characters],
  );

  return (
    <Container>
      <Title title="_favorite characters" />
      {characters.map((item) => (
        <Character key={item.uuid}>
          <>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.name}
            />
            <div>
              <strong>{item.name}</strong>
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

export default FavoritesCharacters;
