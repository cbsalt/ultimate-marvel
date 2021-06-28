import React, { useCallback, useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../../components/Loader';
import Title from '../../components/Title';
import Tooltip from '../../components/Tooltip';

import api from '../../services/api';
import { truncateText } from '../../utils/truncateText';

import { Container, Comic, Details } from './styles';

interface RouteParams {
  comic: string;
}

interface AvailableCharacters {
  name: string;
}

interface ComicDataProps {
  id: number;
  description: string;
  pageCount: number;
  series: {
    name: string;
  };
  characters: {
    available: number;
    items: AvailableCharacters[];
  };
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface ResultsProps {
  results: ComicDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

export const ComicDetails: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [comic, setComic] = useState<ComicDataProps[]>([]);
  const [comicsList, setComicsList] = useState<ComicDataProps[]>(() => {
    const storagedCharacters = localStorage.getItem('@Marvel:comics');

    if (storagedCharacters) {
      return JSON.parse(storagedCharacters);
    }
    return [];
  });

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get<DataProps>(
          `comics/${params.comic}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
        );

        const responseComics = response.data;
        const comicsData = responseComics.data.results.map((item) => item);

        setComic(comicsData);
      } catch (err) {
        toast.error('😥 whoops! there was an error!');

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [params.comic]);

  const handleSaveFavorite = useCallback((item: ComicDataProps) => {
    const comicItem = {
      ...item,
      uuid: uuidv4(),
    };
    const newComicsList = [...comicsList, comicItem];

    localStorage.setItem('@Marvel:comics', JSON.stringify(newComicsList));
    setComicsList(newComicsList);

    toast.success('character saved to your favorite characters 🦸‍♀️');
  }, []);

  return (
    <Container>
      <Title to="comics" title="comic details" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Comic>
            {comic.map((item) => (
              <header key={item.id}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt={item.title}
                />
                <div>
                  <strong>{item.title}</strong>
                  <Tooltip text="add to favorites">
                    <button
                      type="button"
                      onClick={() => handleSaveFavorite(item)}
                    >
                      <MdFavorite size={28} color="#ffffff" />
                    </button>
                  </Tooltip>
                </div>
              </header>
            ))}
          </Comic>
          <Details>
            {comic.map((item) => (
              <React.Fragment key={item.description}>
                <div>
                  {item.description ? (
                    <p>{item.description}</p>
                  ) : (
                    <p>there&apos;s no description for this comic yet</p>
                  )}
                </div>
                <ul>
                  <li>
                    <strong>{truncateText(`${item.series.name}`, 40)}</strong>
                    <span>_collect</span>
                  </li>
                  <li>
                    <strong>{item.pageCount}</strong>
                    <span>_pages</span>
                  </li>

                  <li>
                    {item.characters.available > 0 ? (
                      <>
                        {item.characters.items.map((character) => (
                          <strong>{character.name}</strong>
                        ))}
                        <span>_characters</span>
                      </>
                    ) : (
                      <>
                        <strong>0</strong>
                        <span>_characters</span>
                      </>
                    )}
                  </li>
                </ul>
              </React.Fragment>
            ))}
          </Details>
        </>
      )}
    </Container>
  );
};

export default ComicDetails;
