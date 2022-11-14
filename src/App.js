// import SearchField from "./components/SearchField.jsx";
import Search from "./components/search/Search.jsx";
import Header from "./components/Header.jsx";
import "./snoop.css";
import SearchArticleDetails from "./components/SearchArticleDetails.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Search />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
