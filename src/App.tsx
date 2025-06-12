import { Route , Routes} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./Page/NotFound";
import Home from "./Page/Home";
import SignUpForm from "./Page/Signup";


const queryClient = new QueryClient();

const App = () => {
  return (
    <>
  <QueryClientProvider client={queryClient}></QueryClientProvider>
  <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/signup" element={<SignUpForm/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </>
  )
}

export default App