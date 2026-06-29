import { apiClient } from '../apiClient';
import { postSchema, postsSchema } from '../schemas';
import type { Post } from '../schemas';

export type { Post };

export const getPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get('/posts');
  return postsSchema.parse(res.data);
};

export const getPostById = (id: number): Promise<Post> => {
  return apiClient.get(`/posts/${id}`).then((res) => postSchema.parse(res.data));
};
