const express = require('express');
const cors = require('cors');
const { generateMockTreeOfValues, generateMockTableEntities } = require('./tree-api-logic');
const { generateMockImageUrl } = require('./image-api-logic');

const app = express();

app.use(cors());
app.use(express.json());

console.log('Mock API server started - using dynamic data generation');

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

// Image Service endpoints
app.post('/api/image', (req, res) => {
  const { exclusiveId } = req.body;
  
  console.log(`Mock API: POST /api/image`);
  console.log('  Body:', req.body);
  console.log('  Extracted exclusiveId:', exclusiveId);
  
  if (!exclusiveId) {
    console.log('Mock API: Error - exclusiveId is required');
    return res.status(400).json({
      success: false,
      error: 'exclusiveId is required',
      thumbnail: '',
    });
  }

  // Simulate processing time for realistic behavior
  const processingDelay = 100 + Math.random() * 200; // 100-300ms
  
  setTimeout(() => {
    try {
      const imageUrl = generateMockImageUrl(exclusiveId);
      const { dataStore, tableId } = exclusiveId;
      
      console.log(`Mock API: Generated image for entity ${dataStore}/${tableId}: ${imageUrl}`);
      
      res.json({
        success: true,
        thumbnail: imageUrl,
        error: null,
      });
    } catch (error) {
      console.error('Mock API: Error generating image:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        thumbnail: '',
      });
    }
  }, processingDelay);
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
  console.log('  - POST /api/image (Image Service)');
  console.log('  - GET /health');
});
