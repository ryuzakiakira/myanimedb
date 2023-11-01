import { Outlet} from "react-router-dom";

import MainNavigation from "../components/UI/MainNavigation";
import { useState } from "react";

function RootLayout() {
    const [fetchedData, setFetchedData] = useState(null);

  const searchFn = async (query) => {
        const temp1 = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&order_by=rank&sort=asc&limit=20`);
        const temp2 = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=rank&sort=asc&limit=20`);
        const manga = await temp1.json();
        const anime = await temp2.json();
        const searchResults = [...manga.data, ...anime.data];
        setFetchedData(searchResults);
  }

    return (
        <>
            <MainNavigation fetchedData={fetchedData} searchFn={searchFn} />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;