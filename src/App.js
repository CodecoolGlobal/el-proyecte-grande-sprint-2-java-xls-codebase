import Redirect from "./components/routes/Redirect.jsx";
import Home from "./components/routes/Home.jsx";
import Desk from "./components/routes/Desk.jsx";

import "./snoop.css";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/redirect" element={<Redirect/>}/>
        <Route path="/authorized" element={<Redirect />} />
            <Route path="/" element={<Home/>}/>
            <Route path="/desk" element={<Desk/>}/>
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
