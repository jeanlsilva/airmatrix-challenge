import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Airports } from "./pages/Airports";
import { Home } from "./pages/Home";
import { Special } from "./pages/Special";
import { Stadiums } from "./pages/Stadiums";
import './global.css';
import { QueryClientProvider, QueryClient } from "react-query";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App