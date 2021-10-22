import React, { useCallback, useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Title from '../../components/Title';
import Loader from '../../components/Loader';
import HeaderDetailsContainer from '../../components/HeaderDetailsContainer';
import DetailsContainer from '../../components/DetailsContainer';
import PageContainer from '../../components/PageContainer';
import Tooltip from '../../components/Tooltip';

import ComicsServices from '../../services/ComicsServices';
import { truncateText } from '../../utils/truncateText';

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

export const ComicDetails: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);

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

        const response = await ComicsServices.listComicDetails(params?.comic);

        const responseComics = response.data;
        const comicsData = responseComics.results.map(
          (item: ResultsProps) => item,
        );

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
    const newComicItem = {
      ...item,
      uuid: uuidv4(),
    };
    const newComicsList = [...comicsList, newComicItem];

    localStorage.setItem('@Marvel:comics', JSON.stringify(newComicsList));
    setComicsList(newComicsList);

    toast.success('comic saved to your favorite comics 📖');
  }, []);

  return (
    <PageContainer>
      <Title to="comics" title="comic details" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <HeaderDetailsContainer>
            {comic.map((item) => (
              <header>
                <img src={item.thumbnail.path} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <Tooltip text="add to favorites">
                    <button
                      type="button"
                      onClick={() => handleSaveFavorite(item)}
                    >
                      <MdFavorite size={28} color="#fff" />
                    </button>
                  </Tooltip>
                </div>
              </header>
            ))}
          </HeaderDetailsContainer>
          <DetailsContainer>
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
                          <strong key={character.name}>{character.name}</strong>
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
          </DetailsContainer>
        </>
      )}
    </PageContainer>
  );
};

export default ComicDetails;
