import { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import { useParams, useHistory } from "react-router-dom";

import { INDEX_ROUTE } from "routes";
import { getApplicationDetail } from "actions";

import AppContainer from "components/appContainer";

const { Paragraph } = Typography;

export default function ApplicationDetail() {
  const params = useParams();
  const history = useHistory();

  const { applicationId } = params;
  const [applicationDetail, setApplicationDetail] = useState({});

  useEffect(() => {
    if (applicationId) {
      getApplicationDetail(applicationId)
        .then((response) => {
          setApplicationDetail(response.data);
        })
        .catch((err) => {
          history.push(INDEX_ROUTE);
        });
    } else {
      history.push(INDEX_ROUTE);
    }
  }, [applicationId]);

  return (
    <AppContainer breadcrumbItems={[applicationDetail.name]}>
      <div className="application-detail-page">
        <Card>
          <Row  className="data-row">
            <Col span={8}>Application Id</Col>
            <Col>
              <Paragraph copyable>{applicationDetail.application_id}</Paragraph>
            </Col>
          </Row>
          <Row className="data-row">
            <Col span={8}>Application Secret</Col>
            <Col>
              <Paragraph copyable>
                {applicationDetail.application_secret}
              </Paragraph>
            </Col>
          </Row>
          <Row className="data-row">
            <Col span={8}>Chain</Col>
            <Col>{applicationDetail.chain}</Col>
          </Row>
        </Card>
      </div>
    </AppContainer>
  );
}
