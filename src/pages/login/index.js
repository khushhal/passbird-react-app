import QRCode from "qrcode.react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { Button, Col, Form, Input, message, Row } from "antd";

import { SIGNUP_ROUTE } from "routes";

import Account from "hoc/account";
import AuthContainer from "components/authContainer";

const requiredRule = { required: true };
const validateMessages = {
  required: "${label} is required!",
};

function Login({ setAccountData }) {
  const [form] = Form.useForm();

  const [user, setUser] = useState();

  const [totpQRStr, setToTpQRStr] = useState();
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  function onOtpFormSubmit({ otp }) {
    setLoading(true);
    if (totpQRStr) {
      Auth.verifyTotpToken(user, otp)
        .then((response) => {
          Auth.setPreferredMFA(user, "TOTP");
          setAccountData(user);
        })
        .catch((err) => {
          setLoading(false);
          message.error(err.message);
        });
    } else {
      Auth.confirmSignIn(user, otp, "SOFTWARE_TOKEN_MFA")
        .then((response) => {
          setAccountData(user);
        })
        .catch((err) => {
          setLoading(false);
          message.error(err.message);
        });
    }
  }

  function onFormSubmit(values) {
    setLoading(true);
    Auth.signIn(values)
      .then((response) => {
        setUser(response);
        if (response.challengeName === "SOFTWARE_TOKEN_MFA") {
          setLoading(false);
          setShowVerification(true);
        } else {
          Auth.setupTOTP(response)
            .then((code) => {
              const str = `otpauth://totp/AWSCognito:${values.username}?secret=${code}&issuer=passbird`;
              setLoading(false);
              setToTpQRStr(str);
              setShowVerification(true);
            })
            .catch((err) => {
              setLoading(false);
              message.error(err.message);
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.message);
      });
  }

  return (
    <AuthContainer title="Login">
      <Choose>
        <When condition={showVerification}>
          <If condition={totpQRStr}>
            <QRCode value={totpQRStr} />
          </If>
          <Form
            form={form}
            layout="vertical"
            validateMessages={validateMessages}
            onFinish={(values) => onOtpFormSubmit(values)}
          >
            <Form.Item label="OTP" name="otp" rules={[requiredRule]}>
              <Input type="text" placeholder="Enter OTP" size="large" />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Submit
            </Button>
          </Form>
        </When>
        <Otherwise>
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
                    Signin
                  </Button>
                </Col>
                <Col>
                  <Link to={SIGNUP_ROUTE}>Create new account</Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Otherwise>
      </Choose>
    </AuthContainer>
  );
}

export default Account(Login);
