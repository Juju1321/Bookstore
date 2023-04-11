import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesContainer from "src/pages/PagesContainer";
import Main from "src/pages/Main";
import Error404NotFound from "src/pages/Error404NotFound";
import Auth from "src/pages/Auth";
import ResetPassword from "src/pages/ResetPassword";
import NewPassword from "src/pages/NewPassword";

export enum RoutesList {
  Main = "/",
  Auth = "/auth",
  Reset = "/auth/reset",
  NewPassword = "/auth/reset/new-password",
  Default = "*",
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Main} element={<PagesContainer />}>
          <Route path={RoutesList.Main} element={<Main />} />
          <Route path={RoutesList.Auth} element={<Auth />} />
          <Route path={RoutesList.Reset} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
          <Route path={RoutesList.Default} element={<Error404NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
