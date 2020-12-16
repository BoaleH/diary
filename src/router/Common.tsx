import { lazy } from "react";

const Login = lazy(() => import("../views/Common/Login"));
const Register = lazy(() => import("../views/Common/Register"));

export default [
  {
    path: "/Login",
    component: Login,
    exact: true,
    title: "登录",
  },
  {
    path: "/Register",
    component: Register,
    exact: true,
    title: "注册",
  },
];
