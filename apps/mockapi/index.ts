const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

console.log('Mock API server started - using dynamic data generation');

// Generate dynamic mock data based on input parameters
function generateMockTreeOfValues(tableId: string, fieldId: string) {
  return {
    exclusiveId: {
      dataStore: `datastore-tree`,
      tableId: tableId
    },
    type: `tree-type-${tableId}`,
    name: `Tree of Values for Table ${tableId}`,
    displayName: `Tree Display for ${tableId} - ${fieldId}`,
    treeOfValues: [
      {
        name: `Root Node - ${tableId}`,
        children: [
          ...Array.from({ length: 10 }, (_, i) => {
            const idx = i + 1;
            return {
              name: `Category ${String.fromCharCode(64 + idx)} - ${tableId}`,
              children: [
                ...Array.from({length: 10}, (_ ,j) => {
                  return { name: `Subcategory ${String.fromCharCode(64 + idx)}.${j + 1} - ${fieldId}` };
                }),
              ]
            };
          })
        ]
      }
    ]
  };
}

function generateMockTableEntities(tableId: string, from: number = 1, to: number = 10, sortBy: string = 'CreationTime', filter?: string) {
  const entities: any[] = [];
  const totalEntities = 10;
  
  // Generate all entities first
  for (let i = from; i <= Math.min(to, totalEntities); i++) {
    const entityName = `Entity ${i} from Table ${tableId}`;
    
    entities.push({
      exclusiveId: {
        dataStore: `datastore-${tableId}`,
        tableId: tableId
      },
      link: `https://mock-link.com/${tableId}/entity/${i}`,
      geo: {
        wkt: `POINT(34.${7800 + i} 32.${800 + i})`,
        geoJson: {
          type: "Point",
          coordinates: `34.${7800 + i},32.${800 + i}`,
          geometries: []
        }
      },
      classification: {
        triangle: `triangle-${tableId}-${i}`,
        clearance_level: i,
        publish_procedure: `procedure-${tableId}-${i}`
      },
      date: `2024-01-${String(i).padStart(2, '0')}T10:30:00Z`,
      properties: {
        name: entityName,
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy
      }
    });
  }

  // Apply filter if specified
  const filteredEntities = filter 
    ? entities.filter(entity => entity.properties.name === filter)
    : entities;

  return {
    entities_list: filteredEntities
  };
}

function generateMockAllTableEntities(tableId: string, pageSize: number = 100, sortBy: string = 'CreationTime', filter?: string) {
  const allEntities: any[] = [];
  const totalEntities = 150;
  
  // Generate all entities first
  for (let i = 1; i <= totalEntities; i++) {
    const entityName = `Entity ${i} from Table ${tableId}`;
    
    allEntities.push({
      exclusiveId: {
        dataStore: `datastore-${tableId}`,
        tableId: tableId
      },
      link: `https://mock-link.com/${tableId}/entity/${i}`,
      geo: {
        wkt: `POINT(34.${7800 + i} 32.${800 + i})`,
        geoJson: {
          type: "Point",
          coordinates: `34.${7800 + i},32.${800 + i}`,
          geometries: []
        }
      },
      classification: {
        triangle: `triangle-${tableId}-${i}`,
        clearance_level: i,
        publish_procedure: `procedure-${tableId}-${i}`
      },
      date: `2024-01-${String(i).padStart(2, '0')}T10:30:00Z`,
      properties: {
        name: entityName,
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy
      }
    });
  }

  // Apply filter if specified
  const filteredEntities = filter 
    ? allEntities.filter(entity => entity.properties.name === filter)
    : allEntities;

  return filteredEntities;
}

// REST API endpoints (for Chrome testing)
app.get('/v2.0/Tree/TreeOfValues/:table_id/:field_id', (req: any, res: any) => {
  const { table_id, field_id } = req.params;
  console.log(`Mock API: GET /v2.0/Tree/TreeOfValues/${table_id}/${field_id}`);
  
  const mockData = generateMockTreeOfValues(table_id, field_id);
  res.json(mockData);
});

app.get('/v2.0/Tree/TableEntities/:table_id', (req: any, res: any) => {
  const { table_id } = req.params;
  const { from, to, sort_by, filter } = req.query;
  console.log(`Mock API: GET /v2.0/Tree/TableEntities/${table_id}`, { from, to, sort_by, filter });
  
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 10, 
    sort_by || 'CreationTime',
    filter
  );
  res.json(mockData);
});

app.get('/v2.0/Tree/AllTableEntities/:table_id', (req: any, res: any) => {
  const { table_id } = req.params;
  const { pageSize, sort_by, filter } = req.query;
  console.log(`Mock API: GET /v2.0/Tree/AllTableEntities/${table_id}`, { pageSize, sort_by, filter });
  
  const mockData = generateMockAllTableEntities(table_id, pageSize, sort_by, filter);
  res.json(mockData);
});

app.get('/v3.0/Tree/:table_id/TableEntities', (req: any, res: any) => {
  const { table_id } = req.params;
  const { from, to, sort_by, filter } = req.query;
  console.log(`Mock API: GET /v3.0/Tree/${table_id}/TableEntities`, { from, to, sort_by, filter });
  
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 100, 
    sort_by || 'CreationTime',
    filter
  );
  res.json(mockData);
});

// v3.0 endpoint for TableEntities (POST - new implementation)
app.post('/v3.0/Tree/:table_id/TableEntities', (req: any, res: any) => {
  const { table_id } = req.params;
  const { from, to, sort_by } = req.query;
  const { filter} = req.body || {};
  console.log(`Mock API: POST /v3.0/Tree/${table_id}/TableEntities`, { from, to, sort_by, filter});
  
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 100, 
    sort_by || 'CreationTime',
    filter
  );
  res.json(mockData);
});

// Handle tRPC requests with dynamic data generation
app.post('/trpc/treeEntities.getTreeOfValues', (req: any, res: any) => {
  const { table_id, field_id } = req.body || {};
  console.log(`Mock API: POST /trpc/treeEntities.getTreeOfValues`, { table_id, field_id });
  
  if (!table_id || !field_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id and field_id are required'
    });
  }
  
  const mockData = generateMockTreeOfValues(table_id, field_id);
  res.json({ result: { data: mockData } });
});

app.post('/trpc/treeEntities.getTableEntities', (req: any, res: any) => {
  const { table_id, from, to, sort_by, filter } = req.body || {};
  console.log(`Mock API: POST /trpc/treeEntities.getTableEntities`, { table_id, from, to, sort_by, filter });
  
  if (!table_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id is required'
    });
  }
  
  const mockData = generateMockTableEntities(table_id, from, to, sort_by, filter);
  res.json({ result: { data: mockData } });
});

app.post('/trpc/treeEntities.getAllTableEntities', (req: any, res: any) => {
  const { table_id, pageSize, sort_by, filter } = req.body || {};
  console.log(`Mock API: POST /trpc/treeEntities.getAllTableEntities`, { table_id, pageSize, sort_by, filter });
  
  if (!table_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id is required'
    });
  }
  
  const mockData = generateMockAllTableEntities(table_id, pageSize, sort_by, filter);
  res.json({ result: { data: mockData } });
});

// Note: All endpoints now use dynamic data generation with filtering support

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok', message: 'Mock API server is running' });
});

// 404 handler for unmatched routes
app.use('*', (req: any, res: any) => {
  console.log(`Mock API: 404 - ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Not found',
    message: `No mock data found for ${req.method} ${req.originalUrl}`,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on port ${PORT}`);
  console.log('Available mock endpoints:');
  console.log('  - GET /v2.0/Tree/TreeOfValues/{table_id}/{field_id} (REST API)');
  console.log('  - GET /v2.0/Tree/TableEntities/{table_id}?from=1&to=10&sort_by=CreationTime&filter=filter_value (REST API)');
  console.log('  - GET /v2.0/Tree/AllTableEntities/{table_id}?pageSize=100&sort_by=CreationTime&nefilter=filter_value (REST API)');
  console.log('  - GET /v3.0/Tree/{table_id}/TableEntities?from=1&to=100&sort_by=CreationTime&filter=filter_value (REST API)');
  console.log('  - POST /v3.0/Tree/{table_id}/TableEntities (REST API)');
  console.log('  - POST /trpc/treeEntities.getTreeOfValues (tRPC)');
  console.log('  - POST /trpc/treeEntities.getTableEntities (tRPC) - supports filter filtering');
  console.log('  - POST /trpc/treeEntities.getAllTableEntities (tRPC) - supports filter ram filtering');

  console.log('  - GET /health');
  console.log('');
  console.log('Filtering: Use filter to filter entities where properties.name equals the specified value');
});
