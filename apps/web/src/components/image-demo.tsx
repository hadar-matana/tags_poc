import { useState } from 'react';
import { trpc } from '../trpc/client';
import { EntityImage } from './entity-image';
import { Button } from '@zohan/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@zohan/ui/card';
import { Input } from '@zohan/ui/input';
import { Label } from '@zohan/ui/label';
import { Skeleton } from '@zohan/ui/skeleton';
import { Alert, AlertDescription } from '@zohan/ui/alert';
import { ImageIcon, Search, AlertCircle } from 'lucide-react';
import type { TableEntity } from '@zohan/api/types/tree-api-types';

export const ImageDemo = () => {
  const [tableId, setTableId] = useState('sample_table');
  const [filter, setFilter] = useState('');

  const {
    data: entities,
    isLoading,
    error,
    refetch,
  } = trpc.treeEntities.getTableEntities.useQuery(
    {
      table_id: tableId,
      filter: filter || '{}',
      from: 1,
      to: 5,
    },
    {
      enabled: !!tableId,
      retry: 2,
    }
  );

  const handleSearch = () => {
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Image Service Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load entities: {error.message}
              </AlertDescription>
            </Alert>
            <Button onClick={() => refetch()} className="mt-2">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Image Service Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="tableId">Table ID</Label>
              <Input
                id="tableId"
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter table ID"
              />
            </div>
            <div>
              <Label htmlFor="filter">Essence Filter</Label>
              <Input
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Enter essence value (e.g., "Category A - sample_table")'
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Loading...' : 'Search Entities'}
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {entities && entities.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entities.map((entity: TableEntity, index: number) => (
            <EntityImage key={`${entity.exclusiveId.tableId}-${index}`} entity={entity} />
          ))}
        </div>
      )}

      {entities && entities.length === 0 && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">No entities found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search parameters
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
