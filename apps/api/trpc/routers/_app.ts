import { router } from '../init';
import { coordConvertorRouter } from './coord-converter.router';
import { treeEntitiesRouter } from './tree-api-service';

export const appRouter = router({
  treeEntities: treeEntitiesRouter,
  coordConverter: coordConvertorRouter
});

export type AppRouter = typeof appRouter;
