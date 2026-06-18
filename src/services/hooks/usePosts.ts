import { useQuery } from '@tanstack/react-query';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * Custom hook for fetching and managing posts data from JSONPlaceholder API.
 * Uses TanStack Query for caching and state management.
 * 
 * @return {UseQueryResult<Post[], Error>} Query result containing posts data.
 */
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};
