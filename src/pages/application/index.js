import { useEffect, useState } from "react";
import { Card, Button, message } from "antd";
import { useHistory } from "react-router-dom";

import { getApplications } from "actions";
import { getApplicationDetailRoute } from "routes";

import CreateApplicationModal from "./createModal";
import AppContainer from "components/appContainer";

export default function Application() {
  const history = useHistory();
  const [createCount, setCreateCount] = useState(0);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications().then((response) => {
      const { data } = response;
      if (!data.length) {
        message.success("Welcome back");
      }
      setApplications(data);
    });
  }, [createCount]);

  return (
    <>
      <AppContainer>
        <div className="application-page">
          <Card title="Applications">
            <If condition={applications.length}>
              {applications.map((application, idx) => {
                return (
                  <Card
                    key={idx}
                    className="application-item"
                    onClick={() =>
                      history.push(
                        getApplicationDetailRoute(application.application_id)
                      )
                    }
                  >
                    {application.name}
                  </Card>
                );
              })}
            </If>
            <Button size="large" onClick={() => setCreateModalVisible(true)}>
              Create application
            </Button>
          </Card>
        </div>
      </AppContainer>
      <CreateApplicationModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={() => {
          setCreateCount(createCount + 1);
          setCreateModalVisible(false);
        }}
      />
    </>
  );
}
