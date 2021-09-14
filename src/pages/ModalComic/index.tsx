import React, { useCallback, useEffect, useState } from 'react';
import { MdClose, MdFavorite } from 'react-icons/md';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Image from '../../components/Image';
import Loader from '../../components/Loader';
import Tooltip from '../../components/Tooltip';

import api from '../../services/api';

import { Wrapper, Header, AboutComic } from './styles';

interface ComponentProps {
  id: number | undefined;
  handleCloseModal: () => void;
}

interface ComicDataProps {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  series: {
    name: string;
  };
  pageCount: number;
}

interface ResultsProps {
  results: ComicDataProps[];
}

interface DataProps {
  data: ResultsProps;
}

const ModalComic: React.FC<ComponentProps> = ({
  id,
  handleCloseModal,
}: ComponentProps) => {
  const [comic, setComic] = useState<ComicDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);
  const [comicsList, setComicsList] = useState<ComicDataProps[]>(() => {
    const storagedCharacters = localStorage.getItem('@Marvel:comics');

    if (storagedCharacters) {
      return JSON.parse(storagedCharacters);
    }
    return [];
  });

  useEffect(() => {
    async function getComics(): Promise<void> {
      try {
        setLoading(true);
        const fetchComicsData = await api.get<DataProps>(
          `comics/${id}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
        );

        const response = fetchComicsData.data;
        const comicData = response.data.results.map((item) => item);

        setComic(comicData);
      } catch (err) {
        toast.error('😥 whoops! there was an error! try again later.');

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getComics();
  }, [id]);

  const handleSaveFavoriteComic = useCallback(
    (item: ComicDataProps) => {
      const comicItem = {
        ...item,
        uuid: uuidv4(),
      };
      const newComicsList = [...comicsList, comicItem];

      localStorage.setItem('@Marvel:comics', JSON.stringify(newComicsList));
      setComicsList(newComicsList);

      toast.success('comic saved to your favorite comics 📖');
    },
    [comicsList],
  );

  return (
    <Wrapper>
      <Header>
        <h2>_comic details</h2>
        <MdClose size={24} onClick={handleCloseModal} />
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {comic.map((item) => (
            <React.Fragment key={item.id}>
              <AboutComic>
                <Image
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt={item.title}
                />
                <div className="wrapper-details">
                  <p>{item.description}</p>
                  <ul>
                    <li>
                      <strong>Serie</strong>
                      <span>{item.series.name}</span>
                    </li>
                    <li>
                      <strong>Pages</strong>
                      <span>{item.pageCount}</span>
                    </li>
                  </ul>
                  <div className="wrapper-tooltip">
                    <Tooltip text="add to favorites">
                      <button
                        type="button"
                        onClick={() => handleSaveFavoriteComic(item)}
                      >
                        <MdFavorite size={28} color="#ffffff" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </AboutComic>
            </React.Fragment>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default ModalComic;
