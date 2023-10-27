import { useEffect, useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import List from "../components/lists/List";

function AnimePage() {
  const [anime, setAnime] = useState(null);

  const getAnime = async () => {
    try {
      const temp = await fetch('https://api.jikan.moe/v4/top/anime?top_anime_filter="bypopularity"');
      const anime = await temp.json();
      setAnime(anime.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnime();
  }, [])

    return (
      <>
        {!anime && <LoadingIndicator />}
        {anime && <List list={anime} />}
      </>
    )
  }
  
  export default AnimePage;