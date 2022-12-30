import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Router';

function App() {

  return (
    <div className='bg-white dark:bg-gray-900' >

      <RouterProvider router={router}></RouterProvider>
      
    </div>
  );
}

export default App;
