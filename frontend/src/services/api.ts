import axios from 'axios';
import type { ApiResponse, PaginatedResponse } from '@/types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      const auth = JSON.parse(token);
      if (auth.state?.token) {
        config.headers.Authorization = `Bearer ${auth.state.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 清除认证信息
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API 方法
export const caseApi = {
  // 获取案例列表
  getList: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
    sortBy?: 'latest' | 'popular' | 'most_downloaded';
  }) =>
    api.get<ApiResponse<PaginatedResponse>>('/cases', { params }),

  // 获取精选案例
  getFeatured: () =>
    api.get<ApiResponse<SkillCase[]>>('/cases/featured'),

  // 获取案例详情
  getDetail: (id: string) =>
    api.get<ApiResponse<SkillCase>>(`/cases/${id}`),

  // 上传案例
  create: (data: FormData) =>
    api.post<ApiResponse<SkillCase>>('/cases', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // 下载案例
  download: (id: string) => api.get(`/cases/${id}/download`, { responseType: 'blob' }),

  // 点赞
  like: (id: string) => api.post<ApiResponse>(`/cases/${id}/like`),

  // 取消点赞
  unlike: (id: string) => api.delete<ApiResponse>(`/cases/${id}/like`),

  // 收藏
  favorite: (id: string) => api.post<ApiResponse>(`/cases/${id}/favorite`),

  // 取消收藏
  unfavorite: (id: string) => api.delete<ApiResponse>(`/cases/${id}/favorite`),

  // 获取评论
  getComments: (id: string, page = 1) =>
    api.get<ApiResponse<PaginatedResponse>>(`/cases/${id}/comments`, {
      params: { page },
    }),

  // 添加评论
  addComment: (id: string, content: string, parentId?: string) =>
    api.post<ApiResponse>(`/cases/${id}/comments`, { content, parentId }),
};

export const categoryApi = {
  // 获取分类列表
  getList: () => api.get<ApiResponse<CategoryTag[]>>('/categories'),
};

export const userApi = {
  // 登录
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      email,
      password,
    }),

  // 注册
  register: (data: {
    email: string;
    password: string;
    nickname: string;
  }) => api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data),

  // 获取当前用户信息
  getProfile: () => api.get<ApiResponse<User>>('/auth/profile'),

  // 登出
  logout: () => api.post<ApiResponse>('/auth/logout'),
};

export const dashboardApi = {
  // 获取统计数据
  getStats: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),

  // 获取分类统计
  getCategoryStats: () =>
    api.get<ApiResponse<CategoryStats[]>>('/dashboard/category-stats'),

  // 获取待审核列表
  getPendingReviews: () =>
    api.get<ApiResponse<SkillCase[]>>('/dashboard/pending-reviews'),
};

// 导入类型
import type { SkillCase, CategoryTag, User, DashboardStats, CategoryStats } from '@/types';
