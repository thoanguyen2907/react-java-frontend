import {Drawer, Input, Col, Select, Form, Row, Button, Checkbox} from "antd";
import {addNewStudent, updateStudent} from "../hook/useStudent";

const {Option} = Select;

function StudentDrawerFormEdit({
  showDrawerEdit,
  setShowDrawerEdit,
  studentData,
}) {
  const onCLose = () => setShowDrawerEdit(false);

  const onFinish = async (values) => {
    let studentInfoUpdate = {...values, id: studentData.id};
    await updateStudent(studentInfoUpdate)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      title="Create new student"
      width={720}
      onClose={onCLose}
      visible={showDrawerEdit}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCLose} style={{marginRight: 8}}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          name: studentData?.name,
          email: studentData?.email,
          gender: studentData?.gender,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="gender"
          rules={[{required: true, message: "Please select a gender"}]}
        >
          <Select placeholder="Please select a gender">
            <Option value="MALE">MALE</Option>
            <Option value="FEMALE">FEMALE</Option>
            <Option value="OTHER">OTHER</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default StudentDrawerFormEdit;
