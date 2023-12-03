import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommentPage from "./components/CommentPage";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <ChakraProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/comments/:postId" element={<CommentPage />} />
            </Routes>
          </Layout>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
