import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import styles from "./style.module.css";
import { useState } from "react";
import instance from "../../../api/instance";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { SET_PROFILE } from "../action";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required("*Trường này bắt buộc nhập"),
  password: yup.string().required("*Trường này bắt buộc nhập"),
});
function Signin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const Signin = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/auth/signin",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.token);
      localStorage.setItem("id", res.data.content.user.id)
      dispatch({ type:SET_PROFILE, payload: profile.user });
      history.push("/");
      console.log(res.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      Signin(values);
    },
    validationSchema: schema,
  });

  return (
    <div className="bg-gray-200">
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        {formik.touched.email && formik.errors.email && (
          <p className={styles.errText}>{formik.errors.email}</p>
        )}
        <Input
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className={styles.errText}>{formik.errors.password}</p>
        )}
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </form>

      {/* <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="text-sm font-bold text-gray-700 tracking-wide">
            Username
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className={styles.errorText}>{formik.errors.email}</p>
          )}
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </div>
            <div>
              <a
                className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
              >
                Quên mật khẩu ?
              </a>
            </div>
          </div>
          <Input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className={styles.errorText}>{formik.errors.password}</p>
          )}
        </div>
        <div className="mt-10">
          <Button
            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Log In
          </Button>
        </div>
      </form> */}
    </div>
  );
}

export default Signin;
