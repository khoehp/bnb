import React from "react";
import { Space, Table } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserAction } from "../action";


function User() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.admin.user);
  const fetch = async () => {
    await dispatch(fetchUserAction);
    console.log("aaa");
}
  useEffect(() => {
    fetch();
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      key: "birthday",
      dataIndex: "birthday",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     id: "1",

  //     name: "John Brown",
  //     age: 32,
  //     email: "New York No. 1 Lake Park",
  //     tags: "developer",
  //   },
  //   {
  //     id: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     email: "London No. 1 Lake Park",
  //     tags: "developer",
  //   },
  //   {
  //     id: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     email: "Sidney No. 1 Lake Park",
  //     tags: "developer",
  //   },
  // ];
  const data = (arr) => {
    let users = [];
    arr.forEach((user, index, array) => {
      users.push({ ...user, key: index });
    });
    return users;
  };

  return <Table columns={columns} dataSource={data(userInfo)} />;
}

export default User;
