import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/Root'
import HomePage from './pages/Home'
import Results from './pages/Results'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'results', element: <Results /> }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App
