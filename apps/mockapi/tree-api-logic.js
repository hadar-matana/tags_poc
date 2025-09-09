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
            name: `Category A - ${tableId}`,
            children: [
              { name: `Subcategory A1 - ${tableId}` },
              { name: `Subcategory A2 - ${tableId}` }
            ]
          },
          {
            name: `Category B - ${tableId}`,
            children: [
              { name: `Subcategory B1 - ${tableId}` }
            ]
          },
          {
            name: `Category C - ${tableId}`,
            children: [
              { name: `Subcategory C1 - ${tableId}` },
              { name: `Subcategory C2 - ${tableId}` },
              { name: `Subcategory C3 - ${tableId}` }
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
  
  const treeEssences = [
    `Root Node - ${tableId}`,
    `Category A - ${tableId}`,
    `Subcategory A1 - ${tableId}`,
    `Subcategory A2 - ${tableId}`,
    `Category B - ${tableId}`,
    `Subcategory B1 - ${tableId}`,
    `Category C - ${tableId}`,
    `Subcategory C1 - ${tableId}`,
    `Subcategory C2 - ${tableId}`,
    `Subcategory C3 - ${tableId}`
  ];
  
  for (let i = from; i <= Math.min(to, totalEntities); i++) {
    const essenceIndex = (i - 1) % treeEssences.length;
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
        essence: treeEssences[essenceIndex],
        description: `This is entity ${i} from table ${tableId}`,
        status: i % 2 === 0 ? 'active' : 'inactive',
        category: `category-${i % 3}`,
        sortBy: sortBy,
        additionalProp1: `prop1-${tableId}-${i}`,
        additionalProp2: `prop2-${tableId}-${i}`,
        additionalProp3: `prop3-${tableId}-${i}`,
        thumbnail: `https://picsum.photos/${300 + (i % 5) * 100}/${200 + (i % 4) * 50}?random=${tableId}-${i}`
      }
    });
  }

  return {
    total_entities: totalEntities,
    nextPage: to < totalEntities ? `page-${to + 1}` : null,
    entities_list: entities
  };
}

module.exports = {
  generateMockTreeOfValues,
  generateMockTableEntities
};