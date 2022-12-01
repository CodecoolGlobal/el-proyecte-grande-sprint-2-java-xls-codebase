// import SearchField from "./components/SearchField.jsx";
import Search from "./components/search/Search.jsx";
import Redirect from "./components/routes/Redirect.jsx";
import Home from "./components/routes/Home.jsx";

import "./snoop.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/authorized" element={<Redirect />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
