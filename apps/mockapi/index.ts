const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Generate dynamic mock data based on input parameters
function generateTreeEssences(tableId: string): string[] {
  return [
    `Root Node - ${tableId}`,
    `Category A - ${tableId}`,
    `Subcategory A.1 - ${tableId}`,
    `Subcategory A.2 - ${tableId}`,
    `Subcategory A.3 - ${tableId}`,
    `Subcategory A.4 - ${tableId}`,
    `Subcategory A.5 - ${tableId}`,
    `Subcategory A.6 - ${tableId}`,
    `Subcategory A.7 - ${tableId}`,
    `Subcategory A.8 - ${tableId}`,
    `Subcategory A.9 - ${tableId}`,
    `Subcategory A.10 - ${tableId}`,
    `Category B - ${tableId}`,
    `Subcategory B.1 - ${tableId}`,
    `Subcategory B.2 - ${tableId}`,
    `Subcategory B.3 - ${tableId}`,
    `Subcategory B.4 - ${tableId}`,
    `Subcategory B.5 - ${tableId}`,
    `Subcategory B.6 - ${tableId}`,
    `Subcategory B.7 - ${tableId}`,
    `Subcategory B.8 - ${tableId}`,
    `Subcategory B.9 - ${tableId}`,
    `Subcategory B.10 - ${tableId}`,
    `Category C - ${tableId}`,
    `Subcategory C.1 - ${tableId}`,
    `Subcategory C.2 - ${tableId}`,
    `Subcategory C.3 - ${tableId}`,
    `Subcategory C.4 - ${tableId}`,
    `Subcategory C.5 - ${tableId}`,
    `Subcategory C.6 - ${tableId}`,
    `Subcategory C.7 - ${tableId}`,
    `Subcategory C.8 - ${tableId}`,
    `Subcategory C.9 - ${tableId}`,
    `Subcategory C.10 - ${tableId}`,
    `Category D - ${tableId}`,
    `Subcategory D.1 - ${tableId}`,
    `Subcategory D.2 - ${tableId}`,
    `Subcategory D.3 - ${tableId}`,
    `Subcategory D.4 - ${tableId}`,
    `Subcategory D.5 - ${tableId}`,
    `Subcategory D.6 - ${tableId}`,
    `Subcategory D.7 - ${tableId}`,
    `Subcategory D.8 - ${tableId}`,
    `Subcategory D.9 - ${tableId}`,
    `Subcategory D.10 - ${tableId}`,
    `Category E - ${tableId}`,
    `Subcategory E.1 - ${tableId}`,
    `Subcategory E.2 - ${tableId}`,
    `Subcategory E.3 - ${tableId}`,
    `Subcategory E.4 - ${tableId}`,
    `Subcategory E.5 - ${tableId}`,
    `Subcategory E.6 - ${tableId}`,
    `Subcategory E.7 - ${tableId}`,
    `Subcategory E.8 - ${tableId}`,
    `Subcategory E.9 - ${tableId}`,
    `Subcategory E.10 - ${tableId}`,
    `Category F - ${tableId}`,
    `Subcategory F.1 - ${tableId}`,
    `Subcategory F.2 - ${tableId}`,
    `Subcategory F.3 - ${tableId}`,
    `Subcategory F.4 - ${tableId}`,
    `Subcategory F.5 - ${tableId}`,
    `Subcategory F.6 - ${tableId}`,
    `Subcategory F.7 - ${tableId}`,
    `Subcategory F.8 - ${tableId}`,
    `Subcategory F.9 - ${tableId}`,
    `Subcategory F.10 - ${tableId}`,
    `Category G - ${tableId}`,
    `Subcategory G.1 - ${tableId}`,
    `Subcategory G.2 - ${tableId}`,
    `Subcategory G.3 - ${tableId}`,
    `Subcategory G.4 - ${tableId}`,
    `Subcategory G.5 - ${tableId}`,
    `Subcategory G.6 - ${tableId}`,
    `Subcategory G.7 - ${tableId}`,
    `Subcategory G.8 - ${tableId}`,
    `Subcategory G.9 - ${tableId}`,
    `Subcategory G.10 - ${tableId}`,
    `Category H - ${tableId}`,
    `Subcategory H.1 - ${tableId}`,
    `Subcategory H.2 - ${tableId}`,
    `Subcategory H.3 - ${tableId}`,
    `Subcategory H.4 - ${tableId}`,
    `Subcategory H.5 - ${tableId}`,
    `Subcategory H.6 - ${tableId}`,
    `Subcategory H.7 - ${tableId}`,
    `Subcategory H.8 - ${tableId}`,
    `Subcategory H.9 - ${tableId}`,
    `Subcategory H.10 - ${tableId}`,
    `Category I - ${tableId}`,
    `Subcategory I.1 - ${tableId}`,
    `Subcategory I.2 - ${tableId}`,
    `Subcategory I.3 - ${tableId}`,
    `Subcategory I.4 - ${tableId}`,
    `Subcategory I.5 - ${tableId}`,
    `Subcategory I.6 - ${tableId}`,
    `Subcategory I.7 - ${tableId}`,
    `Subcategory I.8 - ${tableId}`,
    `Subcategory I.9 - ${tableId}`,
    `Subcategory I.10 - ${tableId}`,
    `Category J - ${tableId}`,
    `Subcategory J.1 - ${tableId}`,
    `Subcategory J.2 - ${tableId}`,
    `Subcategory J.3 - ${tableId}`,
    `Subcategory J.4 - ${tableId}`,
    `Subcategory J.5 - ${tableId}`,
    `Subcategory J.6 - ${tableId}`,
    `Subcategory J.7 - ${tableId}`,
    `Subcategory J.8 - ${tableId}`,
    `Subcategory J.9 - ${tableId}`,
    `Subcategory J.10 - ${tableId}`
  ];
}

function generateMockTreeOfValues(tableId: string, fieldId: string) {
  return {
    exclusiveId: {
      dataStore: `datastore-tree`,
      tableId: tableId
    },
    type: `tree-type-${tableId}`,
    name: `Tree of Values for Table ${tableId}`,
    displayName: `Tree Display for ${tableId} - ${fieldId}`,
    tree_of_values: [
      ...Array.from({ length: 10 }, (_, i) => {
        const idx = i + 1;
        return {
          name: `Category ${String.fromCharCode(64 + idx)} - ${tableId}`,
          children: [
            ...Array.from({length: 10}, (_ ,j) => {
              return { name: `Subcategory ${String.fromCharCode(64 + idx)}.${j + 1} - ${tableId}` };
            }),
          ]
        };
      })
    ]
  };
}

function generateMockTableEntities(tableId: string, from: number = 1, to: number = 10, sortBy: string = 'CreationTime', filter: string) {
  const entities: any[] = [];
  const totalEntities = 101;
  
  const treeEssences = generateTreeEssences(tableId);
  
  // Generate all entities first
  for (let i = from; i <= Math.min(to, totalEntities); i++) {
    const entityName = `Entity ${i} from Table ${tableId}`;
    const essenceIndex = (i - 1) % treeEssences.length;
    
    entities.push({
      exclusive_id: {
        dataStore: `datastore-${tableId}${i}`,
        tableId: tableId,
        entity_id: `entity-id-${tableId}${i}`
      },
      link: `https://mock-link.com/${tableId}/entity/${i}`,
      geo: {
        wkt: `POINT(34.${7800 + i} 32.${800 + i})`,
        geo_json: {
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
      properties_list: {
        name: entityName,
        essence: treeEssences[essenceIndex],
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy,
        imageId: "trump_gaza_001",
        photo_time: `2024-01-${String(i).padStart(2, '0')}T${String(10 + (i % 12)).padStart(2, '0')}:${String(30 + (i % 30)).padStart(2, '0')}:${String(15 + (i % 45)).padStart(2, '0')}.${String(100 + (i % 900)).padStart(3, '0')}Z`,
        thumbnail: `https://picsum.photos/${300 + (i % 5) * 100}/${200 + (i % 4) * 50}?random=${tableId}-${i}`
      }
    });
  }

  // Apply filter if specified
  const filteredEntities = filter && filter !== '{}' && filter !== 'null' && filter.trim() !== ''
    ? entities.filter(entity => {
        const matches = entity.properties_list.essence === filter;
        return matches;
      })
    : entities;

  return {
    entities_list: filteredEntities
  };
}

function generateMockAllTableEntities(tableId: string, _pageSize: number = 100, sortBy: string = 'CreationTime', filter: string) {
  const allEntities: any[] = [];
  const totalEntities = 150;
  
  const treeEssences = generateTreeEssences(tableId);
  
  // Generate all entities first
  for (let i = 1; i <= totalEntities; i++) {
    const entityName = `Entity ${i} from Table ${tableId}`;
    const essenceIndex = (i - 1) % treeEssences.length;
    
    allEntities.push({
      exclusiveId: {
        dataStore: `datastore-${tableId}`,
        tableId: tableId
      },
      link: `https://mock-link.com/${tableId}/entity/${i}`,
      geo: {
        wkt: `POINT(34.${7800 + i} 32.${800 + i})`,
        geo_json: {
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
      properties_list: {
        name: entityName,
        essence: treeEssences[essenceIndex],
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy,
        imageId: "trump_gaza_002",
        photo_time: `2024-01-${String(i).padStart(2, '0')}T${String(10 + (i % 12)).padStart(2, '0')}:${String(30 + (i % 30)).padStart(2, '0')}:${String(15 + (i % 45)).padStart(2, '0')}.${String(100 + (i % 900)).padStart(3, '0')}Z`,
        thumbnail: `https://picsum.photos/${300 + (i % 5) * 100}/${200 + (i % 4) * 50}?random=${tableId}-${i}`
      }
    });
  }

  // Apply filter if specified
  const filteredEntities = filter && filter !== '{}' && filter !== 'null' && filter.trim() !== ''
    ? allEntities.filter(entity => {
        const matches = entity.properties_list.essence === filter;
        return matches;
      })
    : allEntities;

  return filteredEntities;
}

// REST API endpoints (for Chrome testing)
app.get('/v2.0/Tree/TreeOfValues/:table_id/:field_id', ({ params: { table_id, field_id } }: any, res: any) => {
  const mockData = generateMockTreeOfValues(table_id, field_id);
  res.json(mockData);
});

app.get('/v2.0/Tree/TableEntities/:table_id', ({ params: { table_id }, query: { from, to, sort_by, filter } }: any, res: any) => {
  const mockData = generateMockTableEntities(
    table_id, 
    parseInt(from) || 1, 
    parseInt(to) || 10, 
    sort_by || 'CreationTime',
    filter
  );
  res.json(mockData);
});

app.get('/v2.0/Tree/AllTableEntities/:table_id', ({ params: { table_id }, query: { pageSize, sort_by, filter } }: any, res: any) => {
  const mockData = generateMockAllTableEntities(table_id, parseInt(pageSize) || 100, sort_by, filter);
  res.json(mockData);
});

app.get('/v3.0/Tree/:table_id/TableEntities', ({ params: { table_id }, query: { from, to, sort_by, filter } }: any, res: any) => {
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
app.post('/v3.0/Tree/:table_id/TableEntities', ({ params: { table_id }, query: { from, to, sort_by }, body: { filter } = {} }: any, res: any) => {
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
app.post('/trpc/treeEntities.getTreeOfValues', ({ body: { table_id, field_id } = {} }: any, res: any) => {
  if (!table_id || !field_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id and field_id are required'
    });
  }
  
  const mockData = generateMockTreeOfValues(table_id, field_id);
  res.json({ result: { data: mockData } });
});

app.post('/trpc/treeEntities.getTableEntities', ({ body: { table_id, from, to, sort_by, filter } = {} }: any, res: any) => {
  if (!table_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id is required'
    });
  }
  
  const mockData = generateMockTableEntities(table_id, from, to, sort_by, filter);
  res.json({ result: { data: mockData } });
});

app.post('/trpc/treeEntities.getAllTableEntities', ({ body: { table_id, pageSize, sort_by, filter } = {} }: any, res: any) => {
  if (!table_id) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'table_id is required'
    });
  }
  
  const mockData = generateMockAllTableEntities(table_id, parseInt(pageSize) || 100, sort_by, filter);
  res.json({ result: { data: mockData } });
});

app.get(`/coordConverter/ground2Image`, (req: any, res: any) => {
  const { lon, lat } = req.query;
  res.json({ coordinates: [[lon, lat]] });
});

// Image service endpoint
app.post('/api/image', ({ body: { exclusiveId, link } }: any, res: any) => {
  try {
    
    if (!exclusiveId || !link) {
      return res.status(400).json({
        success: false,
        error: 'exclusiveId and link are required',
        thumbnail: '',
      });
    }

    // Simulate some processing time
    setTimeout(() => {
      // Generate a deterministic image URL based on entity data
      const entityId = exclusiveId.tableId || 'unknown';
      const hash = entityId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      const imageIndex = hash % 5;
      
      // Generate different sizes based on the hash
      const width = 300 + (hash % 5) * 100; // 300, 400, 500, 600, 700
      const height = 200 + (hash % 4) * 50; // 200, 250, 300, 350
      
      // Add some randomness to make it more realistic
      const randomSeed = Math.floor(Math.random() * 1000);
      const imageUrl = `https://picsum.photos/${width}/${height}?random=${imageIndex + randomSeed}`;
      
      res.json({
        success: true,
        thumbnail: imageUrl,
        error: null,
      });
    }, 100 + Math.random() * 200); // Random delay between 100-300ms
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      thumbnail: '',
    });
  }
});

// Note: All endpoints now use dynamic data generation with filtering support

// Health check endpoint
app.get('/health', (_req: any, res: any) => {
  res.json({ status: 'ok', message: 'Mock API server is running' });
});

// 404 handler for unmatched routes
app.use('*', (req: any, res: any) => {
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
  console.log('  - POST /api/image (Image service)');

  console.log('  - GET /health');
  console.log('');
  console.log('Filtering: Use filter to filter entities where properties.name equals the specified value');
});
