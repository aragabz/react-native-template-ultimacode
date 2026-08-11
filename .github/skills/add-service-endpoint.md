# Skill: Add a New API Endpoint & Query Hook

## Steps

1. **Add endpoint URL**

   In `src/constants/config.ts`:

   ```ts
   ENDPOINTS: {
     // ...
     MY_DATA: '/my-data',
   }
   ```

2. **Add Zod schema**

   In `src/services/schemas.ts`:

   ```ts
   export const myDataSchema = z.object({
     id: z.string(),
     name: z.string(),
   });

   export type MyData = z.infer<typeof myDataSchema>;

   export const myDataArraySchema = z.array(myDataSchema);
   ```

3. **Create endpoint function**

   `src/services/endpoints/myData.ts`:

   ```ts
   import { apiClient } from '../apiClient';
   import { ENDPOINTS } from '@constants';
   import { myDataArraySchema } from '../schemas';
   import type { MyData } from '../schemas';

   export const getMyData = async (): Promise<MyData[]> => {
     const res = await apiClient.get(ENDPOINTS.MY_DATA);
     return myDataArraySchema.parse(res.data);
   };
   ```

4. **Create query hook**

   `src/services/hooks/useMyData.ts`:

   ```ts
   import { useQuery } from '@tanstack/react-query';
   import { getMyData } from '@api/endpoints/myData';

   export const useMyData = () => {
     return useQuery({
       queryKey: ['my-data'],
       queryFn: getMyData,
     });
   };
   ```

5. **Export from barrel files**

   - `src/services/endpoints/index.ts`
   - `src/services/hooks/index.ts` (or `src/services/index.ts`)
