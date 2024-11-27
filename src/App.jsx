import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import { route } from "./routes";
import UserProvider from "./context/UserContext";
import { RouterProvider } from "react-router-dom";
import Swall from "sweetalert2"
import { useEffect, useState } from "react";
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24*60*60*1000,
      networkMode: "offlineFirst",
    },
  },
});
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
})
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
})



// chucho 2

function App() {

  const[isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    }
    const handleOffline = () => {
      setIsOnline(false);
      Swall.fire({
        title: "Error",
        text: "No hay internet",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#3b82f6",
      });
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, [])  




  return (
    <QueryClientProvider client={queryClient}>
      {       !isOnline && <div className="w-full bg-red-200 transition-all duration-300 flex justify-center items-center" >Modo Sin Internet</div>
 }
        <RouterProvider router={route} />
        <ReactQueryDevtools initialIsOpen={false} />
        
        
    </QueryClientProvider>
  );
}

export default App;
