import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Airports } from "./pages/Airports";
import { Home } from "./pages/Home";
import { Special } from "./pages/Special";
import { Stadiums } from "./pages/Stadiums";
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/airports',
    element: <Airports />
  },
  {
    path: '/stadiums',
    element: <Stadiums />
  },
  {
    path: '/special',
    element: <Special />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App