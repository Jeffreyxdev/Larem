import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./Page/NotFound";
import Home from "./Page/Home";
import Companies from "./Page/companies/Companies";
import SignUpForm from "./Page/Signup";
import Explore from "./Page/Explore/Explore";

const queryClient = new QueryClient();

const App = () => {
  

  return (
    <>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<Companies />} />
       <Route path="/companies/:companyId/:carId" element={<Companies />} />
        <Route path="explore" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
