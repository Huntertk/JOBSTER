import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout } from './pages';

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout />
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App