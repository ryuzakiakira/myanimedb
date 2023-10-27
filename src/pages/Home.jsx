import { useEffect, useState } from "react";

import AnimeList from "../components/lists/AnimeList";
import MangaList from "../components/lists/MangaList";
import LoadingIndicator from "../components/UI/LoadingIndicator";

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
    <main style={{ display: "flex", flexWrap: "wrap" }}>
      {!seasonalAnime && !topManga && <LoadingIndicator />}
      {seasonalAnime && topManga && <AnimeList anime={seasonalAnime} pageTitle={"Seasonal Anime"} />}
      {topManga && <MangaList manga={topManga} pageTitle={"Top Manga"} />}
    </main>
  );
}

export default HomePage;
