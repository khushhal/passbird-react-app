import { Button } from "antd";
import { useHistory } from "react-router";

import { INDEX_ROUTE } from "routes";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="not-found-page">
      <div>
        <p>Page not found</p>
        <Button
          size="large"
          type="primary"
          onClick={() => history.push(INDEX_ROUTE)}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
