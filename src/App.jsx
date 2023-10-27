import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import Results from "./pages/Results";
import AnimePage, { loader as animeLoader } from "./pages/Anime";
import MangaPage, { loader as mangaLoader } from "./pages/Manga";
import DetailsPage from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "anime",
        element: <AnimePage />,
        loader: animeLoader,
        children: [
          {
            path: ":animeId",
            children: [{ index: true, element: <DetailsPage /> }],
          },
        ],
      },
      {
        path: "manga",
        element: <MangaPage />,
        loader: mangaLoader,
        children: [
          {
            path: ":mangaId",
            children: [{ index: true, element: <DetailsPage /> }],
          },
        ],
      },
      { path: "results", element: <Results /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
