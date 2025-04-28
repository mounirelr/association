import { RouterProvider } from "react-router-dom";
 import { DataProvider } from '../DataContext';
import router from "../Router/index";

function App() {
  return <DataProvider>
  
    <RouterProvider router={router} />
      
    </DataProvider>
  
}

export default App;
