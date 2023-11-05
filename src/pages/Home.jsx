import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingIndicator from '../components/UI/LoadingIndicator';
import List from '../components/lists/List';

function HomePage() {
  const { airing } = useLoaderData();

  return (
    <Suspense fallback={<LoadingIndicator />} >
      <Await resolve={airing} >
        {loaderAiring => <List list={loaderAiring} />}
      </Await>
    </Suspense>
  );
}

export default HomePage;

async function loadAiring() {
  const response = await fetch('https://api.jikan.moe/v4/seasons/now');

  if (!response.ok) {
    return json({ message: 'Could not fetch anime' }, { status: response.status });
  } else {
    const airing = await response.json();
    return airing.data
  }
} 

export function loader() {
  return defer({
    airing: loadAiring()
  })
}
