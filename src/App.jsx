import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage, { loader as currentlyAiringAnime } from "./pages/Home";
import Results from "./pages/Results";
import AnimePage, { loader as animeLoader } from "./pages/Anime";
import MangaPage, { loader as mangaLoader } from "./pages/Manga";
import DetailsPage from "./pages/Details";
import AnimeList from "./pages/AnimeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: currentlyAiringAnime,
      },
      {
        path: "anime",
        element: <AnimePage />,
        loader: animeLoader,
      },
      {
        path: "anime/:animeId",
        element: <DetailsPage />,
      },
      {
        path: "manga",
        element: <MangaPage />,
        loader: mangaLoader,
      },
      {
        path: "manga/:mangaId",
        element: <DetailsPage />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "list",
        element: <AnimeList />
      }
    ],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
