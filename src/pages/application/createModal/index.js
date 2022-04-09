import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Modal, message } from "antd";

import { createApplication } from "actions";

const requiredRule = { required: true };
const validateMessages = {
  required: "${label} is required!",
};

export default function CreateApplicationModal({ visible, onClose, onCreate }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  function onFormSubmit(values) {
    setLoading(true);
    createApplication(values)
      .then((response) => {
        onCreate();
        setLoading(false);
        message.success("Application created successfully");
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  return (
    <Modal
      footer={null}
      visible={visible}
      title="Create application"
      onCancel={() => onClose()}
    >
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={(values) => onFormSubmit(values)}
      >
        <Form.Item label="Name" name="name" rules={[requiredRule]}>
          <Input type="text" placeholder="Enter name" size="large" />
        </Form.Item>
        <Form.Item label="Chain" name="chain" rules={[requiredRule]}>
          <Select size="large">
            <Select.Option value="eth">Ethereum</Select.Option>
            <Select.Option value="sol">Solana</Select.Option>
            <Select.Option value="bnc">Binance</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
