import { createFileRoute } from '@tanstack/react-router';
import { EssencesList } from '@/components/essences-list';
import { TreeOfValuesContextProvider } from '@/store/tree-of-values-context';
import { EntitiesGrid } from '@/components/entities-grid';

function HomePage() {
  return (
    <TreeOfValuesContextProvider>
      <div className="flex w-full h-full gap-4 p-4">
        <EssencesList />
        <EntitiesGrid />
      </div>
    </TreeOfValuesContextProvider>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
