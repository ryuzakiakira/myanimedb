import { useEffect, useState } from "react";

import AnimeList from "../components/lists/AnimeList";
import MangaList from "../components/lists/MangaList";
import LoadingIndicator from "../components/UI/LoadingIndicator";

function HomePage() {
  const [anime, setAnime] = useState(null);
  const [manga, setManga] = useState(null);

  const getAnime = async () => {
    try {
      const temp = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
      const anime = await temp.json();
      setAnime(anime.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getManga = async () => {
    try {
      const temp = await fetch("https://api.jikan.moe/v4/top/manga?limit=24");
      const manga = await temp.json();
      setManga(manga.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnime();
    setTimeout(() => {
        getManga()
    }, 1000);
  }, []);

  return (
    <main style={{ display: "flex", flexWrap: "wrap" }}>
      {!anime && !manga && <LoadingIndicator />}
      {anime && manga && <AnimeList anime={anime} pageTitle={"Anime"} />}
      {manga && <MangaList manga={manga} pageTitle={"Manga"} />}
    </main>
  );
}

export default HomePage;
