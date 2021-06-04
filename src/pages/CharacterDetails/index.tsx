import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';

import { Header, Character, ComicsList } from './styles';

interface RouteParams {
  character: string;
}

interface ComicDataProps {
  id: number;
  title: string;
}

interface CharacterDataProps {
  id: number;
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
  const [character, setCharacter] = useState<CharacterDataProps[]>([]);
  const [characterComics, setCharacterComics] = useState<ComicDataProps[]>([]);
  const { params } = useRouteMatch<RouteParams>();

  useEffect(() => {
    async function getData(): Promise<void> {
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
      const comicsData = responseComics.data.results.map((item: any) => item);

      setCharacter(characterData);
      setCharacterComics(comicsData);
    }

    getData();
  }, [params.character]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiArrowLeft size={16} />
          <h1>Character details</h1>
        </Link>
      </Header>
      <Character>
        {character.map((item) => (
          <header key={item.id}>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.name}
            />
            <div>
              <strong>{item.name}</strong>
            </div>
          </header>
        ))}
      </Character>
      <ComicsList>
        <div>
          {character.map((item) => (
            <strong key={item.id}>Comics of {item.name}</strong>
          ))}
          {characterComics.map((comic) => (
            <Link key={comic.id} to={`/comic/${comic.id}`}>
              <ul>
                <li>{comic.title}</li>
              </ul>
            </Link>
          ))}
        </div>
      </ComicsList>
    </>
  );
};

export default CharacterDetails;
