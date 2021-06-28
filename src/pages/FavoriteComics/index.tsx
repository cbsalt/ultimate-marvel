import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Title from '../../components/Title';

import { Container, Comic } from './styles';

interface ComicDataProps {
  uuid: string;
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

const FavoriteComics: React.FC = () => {
  const [comics, setComics] = useState<ComicDataProps[]>(() => {
    const storagedComics = localStorage.getItem('@Marvel:comics');

    if (storagedComics) {
      return JSON.parse(storagedComics);
    }
    return [];
  });

  useEffect(() => {
    setComics([...comics]);
  }, []);

  const handleRemoveFavorite = useCallback(
    (id: string) => {
      const filtered = comics.filter(
        (filteredItem) => filteredItem.uuid !== id,
      );

      setComics(filtered);
      localStorage.setItem('@Marvel:comics', JSON.stringify(filtered));
      toast.success('favorite comic successfully deleted! 👍');
    },
    [comics],
  );

  return (
    <Container>
      <Title to="comics" title="_favorite comics" />
      {comics.map((item) => (
        <Comic key={item.uuid}>
          <>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.title}
            />
            <div>
              <Link to={`/comic/${item.id}`}>
                <strong>{item.title}</strong>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFavorite(item.uuid)}
            >
              <FaTrash size={28} color="#ffffff" />
            </button>
          </>
        </Comic>
      ))}
    </Container>
  );
};

export default FavoriteComics;
