import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string().min(1),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export const postsSchema = z.array(postSchema);
