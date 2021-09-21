import React, { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Title from '../../components/Title';
import NoContent from '../../components/NoContent';

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
  const [comicsList, setComicsList] = useState<ComicDataProps[]>(() => {
    const storagedComics = localStorage.getItem('@Marvel:comics');

    if (storagedComics) {
      return JSON.parse(storagedComics);
    }
    return [];
  });

  useEffect(() => {
    setComicsList((prevState) => [...prevState]);
  }, []);

  const handleRemoveFavoriteComic = useCallback(
    (id: string) => {
      const filtered = comicsList.filter(
        (filteredItem) => filteredItem.uuid !== id,
      );

      setComicsList(filtered);
      localStorage.setItem('@Marvel:comics', JSON.stringify(filtered));
      toast.success('favorite comic successfully deleted! 👍');
    },
    [comicsList],
  );

  return (
    <Container>
      <Title to="comics" title="_favorite comics" />
      {comicsList.length < 1 ? (
        <NoContent content="comic" />
      ) : (
        <>
          {comicsList.map((comic) => (
            <Comic key={comic.uuid}>
              <>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
                <div>
                  <Link to={`/comic/${comic.id}`}>
                    <strong>{comic.title}</strong>
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFavoriteComic(comic.uuid)}
                >
                  <FaTrash size={28} color="#ffffff" />
                </button>
              </>
            </Comic>
          ))}
        </>
      )}
    </Container>
  );
};

export default FavoriteComics;
