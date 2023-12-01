import { useState } from "react";

import AnimeList from "./AnimeList";
import MangaList from "./MangaList";

function Lists() {
  const [isMangaTab, setIsMangaTab] = useState(false);

  return (
    <>
      <nav>
        <button
          onClick={() => {
            setIsMangaTab(false);
          }}
        >
          Anime
        </button>
        <button
          onClick={() => {
            setIsMangaTab(true);
          }}
        >
          Manga
        </button>
      </nav>
      <main>
        {!isMangaTab && <AnimeList />}
        {isMangaTab && <MangaList />}
      </main>
    </>
  );
}

export default Lists;
