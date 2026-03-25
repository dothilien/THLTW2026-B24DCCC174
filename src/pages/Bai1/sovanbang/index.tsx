import { Button, Form, Input, Table } from 'antd';
import { useState } from 'react';

export default () => {
  const [data, setData] = useState<any[]>([]);

  const onFinish = (values: any) => {
    setData([...data, { ...values, currentNumber: 1 }]);
  };

  return (
    <div>
      <h2>Sổ văn bằng</h2>

      <Form onFinish={onFinish}>
        <Form.Item name="year" label="Năm" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form>

      <Table dataSource={data} columns={[
        { title: 'Năm', dataIndex: 'year' },
        { title: 'Số hiện tại', dataIndex: 'currentNumber' }
      ]} />
    </div>
  );
};