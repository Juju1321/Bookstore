import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesContainer from "src/pages/PagesContainer";
import Main from "src/pages/Main";
import Error404NotFound from "src/pages/Error404NotFound";

export enum RoutesList {
  Main = "/",
  Default = "*",
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Main} element={<PagesContainer />}>
          <Route path={RoutesList.Main} element={<Main />} />
            <Route path={RoutesList.Default} element={<Error404NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
