import { useEffect, useState } from "react";
import AnimeList from "../components/AnimeList";

function HomePage() {
  const [topAnime, setTopAnime] = useState([]);

  const getTopAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/top/anime?limit=12");
    const anime = await temp.json();
    setTopAnime(anime.data);
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  return (
    <main>
      <AnimeList topAnime={topAnime} />
    </main>
  );
}

export default HomePage;
