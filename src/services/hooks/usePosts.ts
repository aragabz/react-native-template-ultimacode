import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../endpoints/posts';
import type { Post } from '../endpoints/posts';

export type { Post };

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};
