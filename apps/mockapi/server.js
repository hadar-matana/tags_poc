const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

console.log('Mock API server started - using dynamic data generation');

// Generate dynamic mock data based on input parameters
function generateMockTreeOfValues(tableId, fieldId) {
  return {
    exclusiveId: {
      dataStore: `datastore-${tableId}`,
      tableId: tableId,
      entityId: `entity-${fieldId}`,
      valueListId: `value-list-${tableId}-${fieldId}`,
      treeOfValuestId: `tree-${tableId}-${fieldId}`,
      sequence: 1
    },
    type: `tree-type-${tableId}`,
    name: `Tree of Values for Table ${tableId}`,
    displayName: `Tree Display for ${tableId} - ${fieldId}`,
    treeOfValues: [
      {
        name: `Root Node - ${tableId}`,
        children: [
          {
            name: `Category A - ${fieldId}`,
            children: [
              { name: `Subcategory A1 - ${tableId}` },
              { name: `Subcategory A2 - ${fieldId}` }
            ]
          },
          {
            name: `Category B - ${tableId}`,
            children: [
              { name: `Subcategory B1 - ${fieldId}` }
            ]
          },
          {
            name: `Category C - ${tableId}`,
            children: [
              { name: `Subcategory C1 - ${fieldId}` },
              { name: `Subcategory C2 - ${tableId}` },
              { name: `Subcategory C3 - ${fieldId}` }
            ]
          }
        ]
      }
    ]
  };
}

function generateMockTableEntities(tableId, from = 1, to = 10, sortBy = 'CreationTime') {
  const entities = [];
  const totalEntities = 150;
  
  for (let i = from; i <= Math.min(to, totalEntities); i++) {
    entities.push({
      exclusiveId: `exclusive-${tableId}-${i}`,
      tableId: tableId,
      entityId: `entity-${tableId}-${i}`,
      vlaueListId: `value-list-${tableId}-${i}`,
      treeOfValuestId: `tree-${tableId}-${i}`,
      sequence: i,
      link: `https://mock-link.com/${tableId}/entity/${i}`,
      geo: {
        wkt: `POINT(34.${7800 + i} 32.${800 + i})`,
        geoJson: {
          type: "Point",
          coordinates: `34.${7800 + i},32.${800 + i}`,
          geometries: [
            {
              type: "Polygon",
              coordinates: `34.${7800 + i},32.${800 + i},34.${7801 + i},32.${800 + i},34.${7801 + i},32.${801 + i},34.${7800 + i},32.${801 + i},34.${7800 + i},32.${800 + i}`,
              geometries: [
                {
                  type: "LineString",
                  coordinates: `34.${7800 + i},32.${800 + i},34.${7801 + i},32.${801 + i}`,
                  geometries: []
                }
              ]
            }
          ]
        }
      },
      classification: {
        triangleId: `triangle-${tableId}-${i}`,
        c1: i,
        publishProcedure: `procedure-${tableId}-${i}`
      },
      date: `2024-01-${String(i).padStart(2, '0')}T10:30:00Z`,
      properties: {
        name: `Entity ${i} from Table ${tableId}`,
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy,
        additionalProp1: `prop1-${tableId}-${i}`,
        additionalProp2: `prop2-${tableId}-${i}`,
        additionalProp3: `prop3-${tableId}-${i}`
      }
    });
  }

  return {
    total_entities: totalEntities,
    nextPage: to < totalEntities ? `page-${to + 1}` : null,
    entities_list: entities
  };
}

// REST API endpoints (exact routes as specified)
app.get('/v2.0/Tree/TreeOfValues/:table_id/:field_id', (req, res) => {
  const { table_id, field_id } = req.params;
  console.log(`Mock API: GET /v2.0/Tree/TreeOfValues/${table_id}/${field_id}`);
  
  const mockData = generateMockTreeOfValues(table_id, field_id);
  res.json(mockData);
});

app.get('/v3.0/Tree/:table_id/TableEntities', (req, res) => {
  const { table_id } = req.params;
  const { from, to, sort_by } = req.query;
  console.log(`Mock API: GET /v3.0/Tree/${table_id}/TableEntities`, { from, to, sort_by });
  
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 100, 
    sort_by || 'CreationTime'
  );
  res.json(mockData);
});

app.post('/v3.0/Tree/:table_id/TableEntities', (req, res) => {
  const { table_id } = req.params;
  const { from, to, sort_by } = req.query;
  const { filter } = req.body || {};
  
  console.log(`Mock API: POST /v3.0/Tree/${table_id}/TableEntities`);
  console.log('  Query params:', req.query);
  console.log('  Body:', req.body);
  console.log('  Extracted values:', { from, to, sort_by, filter });
  
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 100, 
    sort_by || 'CreationTime'
  );
  res.json(mockData);
});

// Handle tRPC requests with dynamic data generation
app.post('/trpc/treeEntities.getTreeOfValues', (req, res) => {
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

app.post('/trpc/treeEntities.getTableEntities', (req, res) => {
  const { table_id, from, to, sort_by } = req.body || {};
  console.log(`Mock API: POST /trpc/treeEntities.getTableEntities`, { table_id, from, to, sort_by });
  
  if (!table_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id is required'
    });
  }
  
  const mockData = generateMockTableEntities(table_id, from, to, sort_by);
  res.json({ result: { data: mockData } });
});

// Note: All endpoints now use dynamic data generation

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock API server is running' });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
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
  console.log('  - GET /v3.0/Tree/{table_id}/TableEntities?from=1&to=100&sort_by=CreationTime (REST API)');
  console.log('  - POST /v3.0/Tree/{table_id}/TableEntities (REST API)');
  console.log('  - POST /trpc/treeEntities.getTreeOfValues (tRPC)');
  console.log('  - POST /trpc/treeEntities.getTableEntities (tRPC)');

  console.log('  - GET /health');
});
