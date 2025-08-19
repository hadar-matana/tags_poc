# Tree Entities API Implementation

This document describes the implementation of the Tree Entities API endpoints for fetching hierarchical tree data and table entities.

## Overview

The Tree Entities API provides two main functionalities:
1. **Tree of Values**: Get hierarchical data for a specific field in a table
2. **Table Entities**: Get paginated table data with geographic and classification information

## Types

### Tree of Values Types

```typescript
interface ExclusiveId {
  dataStore: string;
  tableId: string;
  entityId: string;
  valueListId: string;
  treeOfValuestId: string;
  sequence: number;
}

interface TreeOfValuesNode {
  name: string;
  children?: TreeOfValuesNode[];
}

interface TreeOfValuesResponse {
  exclusiveId: ExclusiveId;
  type: string;
  name: string;
  displayName: string;
  treeOfValues: TreeOfValuesNode[];
}
```

### Table Entities Types

```typescript
interface TableEntity {
  exclusiveId: string;
  tableId: string;
  entityId: string;
  vlaueListId: string;
  treeOfValuestId: string;
  sequence: number;
  link: string;
  geo: Geo;
  classification: Classification;
  date: string;
  properties: EntityProperties;
}

interface TableEntitiesResponse {
  total_entities: number;
  nextPage: string;
  entities_list: TableEntity[];
}
```

## API Client Usage

### Direct API Client

```typescript
import { TreeEntitiesClient } from '@zohan/api/services/tree-entities-client';

// Uses environment variables for configuration
const client = new TreeEntitiesClient();

// Or override the base URL if needed
// const client = new TreeEntitiesClient('https://custom-api-url.com');

// Get tree of values
const treeOfValues = await client.getTreeOfValues({
  table_id: 'your-table-id',
  field_id: 'your-field-id',
});

// Get table entities with pagination
const tableEntities = await client.getTableEntities({
  table_id: 'your-table-id',
  from: 1,
  to: 100,
  sort_by: 'CreationTime',
});

// Get all table entities (handles pagination automatically)
const allEntities = await client.getTableEntitiesWithPagination(
  'your-table-id',
  100, // page size
  'CreationTime' // sort by
);
```

### tRPC Procedures

The API is also exposed through tRPC procedures for type-safe client-server communication:

```typescript
// Get tree of values
const { data: treeOfValues } = api.treeEntities.getTreeOfValues.useQuery({
  table_id: 'your-table-id',
  field_id: 'your-field-id',
});

// Get table entities
const { data: tableEntities } = api.treeEntities.getTableEntities.useQuery({
  table_id: 'your-table-id',
  from: 1,
  to: 100,
  sort_by: 'CreationTime',
});

// Get all table entities
const { data: allEntities } = api.treeEntities.getAllTableEntities.useQuery({
  table_id: 'your-table-id',
  pageSize: 100,
  sort_by: 'CreationTime',
});
```

## Configuration

The Tree Entities API uses environment variables for configuration. Copy `env.example` to `.env` and update the values:

### Environment Variables

```env
# Required: Base URL for the Tree Entities API
TREE_ENTITIES_API_BASE_URL=https://your-api-base-url.com

# Optional: Request timeout in milliseconds (default: 30000)
TREE_ENTITIES_API_TIMEOUT=30000

# Optional: Number of retry attempts for failed requests (default: 3)
TREE_ENTITIES_API_RETRY_ATTEMPTS=3

# Optional: Delay between retry attempts in milliseconds (default: 1000)
TREE_ENTITIES_API_RETRY_DELAY=1000

# Optional: Default page size for pagination (default: 100)
TREE_ENTITIES_DEFAULT_PAGE_SIZE=100

# Optional: Maximum allowed page size (default: 1000)
TREE_ENTITIES_MAX_PAGE_SIZE=1000

# Optional: Default sort field (default: CreationTime)
TREE_ENTITIES_DEFAULT_SORT_BY=CreationTime
```

### Configuration Object

You can also import and use the configuration object directly:

```typescript
import { treeEntitiesConfig } from '@zohan/api/config/tree-entities';

console.log(treeEntitiesConfig.baseUrl);
console.log(treeEntitiesConfig.defaultPageSize);
```

## Error Handling

The API client includes comprehensive error handling:

- HTTP errors are caught and re-thrown with descriptive messages
- Network errors are handled gracefully
- Type safety is enforced through TypeScript interfaces

## Pagination

The `getTableEntitiesWithPagination` method automatically handles pagination by:

1. Making sequential requests until all data is fetched
2. Using the `nextPage` field from the response to determine if more data exists
3. Concatenating all results into a single array

## File Structure

```
apps/api/
├── config/
│   └── tree-entities.ts           # Configuration and environment variables
├── types/
│   └── tree-entities.ts           # TypeScript interfaces
├── services/
│   └── tree-entities-client.ts    # API client implementation
├── trpc/routers/
│   └── tree-entities.ts           # tRPC procedures
├── examples/
│   └── tree-entities-examples.ts  # Usage examples
└── env.example                    # Environment variables template
```

## Exports

The following exports are available from the API package:

```typescript
import { TreeEntitiesClient } from '@zohan/api/services/tree-entities-client';
import { 
  TreeOfValuesResponse, 
  TableEntitiesResponse,
  TableEntity 
} from '@zohan/api/types/tree-entities';
import { treeEntitiesConfig } from '@zohan/api/config/tree-entities';
```
