import ajax from '../utils/axiosUtil';

// 创建日记
export const createDiaryApi = (data: any) => {
  return ajax.post('/api/v2/posts', data);
};

// 查询日记
export const getDiariesListApi = (data: any) => {
  return ajax.get('/api/v2/users/me/posts', {
    params: data,
  });
};

// 获取日记详情
export const getDiaryDetailApi = (id: string) => {
  return ajax.get(`/api/v2/posts/${id}`);
};