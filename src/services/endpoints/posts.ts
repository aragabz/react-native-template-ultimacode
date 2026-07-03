import axios from 'axios';
import { postSchema, postsSchema } from '../schemas';
import type { Post } from '../schemas';

export type { Post };

const JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com';

export const getPosts = async (): Promise<Post[]> => {
  console.log('[getPosts] calling API:', `${JSON_PLACEHOLDER}/posts`);
  try {
    const res = await axios.get(`${JSON_PLACEHOLDER}/posts`);
    console.log('[getPosts] response status:', res.status);
    console.log('[getPosts] response data sample:', JSON.stringify(res.data?.slice?.(0, 2)));
    const parsed = postsSchema.parse(res.data);
    console.log('[getPosts] zod parse success, count:', parsed.length);
    return parsed;
  } catch (err: any) {
    console.log('[getPosts] error message:', err.message);
    console.log('[getPosts] error response:', JSON.stringify(err.response?.data));
    console.log('[getPosts] error status:', err.response?.status);
    throw err;
  }
};

export const getPostById = (id: number): Promise<Post> => {
  console.log('[getPostById] calling API:', `${JSON_PLACEHOLDER}/posts/${id}`);
  return axios
    .get(`${JSON_PLACEHOLDER}/posts/${id}`)
    .then((res) => {
      console.log('[getPostById] response status:', res.status);
      console.log('[getPostById] response data:', JSON.stringify(res.data));
      return postSchema.parse(res.data);
    })
    .catch((err: any) => {
      console.log('[getPostById] error:', err.message);
      throw err;
    });
};
