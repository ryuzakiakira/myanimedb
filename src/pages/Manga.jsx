import { useEffect, useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import List from "../components/lists/List";

function MangaPage() {
  const [manga, setManga] = useState(null);

  const getManga = async () => {
    try {
      const temp = await fetch('https://api.jikan.moe/v4/top/manga?top_anime_filter="bypopularity"');
      const manga = await temp.json();
      setManga(manga.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getManga();
  }, [])

    return (
      <>
        {!manga && <LoadingIndicator />}
        {manga && <List list={manga} />}
      </>
    )
  }
  
  export default MangaPage;