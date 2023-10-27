import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root'
import HomePage from './pages/Home'
import Results from './pages/Results'
import AnimePage from './pages/Anime'
import MangaPage from './pages/Manga'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'anime', element: <AnimePage /> },
      { path: 'manga', element: <MangaPage /> },
      { path: 'results', element: <Results /> }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
