import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesContainer from "src/pages/PagesContainer";

export enum RoutesList {
    Home = "/",

}
const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<PagesContainer />}>

          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default Router;
