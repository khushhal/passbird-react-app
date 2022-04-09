import { Card } from "antd";

import logo from "assets/logo.png";

export default function AuthContainer({ title, children }) {
  return (
    <div className="auth-container container">
      <img src={logo} alt="Passbird" width={200} className="logo" />
      <Card>
        <p className="card-title">{title}</p>
        {children}
      </Card>
    </div>
  );
}
