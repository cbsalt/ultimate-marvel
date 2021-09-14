/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';

import { useRouteMatch } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import Title from '../../components/Title';
import Tooltip from '../../components/Tooltip';

import ModalComic from '../ModalComic';

import api from '../../services/api';

import {
  Container,
  Details,
  Character,
  ComicsList,
  Pagination,
  TotalPages,
} from './styles';

interface RouteParams {
  character: string;
}

interface ComicDataProps {
  id: number;
  title: string;
}

interface CharacterDataProps {
  id: number;
  comics: {
    available: number;
  };
  description: string;
  series: {
    available: number;
  };
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface ResultsProps {
  results: CharacterDataProps[] | ComicDataProps[];
  total: number;
  offset: number;
}

interface DataProps {
  data: ResultsProps;
}

const CharacterDetails: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);

  const [character, setCharacter] = useState<CharacterDataProps[]>([]);
  const [characterComics, setCharacterComics] = useState<ComicDataProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedComic, setSelectedComic] = useState<undefined | number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalComics, setTotalPages] = useState(0);

  const [charactersList, setCharactersList] = useState<CharacterDataProps[]>(
    () => {
      const storagedCharacters = localStorage.getItem('@Marvel:characters');

      if (storagedCharacters) {
        return JSON.parse(storagedCharacters);
      }
      return [];
    },
  );

  useEffect(() => {
    async function fetchCharactersData(): Promise<void> {
      try {
        setLoading(true);

        const [characterItem, comicsList] = await Promise.all([
          api.get<DataProps>(
            `characters/${params.character}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
          ),
          api.get<DataProps>(
            `characters/${params.character}/comics?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
            {
              params: {
                offset: currentPage,
              },
            },
          ),
        ]);

        const { data } = characterItem.data;
        const characterData = data.results.map((item: any) => item);

        const responseComics = comicsList.data;

        const current = responseComics.data.offset;
        const total = Math.round(responseComics.data.total / 20);
        const comicsListData = responseComics.data.results.map(
          (item: any) => item,
        );

        setTotalPages(total);
        setCurrentPage(current);
        setCharacter(characterData);
        setCharacterComics(comicsListData);
      } catch (err) {
        toast.error('😥 whoops! there was an error!');

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCharactersData();
  }, [params.character, currentPage]);

  const handleSaveFavorite = useCallback(
    (item: CharacterDataProps) => {
      const newFavoriteCharacterItem = {
        ...item,
        uuid: uuidv4(),
      };
      const newFavoriteCharactersList = [
        ...charactersList,
        newFavoriteCharacterItem,
      ];

      localStorage.setItem(
        '@Marvel:characters',
        JSON.stringify(newFavoriteCharactersList),
      );
      setCharactersList(newFavoriteCharactersList);

      toast.success('character saved to your favorite characters 🦸‍♀️');
    },
    [charactersList],
  );

  const handleShowModal = useCallback(
    (id: number) => {
      const comic = characterComics.find((item) => item.id === id);
      const selectedComicId = comic?.id;

      setModalIsOpen(true);
      setSelectedComic(selectedComicId);
    },
    [characterComics],
  );

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 20);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 20);
  };

  return (
    <Container>
      <Title to="" title="_character details" />
      {loading && character.length === 0 ? (
        <Loader />
      ) : (
        <>
          <Character>
            {character.map((item) => (
              <header key={item.id}>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt={item.name}
                />
                <div>
                  <strong>{item.name}</strong>
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
          </Character>
          <Details>
            {character.map((item) => (
              <React.Fragment key={item.description}>
                <div>
                  {item.description ? (
                    <p>{item.description}</p>
                  ) : (
                    <p>there&apos;s no description for this character yet</p>
                  )}
                </div>
                <ul>
                  <li>
                    <strong>{item.comics.available}</strong>
                    <span>_comics</span>
                  </li>
                  <li>
                    <strong>{item.series.available}</strong>
                    <span>_collects</span>
                  </li>
                </ul>
              </React.Fragment>
            ))}
          </Details>
        </>
      )}
      {characterComics.length > 0 && (
        <>
          <ComicsList>
            {loading ? (
              <div className="skeleton-container">
                <span
                  className="skeleton-loader"
                  style={{
                    height: '24px',
                    marginBottom: '6px',
                    maxWidth: '240px',
                  }}
                />
                {characterComics.map(() => (
                  <span key={Math.random()} className="skeleton-loader" />
                ))}
              </div>
            ) : (
              <div>
                {character.map((item) => (
                  <strong key={item.name}>Comics of {item.name}</strong>
                ))}
                {characterComics.map((comicItem) => (
                  <div
                    key={comicItem.id}
                    onClick={() => handleShowModal(comicItem.id)}
                    aria-hidden="true"
                  >
                    <ul>
                      <li>{comicItem.title}</li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </ComicsList>
          {totalComics > 20 && (
            <TotalPages>
              <p>
                page {currentPage / 20} of {Math.ceil(totalComics / 20)}
              </p>
            </TotalPages>
          )}
          <Pagination>
            {currentPage > 1 && (
              <span
                role="button"
                className="side-link"
                aria-hidden="true"
                onClick={() => handlePrevPage()}
              >
                PREVIOUS
              </span>
            )}

            {currentPage < totalComics && totalComics > 20 && (
              <span
                className="side-link"
                role="button"
                aria-hidden="true"
                onClick={() => handleNextPage()}
              >
                NEXT
              </span>
            )}
          </Pagination>
        </>
      )}

      <Modal
        width={800}
        height={500}
        isOpen={modalIsOpen}
        handleClose={handleCloseModal}
        className="Modal"
      >
        <ModalComic id={selectedComic} handleCloseModal={handleCloseModal} />
      </Modal>
    </Container>
  );
};

export default CharacterDetails;
