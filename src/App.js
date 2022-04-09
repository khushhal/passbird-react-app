import axios from "axios";
import { Spin } from "antd";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Switch, BrowserRouter } from "react-router-dom";

import { isEmpty } from "_dash";
import { LOGGED_IN_ROUTES, NON_LOGIN_ROUTES } from "routes";

import Account from "hoc/account";
import RouteWithSubRoutes from "./components/routeWithSubRoutes";

const App = ({ accountData, setAccountData }) => {
  const isLoggedIn = !isEmpty(accountData);

  const [loading, setLoading] = useState(true);
  const [appRoutes, setAppRoutes] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((response) => {
        setLoading(false);
        axios.defaults.headers.common["Authorization"] = response.userDataKey;
        setAccountData(response);
        setAppRoutes(LOGGED_IN_ROUTES);
      })
      .catch((err) => {
        setLoading(false);
        setAppRoutes(NON_LOGIN_ROUTES);
      });
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="app-loader">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          {appRoutes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Account(App);
