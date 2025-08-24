import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@zohan/ui/button';
import { Input } from '@zohan/ui/input';
import { Label } from '@zohan/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@zohan/ui/card';
import { Alert, AlertDescription } from '@zohan/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@zohan/ui/tabs';
import { Badge } from '@zohan/ui/badge';
import { Separator } from '@zohan/ui/separator';
import { AlertCircle, Database, TreePine, Loader2, CheckCircle } from 'lucide-react';
import { trpc } from '../trpc/client';

interface ApiResponse {
  data?: any;
  error?: string;
  status: number;
}

type RouteType = 'treeOfValues' | 'tableEntities';

export const ApiTester = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteType>('treeOfValues');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Tree of Values parameters
  const [treeParams, setTreeParams] = useState({
    table_id: '',
    field_id: ''
  });

  // Table Entities parameters
  const [tableParams, setTableParams] = useState({
    table_id: '',
    from: '1',
    to: '100',
    sort_by: 'CreationTime',
    filter: ''
  });

  // tRPC queries
  const treeOfValuesQuery = useQuery({
    ...trpc.treeEntities.getTreeOfValues.queryOptions({ 
      table_id: treeParams.table_id, 
      field_id: treeParams.field_id 
    }),
    enabled: false
  });

  const tableEntitiesQuery = useQuery({
    ...trpc.treeEntities.getTableEntities.queryOptions({
      table_id: tableParams.table_id,
      from: parseInt(tableParams.from),
      to: parseInt(tableParams.to),
      sort_by: tableParams.sort_by,
      filter: tableParams.filter || undefined
    }),
    enabled: false
  });

  const isLoading = treeOfValuesQuery.isFetching || tableEntitiesQuery.isFetching;

  const handleTreeOfValuesSubmit = () => {
    if (!treeParams.table_id || !treeParams.field_id) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    setResponse(null);
    treeOfValuesQuery.refetch();
  };

  const handleTableEntitiesSubmit = () => {
    if (!tableParams.table_id) {
      setError('Please fill in the table_id field');
      return;
    }

    setError(null);
    setResponse(null);
    tableEntitiesQuery.refetch();
  };

  const handleSubmit = () => {
    if (selectedRoute === 'treeOfValues') {
      handleTreeOfValuesSubmit();
    } else {
      handleTableEntitiesSubmit();
    }
  };

  // Handle query results with useEffect
  useEffect(() => {
    if (treeOfValuesQuery.data && selectedRoute === 'treeOfValues') {
      setResponse({
        data: treeOfValuesQuery.data,
        status: 200
      });
    }
  }, [treeOfValuesQuery.data, selectedRoute]);

  useEffect(() => {
    if (tableEntitiesQuery.data && selectedRoute === 'tableEntities') {
      setResponse({
        data: { entities_list: tableEntitiesQuery.data },
        status: 200
      });
    }
  }, [tableEntitiesQuery.data, selectedRoute]);

  useEffect(() => {
    if (treeOfValuesQuery.error) {
      setError(`Failed to fetch data: ${treeOfValuesQuery.error.message}`);
    }
  }, [treeOfValuesQuery.error]);

  useEffect(() => {
    if (tableEntitiesQuery.error) {
      setError(`Failed to fetch data: ${tableEntitiesQuery.error.message}`);
    }
  }, [tableEntitiesQuery.error]);

  const handleRouteChange = (value: string) => {
    setSelectedRoute(value as RouteType);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Tester</h1>
        <p className="text-muted-foreground">
          Test the mock API endpoints with different parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>API Response</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Fetching data...</span>
                </div>
              )}

              {response && !isLoading && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={response.status === 200 ? "default" : "destructive"}>
                      Status: {response.status}
                    </Badge>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-auto max-h-96" dir="ltr">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!response && !isLoading && !error && (
                <div className="text-center py-8 text-muted-foreground">
                  Select a route and click "Test API" to see the response
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                API Route Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedRoute} onValueChange={handleRouteChange}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="treeOfValues" className="flex items-center gap-2">
                    <TreePine className="h-4 w-4" />
                    Tree of Values
                  </TabsTrigger>
                  <TabsTrigger value="tableEntities" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Table Entities
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="treeOfValues" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="tree-table-id">Table ID *</Label>
                    <Input
                      id="tree-table-id"
                      value={treeParams.table_id}
                      onChange={(e) => setTreeParams(prev => ({ ...prev, table_id: e.target.value }))}
                      placeholder="Enter table ID..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tree-field-id">Field ID *</Label>
                    <Input
                      id="tree-field-id"
                      value={treeParams.field_id}
                      onChange={(e) => setTreeParams(prev => ({ ...prev, field_id: e.target.value }))}
                      placeholder="Enter field ID..."
                      className="mt-1"
                    />
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs">
                      Route: GET /v2.0/Tree/TreeOfValues/{treeParams.table_id || '{table_id}'}/{treeParams.field_id || '{field_id}'}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="tableEntities" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="table-table-id">Table ID *</Label>
                    <Input
                      id="table-table-id"
                      value={tableParams.table_id}
                      onChange={(e) => setTableParams(prev => ({ ...prev, table_id: e.target.value }))}
                      placeholder="Enter table ID..."
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="table-from">From</Label>
                      <Input
                        id="table-from"
                        type="number"
                        value={tableParams.from}
                        onChange={(e) => setTableParams(prev => ({ ...prev, from: e.target.value }))}
                        placeholder="1"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="table-to">To</Label>
                      <Input
                        id="table-to"
                        type="number"
                        value={tableParams.to}
                        onChange={(e) => setTableParams(prev => ({ ...prev, to: e.target.value }))}
                        placeholder="100"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="table-sort-by">Sort By</Label>
                    <Input
                      id="table-sort-by"
                      value={tableParams.sort_by}
                      onChange={(e) => setTableParams(prev => ({ ...prev, sort_by: e.target.value }))}
                      placeholder="CreationTime"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="table-filter">New Param</Label>
                    <Input
                      id="table-filter"
                      value={tableParams.filter}
                      onChange={(e) => setTableParams(prev => ({ ...prev, filter: e.target.value }))}
                      placeholder="Enter new parameter value..."
                      className="mt-1"
                    />
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs">
                      Route: POST /v3.0/Tree/{tableParams.table_id || '{table_id}'}/TableEntities
                    </Badge>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator className="my-4" />

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Test API
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
