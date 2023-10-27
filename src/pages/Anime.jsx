import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import List from "../components/lists/List";

function AnimePage() {
  const { anime } = useLoaderData();

    return (
      <Suspense fallback={<LoadingIndicator />} >
        <Await resolve={anime}>
          {(loaderAnime) => <List list={loaderAnime} />}
        </Await>
      </Suspense>
    )
  }
  
  export default AnimePage;

  async function loadAnime() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?top_anime_filter="bypopularity"');

    if (!response.ok) {
      return json({ message: 'Could not fetch anime' }, { status: response.status });
    } else {
      const anime = await response.json();
      return anime.data
    }
  }

  export function loader() {
    return defer({
      anime: loadAnime(),
    })
  }