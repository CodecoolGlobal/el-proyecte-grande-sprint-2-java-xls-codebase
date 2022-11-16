// import SearchField from "./components/SearchField.jsx";
import Search from "./components/search/Search.jsx";
import Header from "./components/Header.jsx";
import { AppBar } from '@mui/material'
import "./snoop.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Search />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
