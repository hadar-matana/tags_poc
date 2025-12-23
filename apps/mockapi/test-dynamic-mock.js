const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testDynamicMockAPI() {
  console.log('🧪 Testing Dynamic Mock API endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    const healthData = healthResponse.data;
    console.log('✅ Health check:', healthData);
    console.log('');

    // Test tree of values with different parameters
    console.log('2. Testing tree of values with table_id="users" and field_id="category"...');
    const treeResponse1 = await axios.post(`${BASE_URL}/trpc/treeEntities.getTreeOfValues`, 
      { table_id: 'users', field_id: 'category' }
    );
    const treeData1 = treeResponse1.data;
    console.log('✅ Tree response for users/category:', JSON.stringify(treeData1, null, 2));
    console.log('');

    console.log('3. Testing tree of values with table_id="products" and field_id="type"...');
    const treeResponse2 = await axios.post(`${BASE_URL}/trpc/treeEntities.getTreeOfValues`, 
      { table_id: 'products', field_id: 'type' }
    );
    const treeData2 = treeResponse2.data;
    console.log('✅ Tree response for products/type:', JSON.stringify(treeData2, null, 2));
    console.log('');

    // Test table entities with pagination
    console.log('4. Testing table entities with table_id="orders" (first 5 items)...');
    const tableResponse1 = await axios.post(`${BASE_URL}/trpc/treeEntities.getTableEntities`, {
      table_id: 'orders', 
      from: 1, 
      to: 5, 
      sort_by: 'CreationTime' 
    });
    const tableData1 = tableResponse1.data;
    console.log('✅ Table entities for orders (1-5):', JSON.stringify(tableData1, null, 2));
    console.log('');

    console.log('5. Testing table entities with table_id="customers" (items 10-15)...');
    const tableResponse2 = await axios.post(`${BASE_URL}/trpc/treeEntities.getTableEntities`, {
      table_id: 'customers', 
      from: 10, 
      to: 15, 
      sort_by: 'Name' 
    });
    const tableData2 = tableResponse2.data;
    console.log('✅ Table entities for customers (10-15):', JSON.stringify(tableData2, null, 2));
    console.log('');

    // Test all table entities
    console.log('6. Testing all table entities for table_id="invoices"...');
    const allTableResponse = await axios.post(`${BASE_URL}/trpc/treeEntities.getAllTableEntities`, {
      table_id: 'invoices', 
      pageSize: 50, 
      sort_by: 'Date' 
    });
    const allTableData = allTableResponse.data;
    console.log('✅ All table entities for invoices (showing first 3):', 
      JSON.stringify({
        ...allTableData,
        result: {
          data: allTableData.result.data.slice(0, 3) // Show only first 3 for readability
        }
      }, null, 2));
    console.log('');

    // Test error handling
    console.log('7. Testing error handling - missing table_id...');
    const errorResponse = await axios.post(`${BASE_URL}/trpc/treeEntities.getTreeOfValues`, 
      { field_id: 'category' } // Missing table_id
    );
    const errorData = errorResponse.data;
    console.log('✅ Error response:', errorData);
    console.log('');

    console.log('🎉 All dynamic mock API tests passed!');
    console.log('\n💡 The mock API now generates different data based on your input parameters!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the mock API server is running on port 3001');
  }
}

testDynamicMockAPI();
