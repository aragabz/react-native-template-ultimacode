import { apiClient } from '../apiClient';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get('/posts');
  return res.data;
};

export const getPostById = (id: number): Promise<Post> => {
  return apiClient.get(`/posts/${id}`).then((res) => res.data);
};
