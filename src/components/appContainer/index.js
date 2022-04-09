import { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Breadcrumb, Row, Col, Spin, Space } from "antd";

import { INDEX_ROUTE } from "routes";

import logo from "assets/logo.png";
import AccountHOC from "hoc/account";

function AppContainer({ breadcrumbItems = [], children, setAccountData }) {
  const history = useHistory();
  const [loggingOut, setLoggingOut] = useState(false);

  function onLogout() {
    if (!loggingOut) {
      setLoggingOut(true);
      Auth.signOut({ global: true }).then(() => {
        setLoggingOut(false);
        setAccountData({});
        history.push(INDEX_ROUTE);
      });
    }
  }

  return (
    <div className="app-container">
      <Row justify="space-between" align="middle" className="header">
        <Col>
          <Space>
            <img src={logo} alt="Passbird" width={80} className="logo" />
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => history.push(INDEX_ROUTE)}>
                METAKEEP | Developer console
              </Breadcrumb.Item>
              {breadcrumbItems.map((item, idx) => {
                return <Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>;
              })}
            </Breadcrumb>
          </Space>
        </Col>
        <Col onClick={() => onLogout()} className="cursor-pt">
          {loggingOut ? <Spin size="small" /> : "Logout"}
        </Col>
      </Row>
      <div className="container">{children}</div>
    </div>
  );
}

export default AccountHOC(AppContainer);
