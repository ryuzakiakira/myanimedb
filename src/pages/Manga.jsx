import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import List from "../components/lists/List";

function MangaPage() {
  const { manga } = useLoaderData();

    return (
        <Suspense fallback={<LoadingIndicator />}>
          <Await resolve={manga}>
            {loaderManga => <List list={loaderManga}/>}
          </Await>
        </Suspense>
    )
  }
  
  export default MangaPage;

  async function loadManga() {
    const response = await fetch('https://api.jikan.moe/v4/top/manga?top_anime_filter="bypopularity"');

    if (!response.ok) {
      return json({ message: 'Could not fetch Manga'} , { status: response.status } );
    } else {
      const manga = await response.json();
      return manga.data
    }
  }

  export function loader() {
    return defer({
      manga: loadManga(),
    })
  }