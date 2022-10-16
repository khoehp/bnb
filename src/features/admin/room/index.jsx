import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Mã phòng",
    dataIndex: "maphong",
    key: "maphong",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên phòng",
    dataIndex: "tenphong",
    key: "tenphong",
  },
  {
    title: "Hình ảnh",
    dataIndex: "hinhanh",
    key: "hinhanh",
  },
  {
    title: "Vị trí",
    key: "vitri",
    dataIndex: "vitri",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    maphong: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    maphong: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    maphong: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
function Room() {
  return <Table columns={columns} dataSource={data} />;
}

export default Room;
