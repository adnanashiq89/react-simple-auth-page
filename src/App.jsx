import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  AuthorizeWrapper,
  PrivateRoutes,
  PublicRoutes,
  UnAuthorizedWrapper,
} from "./routes";

export const App = () => {
  let token = localStorage.getItem("token");

  function renderRoutes() {
    if (token) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          {PrivateRoutes.map(({ path, element, key }) => (
            <Route key={key} exact path={path} element={<AuthorizeWrapper />}>
              <Route path={path} element={element} />
            </Route>
          ))}
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {PublicRoutes.map(({ path, element, key }) => (
            <Route
              key={key}
              exact
              path={path}
              element={<UnAuthorizedWrapper />}
            >
              <Route key={key + 1} exact path={path} element={element} />
            </Route>
          ))}
        </Routes>
      );
    }
  }
  return <Router>{renderRoutes()}</Router>;
};
