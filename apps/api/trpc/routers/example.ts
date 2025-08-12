import { publicProcedure, router } from '../init';

export const exampleRouter = router({
  example: publicProcedure.query(() => {
    return 'Hello, world!';
  }),
});
