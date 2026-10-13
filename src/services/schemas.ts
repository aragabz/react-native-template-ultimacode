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

export const refreshTokensResponseSchema = z.object({
  token: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type RefreshTokensResponse = z.infer<typeof refreshTokensResponseSchema>;

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export const postsSchema = z.array(postSchema);
