import { lazy } from "react";

const MyDiary = lazy(() => import("../views/Diary/MyDiary"));
const CreateDiary = lazy(() => import("../views/Diary/CreateDiary"));
const DiaryDetail = lazy(() => import("../views/Diary/DiaryDetail"));

export default [
  {
    path: "/",
    component: MyDiary,
    exact: true,
    title: "我的日记",
  },
  {
    path: "/CreateDiary",
    component: CreateDiary,
    exact: true,
    title: "新建日记",
  },
  {
    path: "/DiaryDetail",
    component: DiaryDetail,
    exact: true,
    title: "日记详情",
  },
];
