import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesContainer from "src/pages/PagesContainer";
import Main from "src/pages/Main";

export enum RoutesList {
  Main = "/",
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Main} element={<PagesContainer />}>
          <Route path={RoutesList.Main} element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
