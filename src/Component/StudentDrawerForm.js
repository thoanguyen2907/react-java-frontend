import {Drawer, Input, Col, Select, Form, Row, Button, Upload} from "antd";
import {addNewStudent} from "../hook/useStudent";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import axios from "axios";

const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer}) {
  const onCLose = () => setShowDrawer(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const onFinish = async (student) => {
    let updateStudent = {...student, image: "photo.png"};
    console.log("updateStudent", updateStudent);
    await addNewStudent(student)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = async (info) => {
    const file = info.fileList[0].originFileObj;
    const formData = new FormData();
    console.log(info);
    formData.append("file", file);
    getBase64(info.file.originFileObj, async (url) => {
      setImageUrl(url);
    });
    try {
      await axios
        .post("api/v1/students/upload-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
    // if (info.file.status === "uploading") {
    //   console.log(info.file.status);
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   getBase64(info.file.originFileObj, async (url) => {
    //     const formData = new FormData();
    //     formData.append("image", info.file.originFileObj);
    //     console.log(info.file.originFileObj);
    //     setImageUrl(url);
    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       };
    //       const {data} = await axios.post(
    //         "api/v1/students/upload-file",
    //         formData,
    //         config
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // }
  };
  return (
    <Drawer
      title="Create new student"
      width={720}
      onClose={onCLose}
      visible={showDrawer}
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
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{required: true, message: "Please enter student name"}]}
            >
              <Input placeholder="Please enter student name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{required: true, message: "Please enter student email"}]}
            >
              <Input placeholder="Please enter student email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
          </Col>
          <Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default StudentDrawerForm;
