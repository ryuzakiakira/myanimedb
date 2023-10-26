import { useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";

function HomePage() {
  const [seasonalAnime, setSeasonalAnime] = useState([]);

  const getTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/seasons/now");
    const anime = await temp.json();
    setSeasonalAnime(anime.data);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <main>
      <AnimeList anime={seasonalAnime} pageTitle={"Seasonal Anime"} />
    </main>
  );
}

export default HomePage;
