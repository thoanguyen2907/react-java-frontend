import React from "react";
import {deleteStudent, useStudents} from "../hook/useStudent";
import "antd/dist/antd.css";
import {Button, Popconfirm, Radio, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default function TableData(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, index) => <a key={index}>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, index) => <a key={index}>{text}</a>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text, index) => <a key={index}>{text}</a>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, student) => (
        <Radio.Group>
          <Popconfirm
            placement="topRight"
            title={`Are you sure to delete ${student.name}`}
            onConfirm={() => deleteStudent(student.id)}
            okText="Yes"
            cancelText="No"
          >
            <Radio.Button value="small">Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button
            value="small"
            onClick={() => {
              props.setShowDrawerEdit(!props.showDrawerEdit);
              props.setStudentData(student);
            }}
          >
            Edit
          </Radio.Button>
        </Radio.Group>
      ),
    },
  ];
  const data = useStudents();
  if (!data || !data.length)
    return (
      <div>
        {" "}
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => props.setShowDrawer(!props.showDrawer)}
        >
          Add New Student
        </Button>
        <p>No data</p>
      </div>
    );
  return (
    <Table
      columns={columns}
      dataSource={data}
      title={() => (
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => props.setShowDrawer(!props.showDrawer)}
        >
          Add New Student
        </Button>
      )}
      rowKey="id"
    />
  );
}
