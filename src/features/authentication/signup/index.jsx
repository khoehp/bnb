import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import instance from "../../../api/instance";
import { Button, Input } from "antd";

const schema = yup.object({
  name: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .matches(/^[A-Za-z ]+$/, "*Họ tên không đúng định dạng"),
  password: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .min(8, "*Mật khẩu phải từ 8 tới 16 kí tự"),

  email: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .email("*Email không đúng định dang"),
});

function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    onSubmit: (values) => {
      const newUser = { ...values };
      signup(newUser);
    },
    validationSchema: schema,
  });

  const signup = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/auth/signup",
        method: "POST",
        data: user,
      });
      history.push("/signin");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <h1 className={styles.title}>Sign up</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Họ tên"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.name && formik.errors.name && (
          <p className={styles.errText}> {formik.errors.name}</p>
        )}
        <Input
          name="email"
          type="text"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={styles.errText}> {formik.errors.email}</p>
        )}
        <Input
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={styles.errText}> {formik.errors.password}</p>
        )}
        <Input
          name="phone"
          type="text"
          placeholder="Nhập số điện thoại"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className={styles.errText}> {formik.errors.phone}</p>
        )}
        <Input
          name="birthday"
          type="text"
          placeholder="Ngày tháng năm sinh"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.birthday && formik.errors.birthday && (
          <p className={styles.errText}> {formik.errors.birthday}</p>
        )}
        <input
          name="gender"
          type="checkbox"
         
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        
        {formik.touched.gender && formik.errors.gender && (
          <p className={styles.errText}>{formik.errors.gender}</p>
        )}
        <Input
          name="role"
          type="text"
          placeholder="thành viên"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {formik.touched.role && formik.errors.role && (
          <p className={styles.errText}> {formik.errors.role}</p>
        )}
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signup;
