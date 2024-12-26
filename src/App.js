import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import MediaViewer from "./components/MediaViewer/Index";
import "./App.css";
import "antd/dist/reset.css";
import "./fonts/Poppins-Black.ttf";
import "./fonts/Poppins-Bold.ttf";
import "./fonts/Poppins-Black.ttf";
import "./fonts/Poppins-ExtraBold.ttf";
import "./fonts/Poppins-Light.ttf";
import "./fonts/Poppins-Medium.ttf";
import "./fonts/Poppins-Regular.ttf";
import "./fonts/Poppins-SemiBold.ttf";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound/NotFound";
import UserDataTable from "./components/UserDataTables/Index";
import PostCreator from "./PostCreator";


function App() {
    return (
    <BrowserRouter >
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        <Route
          path='/:name'
          element={
            <Layout>
              <MediaViewer />
            </Layout>
          }
        />
        <Route
          path='/admin'
          element={
            <Layout hideHeader>
              <UserDataTable />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
