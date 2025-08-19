import { router } from '../init';
import { treeEntitiesRouter } from './tree-api-service';

export const appRouter = router({
  treeEntities: treeEntitiesRouter,
});

export type AppRouter = typeof appRouter;
