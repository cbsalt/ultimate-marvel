/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import ComicsDetails from '../ComicDetails';

import api from '../../services/api';

import { Container, Details, Character, ComicsList } from './styles';
import Title from '../../components/Title';
import Tooltip from '../../components/Tooltip';

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
}

interface DataProps {
  data: ResultsProps;
}

const CharacterDetails: React.FC = () => {
  const { params } = useRouteMatch<RouteParams>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [character, setCharacter] = useState<CharacterDataProps[]>([]);
  const [characterComics, setCharacterComics] = useState<ComicDataProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedComic, setSelectedComic] = useState<any>();

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
    async function getData(): Promise<void> {
      try {
        setLoading(true);

        const [characterItem, comicsList] = await Promise.all([
          api.get<DataProps>(
            `characters/${params.character}?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
          ),
          api.get<DataProps>(
            `characters/${params.character}/comics?ts=1622739038550&apikey=13b6b018c030bf1a6222a749e184c2ad&hash=f159cb16060d247633208bcce94dd878`,
          ),
        ]);

        const responseCharacter = characterItem.data;
        const characterData = responseCharacter.data.results.map(
          (item: any) => item,
        );

        const responseComics = comicsList.data;
        const comicsListData = responseComics.data.results.map(
          (item: any) => item,
        );

        setCharacter(characterData);
        setCharacterComics(comicsListData);
      } catch (err) {
        toast.error('😥 whoops! there was an error!');

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [params.character]);

  const handleSaveFavorite = useCallback(
    (item: any) => {
      const characterItem = {
        ...item,
        uuid: uuidv4(),
      };
      const newCharactersList = [...charactersList, characterItem];

      localStorage.setItem(
        '@Marvel:characters',
        JSON.stringify(newCharactersList),
      );
      setCharactersList(newCharactersList);

      toast.success('character saved to your favorite characters 🦸‍♀️');
    },
    [charactersList],
  );

  const handleShowModal = useCallback(
    (id: number) => {
      const comic = characterComics.find((item) => item.id === id);
      const selectedId = comic?.id;

      setModalIsOpen(true);
      setSelectedComic(selectedId);
    },
    [characterComics],
  );

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      <Title title="_character details" />
      {loading ? (
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
              <>
                <div key={item.description}>
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
              </>
            ))}
          </Details>
        </>
      )}
      {characterComics.length > 0 && (
        <ComicsList>
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
        </ComicsList>
      )}

      <Modal
        width={800}
        height={500}
        isOpen={modalIsOpen}
        handleClose={handleCloseModal}
      >
        <ComicsDetails id={selectedComic} handleCloseModal={handleCloseModal} />
      </Modal>
    </Container>
  );
};

export default CharacterDetails;
