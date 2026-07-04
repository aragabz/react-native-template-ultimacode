import { apiClient } from '../apiClient';
import { postSchema, postsSchema } from '../schemas';
import type { Post } from '../schemas';
import { ENDPOINTS } from '@constants/config';

export type { Post };

type DummyJsonPostsResponse = {
  posts: unknown[];
};

const parsePostsResponse = (data: unknown): Post[] => {
  if (Array.isArray(data)) {
    return postsSchema.parse(data);
  }

  if (typeof data === 'object' && data !== null && 'posts' in data) {
    return postsSchema.parse((data as DummyJsonPostsResponse).posts);
  }

  throw new Error('Invalid posts response shape');
};

export const getPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get(ENDPOINTS.POSTS);
  return parsePostsResponse(res.data);
};

export const getPostById = async (id: number): Promise<Post> => {
  const res = await apiClient.get(`${ENDPOINTS.POSTS}/${id}`);
  return postSchema.parse(res.data);
};
