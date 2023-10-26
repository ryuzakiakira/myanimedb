import { useEffect, useState } from "react";

import AnimeList from "../components/AnimeList";
import MangaList from "../components/MangaList";

function HomePage() {
  const [seasonalAnime, setSeasonalAnime] = useState(null);
  const [topManga, setTopManga] = useState(null);

  const getAnime = async () => {
    try {
      const temp = await fetch("https://api.jikan.moe/v4/seasons/now");
      const anime = await temp.json();
      setSeasonalAnime(anime.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getManga = async () => {
    try {
      const temp = await fetch("https://api.jikan.moe/v4/top/manga?limit=24");
      const manga = await temp.json();
      setTopManga(manga.data);
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
    <main style={{ display: "flex" }}>
      {!seasonalAnime && <h3 style={{margin: 50}}>Anime is loading...</h3>}
      {seasonalAnime && <AnimeList anime={seasonalAnime} pageTitle={"Seasonal Anime"} />}
      {!topManga && <h3 style={{margin: 50}}>Manga is Loading...</h3>}
      {topManga && <MangaList manga={topManga} pageTitle={"Top Manga"} />}
    </main>
  );
}

export default HomePage;
