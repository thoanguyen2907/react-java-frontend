import React from "react";
import {useStudents} from "../hook/useStudent";
import "antd/dist/antd.css";
import {Space, Table, Tag} from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, index) => <a key={index}>{text}</a>,
  },
  {
    title: "Email>",
    dataIndex: "email",
    key: "email",
    render: (text, index) => <a key={index}>{text}</a>,
  },
  {
    title: "Gender>",
    dataIndex: "gender",
    key: "gender",
    render: (text, index) => <a key={index}>{text}</a>,
  },
];
export default function TableData() {
  const data = useStudents();
  console.log(data);
  if (!data || !data.length) return <p>No data</p>;
  return <Table columns={columns} dataSource={data} />;
}
