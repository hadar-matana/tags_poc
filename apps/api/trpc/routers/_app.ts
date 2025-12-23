import { router } from '../init';
import { clientConfigRouter } from './client-config.router';
import { coordConvertorRouter } from './coord-converter.router';
import { treeEntitiesRouter } from './tree-api-service';

export const appRouter = router({
  treeEntities: treeEntitiesRouter,
  coordConverter: coordConvertorRouter,
  clientConfig: clientConfigRouter
});

export type AppRouter = typeof appRouter;
