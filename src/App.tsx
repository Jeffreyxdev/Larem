import { Route , Routes} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./Page/NotFound";
import Home from "./Page/Home";
import SignUpForm from "./Page/Signup";
import { auth } from "./DB/Firebase";
import { useState } from "react";

const queryClient = new QueryClient();


 
const App = () => {
   const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  
  return (
    <>
  <QueryClientProvider client={queryClient}></QueryClientProvider>
  <Routes>
          <Route path="/" element={<Home/>} />
         <Route path="/signup" element={<SignUpForm setIsAuth={setIsAuth}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </>
  )
}

export default App