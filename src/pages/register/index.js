import { Auth } from "aws-amplify";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Col, Form, Input, message, Row } from "antd";

import { INDEX_ROUTE } from "routes";

import AuthContainer from "components/authContainer";

const requiredRule = { required: true };
const validateMessages = {
  required: "${label} is required!",
};

export default function Register() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  function onFormSubmit(values) {
    setLoading(true);
    Auth.signUp(values)
      .then((response) => {
        setLoading(false);
        history.push(INDEX_ROUTE);
        message.success("Account created successfully");
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.message);
      });
  }

  return (
    <AuthContainer title="Signup">
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={(values) => onFormSubmit(values)}
      >
        <Form.Item label="Username" name="username" rules={[requiredRule]}>
          <Input type="text" placeholder="Enter username" size="large" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[requiredRule]}>
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>
        <Form.Item noStyle>
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Signup
              </Button>
            </Col>
            <Col>
              <Link to={INDEX_ROUTE}>Already have account?</Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </AuthContainer>
  );
}
